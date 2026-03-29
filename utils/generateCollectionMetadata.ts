import type { Metadata } from 'next';
import client from '../tina/__generated__/client';
import { findIntlValue } from '../tina/templating/special-fields';

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

export async function generateItemMetadata(
  filename: string,
  language: string,
  collectionType: 'design' | 'project' | 'story',
): Promise<Metadata> {
  const config = await client.queries.config({
    relativePath: 'config.json',
  });

  const pageData = await (client.queries[collectionType] as any)({
    relativePath: `${filename}.json`,
  });

  const seo = findIntlValue(language as any, 'seo');
  const collectionKey = collectionType;
  const pageContent = pageData.data[collectionKey];

  const pageTitle =
    pageContent?.[seo]?.title ?? filename[0].toUpperCase() + filename.slice(1);

  const description = pageContent?.[seo]?.metaDescription;

  return {
    title: `${pageTitle} | ${config.data.config?.applicationName}`,
    description: description,
    applicationName: config.data.config?.applicationName,
    authors: config.data.config?.authors?.map((author) => ({
      name: author?.name || '',
      url: author?.url || '',
    })),
    keywords: pageContent?.[seo]?.metaKeywords?.map(
      (item: string, index: number) => (index === 0 ? item : ` ${item}`),
    ),
  };
}
