import { cookies } from 'next/headers';
import client from '../../tina/__generated__/client';
import ClientPage from './client-page';
import { type Language } from '../../tina/templating/special-fields';
import { generateCollectionMetadata } from '../../utils/generateCollectionMetadata';

export function generateMetadata() {
  return generateCollectionMetadata('Designs');
}

export default async function Page() {
  const cookieStore = await cookies();
  const language = cookieStore.get('language')?.value ?? 'en';

  const data = await client.queries.designAndNavConnection();

  return (
    <ClientPage
      query={data.query}
      variables={{ relativePath: '' }}
      data={data.data}
      language={language as Language}
    />
  );
}
