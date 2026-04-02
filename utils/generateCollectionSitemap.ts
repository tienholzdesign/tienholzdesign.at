import type { MetadataRoute } from 'next';
import client from '../tina/__generated__/client';
import { sanitizeFilenameForURL } from '../tina/templating/validation';
import config from './config';

export async function generateCollectionSitemap(
  queryName: 'designConnection' | 'projectConnection' | 'storyConnection',
  basePath: string,
): Promise<MetadataRoute.Sitemap> {
  const result = await (client.queries[queryName] as any)();
  const pages = result.data[queryName].edges;

  return pages!.map((page: any) => ({
    url: `https://www.${config.project.url}/${basePath}/${sanitizeFilenameForURL(
      page!.node!.name,
    )}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));
}
