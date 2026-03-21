import type { MetadataRoute } from "next";
import { themeConfig } from "../config/theme-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: `https://www.${themeConfig.project.domain}/sitemap.xml`,
  };
}
