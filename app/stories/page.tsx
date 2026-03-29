import { cookies } from 'next/headers';
import client from '../../tina/__generated__/client';
import ClientPage from './client-page';
import { type Language } from '../../tina/templating/special-fields';
import { generateCollectionMetadata } from '../../utils/generateCollectionMetadata';

export function generateMetadata() {
  return generateCollectionMetadata('Stories');
}

export default async function Page() {
  const cookieStore = await cookies();
  const language = cookieStore.get('language')?.value ?? 'en';

  const data = await client.queries.projectAndNavConnection();

  return (
    <ClientPage
      query={data.query}
      variables={{ relativePath: '' }}
      data={data.data}
      language={language as Language}
    />
  );
}
