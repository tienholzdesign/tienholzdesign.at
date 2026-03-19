import type { MetadataRoute } from "next";
import client from "../../tina/__generated__/client";
import { sanitizeFilenameForURL } from "../../tina/templating/validation";
import { themeConfig } from "../../config/theme-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = (
    await client.queries.projectConnection()
  ).data.projectConnection.edges?.map((page) => page);

  return pages!.map((page) => ({
    url: `https://www.${themeConfig.project.domain}/projects/${sanitizeFilenameForURL(
      page!.node!.name,
    )}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));
}
