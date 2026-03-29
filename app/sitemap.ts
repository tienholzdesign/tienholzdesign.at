import type { MetadataRoute } from 'next';
import client from '../tina/__generated__/client';
import { sanitizeFilenameForURL } from '../tina/templating/validation';
import config from '../utils/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = (
    await client.queries.pageConnection()
  ).data.pageConnection.edges?.map((page) => page);

  return pages!.map((page) => ({
    url: `https://www.${config.project.url}/${sanitizeFilenameForURL(
      page!.node!.name,
    )}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));
}
