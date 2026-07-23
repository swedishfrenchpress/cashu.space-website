import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this project. A stray package-lock.json in a
    // parent directory (~/package-lock.json) otherwise makes Next infer the
    // wrong root, widening filesystem tracing and emitting a build warning.
    root: process.cwd(),
  },
};

export default nextConfig;
