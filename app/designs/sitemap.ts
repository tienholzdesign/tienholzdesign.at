import type { MetadataRoute } from "next";
import client from "../../tina/__generated__/client";
import { sanitizeFilenameForURL } from "../../tina/templating/validation";
import { themeConfig } from "../../config/theme-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = (
    await client.queries.designConnection()
  ).data.designConnection.edges?.map((page) => page);

  return pages!.map((page) => ({
    url: `https://www.${themeConfig.project.domain}/designs/${sanitizeFilenameForURL(
      page!.node!.name,
    )}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));
}
