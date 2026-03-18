"use client";
import { useTina } from "tinacms/dist/react";
import "../../../styles/main.css";
import type { DesignAndNavigationQuery } from "../../../tina/__generated__/types";
import { LanguageContext } from "../../../utils/context/language";
import Navigation from "../../../components/Navigation/Navigation";
import type { Language } from "../../../tina/templating/special-fields";
import Footer from "../../../components/Footer/Footer";
import { renderBlocks } from "../../../tina/templating/utils";

type ClientPageProps = {
  query: string;
  variables: {
    relativePath: string;
  };
  data: DesignAndNavigationQuery;
  language: Language;
};

export default function ClientPage(props: ClientPageProps) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <div data-testid="client-page">
      <LanguageContext.Provider value={props.language}>
        <Navigation {...data.navigation} />
        {data.design.blocks?.map((block, i) => {
          return renderBlocks(block, i);
        })}
        <Footer {...data.footer} />
      </LanguageContext.Provider>
    </div>
  );
}
