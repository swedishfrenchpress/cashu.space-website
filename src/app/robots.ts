import type { MetadataRoute } from "next";
import { IS_PRODUCTION, SITE_URL } from "@/lib/site-url";

/* Open to everything on the live domain — this is the canonical document for
   a public protocol and there is nothing here to withhold. Preview deploys
   disallow instead, so a branch build can't end up indexed alongside (or
   above) cashu.space. */
export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
