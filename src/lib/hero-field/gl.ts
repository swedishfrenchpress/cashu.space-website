/**
 * The smallest WebGL2 layer that will run an ordered-dither field and a fluid
 * solver: a context, a program cache, one fullscreen triangle, and half-float
 * ping-pong targets. Nothing else.
 *
 * WHY NOT THREE.JS. The reference this is ported from (aspensearch.com) drives
 * the same effect through Three + @react-three/fiber + @react-three/post-
 * processing — measured at ~1.1MB of minified JS across their chunks. None of
 * it is load-bearing here: there is no scene graph, no camera, no material
 * system and no render queue in an effect that draws two triangles into four
 * textures. This file plus `shaders.ts` and `fluid.ts` is the whole dependency.
 *
 * Every entry point returns null rather than throwing. The hero has to degrade
 * to the version that ships today on any machine that cannot run this, and a
 * throw inside a mount effect would take the page with it.
 */

/** A colour target we can both render into and sample from. */
export type Target = {
  fbo: WebGLFramebuffer;
  texture: WebGLTexture;
  width: number;
  height: number;
};

/** Two targets and a swap, for passes that read their own previous output. */
export type PingPong = {
  read: Target;
  write: Target;
  texelX: number;
  texelY: number;
  swap: () => void;
};

export type GLContext = {
  gl: WebGL2RenderingContext;
  /** Compile + link, memoised on the fragment source. */
  program: (fragmentSource: string) => WebGLProgram | null;
  /** Bind a program and its uniform locations, cached per program. */
  uniform: (program: WebGLProgram, name: string) => WebGLUniformLocation | null;
  target: (width: number, height: number, filter: number) => Target | null;
  pingPong: (width: number, height: number, filter: number) => PingPong | null;
  /**
   * Delete every target allocated so far. Call before re-allocating on a
   * resize: programs are cached and reused for the life of the context, but
   * targets are sized, and without this a window drag would leak a full set
   * of half-float textures per intermediate width.
   */
  freeTargets: () => void;
  /** Draw the fullscreen triangle into `target`, or the canvas when null. */
  draw: (target: Target | null) => void;
  dispose: () => void;
};

/*
 * The fullscreen triangle, generated from gl_VertexID — no buffers, no
 * attributes, no VAO state to restore. A triangle rather than a quad because
 * a quad's diagonal seam makes the GPU shade the centre line twice, and this
 * shader runs over every pixel of a viewport-height hero.
 *
 * Passes derive their own uv from gl_FragCoord against a resolution uniform
 * instead of taking a varying, so every fragment shader here is standalone and
 * this string is the only vertex shader in the library.
 */
const VERTEX_SOURCE = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createGLContext(canvas: HTMLCanvasElement): GLContext | null {
  const gl = canvas.getContext("webgl2", {
    /*
     * Transparent, unpremultiplied, and never cleared to an opaque colour.
     * The canvas draws only the stipple and the plume; .hero-spec's own
     * background-color shows through everywhere else. That keeps the light/
     * dark flip in CSS where the rest of the site keeps it, and it means the
     * hero has no full-bleed opaque surface for a contrast extension to
     * repaint as a slab (CLAUDE.md's overlay hazard, at hero scale).
     */
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
    /* The composite is re-rendered from scratch whenever anything changes and
       the loop stops between times, so there is nothing to preserve. */
    preserveDrawingBuffer: false,
  });
  if (!gl) return null;

  /*
   * RGBA16F is sample-able in core WebGL2 but not colour-renderable without
   * one of these. The velocity field carries signed values well outside
   * [0,1], so an RGBA8 fallback would not be a lower-quality version of this
   * effect — it would be a broken one. Bail instead.
   */
  if (
    !gl.getExtension("EXT_color_buffer_float") &&
    !gl.getExtension("EXT_color_buffer_half_float")
  ) {
    return null;
  }

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SOURCE);
  if (!vertexShader) return null;

  const programs = new Map<string, WebGLProgram>();
  const uniforms = new Map<WebGLProgram, Map<string, WebGLUniformLocation | null>>();
  const targets: Target[] = [];

  const program = (fragmentSource: string): WebGLProgram | null => {
    const cached = programs.get(fragmentSource);
    if (cached) return cached;

    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!fragmentShader) return null;

    const created = gl.createProgram();
    if (!created) return null;
    gl.attachShader(created, vertexShader);
    gl.attachShader(created, fragmentShader);
    gl.linkProgram(created);
    /* The shaders are detached and deleted immediately: the linked program
       holds its own copy, and leaving them attached keeps the sources alive
       for the life of the context. */
    gl.detachShader(created, vertexShader);
    gl.detachShader(created, fragmentShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(created, gl.LINK_STATUS)) {
      gl.deleteProgram(created);
      return null;
    }
    programs.set(fragmentSource, created);
    return created;
  };

  const uniform = (p: WebGLProgram, name: string): WebGLUniformLocation | null => {
    let map = uniforms.get(p);
    if (!map) {
      map = new Map();
      uniforms.set(p, map);
    }
    if (!map.has(name)) map.set(name, gl.getUniformLocation(p, name));
    return map.get(name) ?? null;
  };

  const target = (width: number, height: number, filter: number): Target | null => {
    const texture = gl.createTexture();
    const fbo = gl.createFramebuffer();
    if (!texture || !fbo) return null;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    /* Clamped, not wrapped: advection samples outside the field at the edges,
       and a wrap would fetch the plume back in on the opposite side. */
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.HALF_FLOAT, null,
    );

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0,
    );
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      gl.deleteTexture(texture);
      gl.deleteFramebuffer(fbo);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return null;
    }
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    const created: Target = { fbo, texture, width, height };
    targets.push(created);
    return created;
  };

  const pingPong = (width: number, height: number, filter: number): PingPong | null => {
    const a = target(width, height, filter);
    const b = target(width, height, filter);
    if (!a || !b) return null;
    const pair: PingPong = {
      read: a,
      write: b,
      texelX: 1 / width,
      texelY: 1 / height,
      swap: () => {
        const previous = pair.read;
        pair.read = pair.write;
        pair.write = previous;
      },
    };
    return pair;
  };

  const draw = (t: Target | null) => {
    if (t) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo);
      gl.viewport(0, 0, t.width, t.height);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const freeTargets = () => {
    for (const t of targets) {
      gl.deleteTexture(t.texture);
      gl.deleteFramebuffer(t.fbo);
    }
    targets.length = 0;
  };

  const dispose = () => {
    freeTargets();
    for (const p of programs.values()) gl.deleteProgram(p);
    programs.clear();
    uniforms.clear();
    gl.deleteShader(vertexShader);
    /* Free the drawing buffer now rather than waiting for GC. Browsers cap
       live WebGL contexts per page and this one is remounted on every theme
       or viewport change. */
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };

  return { gl, program, uniform, target, pingPong, freeTargets, draw, dispose };
}
