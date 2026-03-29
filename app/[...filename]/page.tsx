import { cookies } from 'next/headers';
import client from '../../tina/__generated__/client';
import type { Page } from '../../tina/__generated__/types';
import type { GenerateMetadataProps } from '../../tina/types';
import ClientPage from './client-page';
import { generateItemMetadata } from '../../utils/generateCollectionMetadata';

export async function generateStaticParams() {
  const pages = await client.queries.pageConnection();
  const paths = pages.data?.pageConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }));

  return paths || [];
}

export async function generateMetadata({ params }: GenerateMetadataProps) {
  const language = (await cookies()).get('language')?.value ?? 'en';
  const title = (await params).filename[0];
  return generateItemMetadata(title, language, 'page');
}

export default async function Page(props: {
  params: Promise<{ filename: string[] }>;
}) {
  // TODO all pages
  const params = await props.params;
  const cookieStore = await cookies();
  const language = cookieStore.get('language')?.value ?? 'en';

  const data = await client.queries.pageAndNavigation({
    relativePath: `${params.filename}.mdx`,
  });

  return <ClientPage {...data} language={language as any} />;
}
