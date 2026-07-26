import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/* Two routes, listed by hand. A crawler-facing index of a two-page site does
   not need a filesystem walk, and an explicit list can't quietly start
   advertising a route the site hasn't decided to publish. lastModified is
   omitted rather than stamped with the build time: a date that changes on
   every deploy tells a crawler the content changed when it didn't. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/wallets`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
