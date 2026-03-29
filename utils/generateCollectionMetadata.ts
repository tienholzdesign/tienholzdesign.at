import type { Metadata } from 'next';
import client from '../tina/__generated__/client';

export async function generateCollectionMetadata(
  title: string,
): Promise<Metadata> {
  const config = await client.queries.config({
    relativePath: 'config.json',
  });

  return {
    title: `${title} | ${config.data.config?.applicationName}`,
    description: config.data.config?.applicationName || title,
    applicationName: config.data.config?.applicationName,
    authors: config.data.config?.authors?.map((author) => ({
      name: author?.name || '',
      url: author?.url || '',
    })),
  };
}
