/**
 * The site's absolute base URL.
 *
 * The canonical domain wins in production; preview deploys fall back to their
 * own host so their cards don't point at assets the live site may not have
 * yet, and so a preview never advertises itself as cashu.space.
 *
 * Shared rather than duplicated: metadataBase, the sitemap, and robots.txt
 * all have to agree on one origin, and three copies of this ternary would
 * drift the first time one of them was edited.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production"
    ? "https://cashu.space"
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://cashu.space");

/** True only on the live production deploy. */
export const IS_PRODUCTION = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : true;
