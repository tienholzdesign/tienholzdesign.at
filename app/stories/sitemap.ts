import type { MetadataRoute } from "next";
import project from "../../project";
import client from "../../tina/__generated__/client";
import { sanitizeFilenameForURL } from "../../tina/templating/validation";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = (
    await client.queries.projectConnection()
  ).data.projectConnection.edges?.map((page) => page);

  return pages!.map((page) => ({
    url: `https://www.${project.url}/projects/${sanitizeFilenameForURL(
      page!.node!.name,
    )}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));
}
