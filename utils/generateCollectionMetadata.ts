import type { Metadata } from 'next';
import client from '../tina/__generated__/client';
import { findIntlValue } from '../tina/templating/special-fields';
import config from './config';

export async function generateCollectionMetadata(
  title: string,
): Promise<Metadata> {
  return {
    title: `${title} | ${config.project.applicationName}`,
    description: config.project.applicationName || title,
    applicationName: config.project.applicationName,
    authors: config.project.authors?.map((author) => ({
      name: author?.name || '',
      url: author?.url || '',
    })),
  };
}

export async function generateItemMetadata(
  filename: string,
  language: string,
  collectionType: 'design' | 'project' | 'story' | 'page',
): Promise<Metadata> {
  const fileExtension = collectionType === 'page' ? '.mdx' : '.json';
  const pageData = await (client.queries[collectionType] as any)({
    relativePath: `${filename}${fileExtension}`,
  });

  const seo = findIntlValue(language as any, 'seo');
  const collectionKey = collectionType;
  const pageContent = pageData.data[collectionKey];

  const pageTitle =
    pageContent?.[seo]?.title ?? filename[0].toUpperCase() + filename.slice(1);

  const description = pageContent?.[seo]?.metaDescription;

  return {
    title: `${pageTitle} | ${config.project.applicationName}`,
    description: description,
    applicationName: config.project.applicationName,
    authors: config.project.authors?.map((author) => ({
      name: author?.name || '',
      url: author?.url || '',
    })),
    keywords: pageContent?.[seo]?.metaKeywords?.map(
      (item: string, index: number) => (index === 0 ? item : ` ${item}`),
    ),
  };
}
