'use client';
import { useTina } from 'tinacms/dist/react';
import '../../styles/main.css';
import type { PageAndNavigationQuery } from '../../tina/__generated__/types';
import { LanguageContext } from '../../utils/context/language';
import type { Language } from '../../tina/templating/special-fields';
import { renderBlocks } from '../../tina/templating/utils';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

type ClientPageProps = {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PageAndNavigationQuery;
  language: Language;
};

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <div data-testid='client-page'>
      <LanguageContext.Provider value={props.language}>
        <Navigation {...data.navigation} />
        {data.page.blocks?.map((block, i) => {
          return renderBlocks(block, i);
        })}
        <Footer {...data.footer} />
      </LanguageContext.Provider>
    </div>
  );
}
