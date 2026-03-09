"use client";
import { useTina } from "tinacms/dist/react";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import type { ProjectAndNavConnectionQuery } from "../../tina/__generated__/types";
import type { Language } from "../../tina/templating/special-fields";
import { LanguageContext } from "../../utils/context/language";
import Grid from "../../components/Grid/Grid";

type ClientPageProps = {
  query: string;
  variables: {
    relativePath: string;
  };
  data: ProjectAndNavConnectionQuery;
  language: Language;
};

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pages = data.projectConnection.edges?.sort(
    (a, b) =>
      new Date(b!.node?._sys.filename!).getTime() -
      new Date(a!.node?._sys.filename!).getTime(),
  );

  return (
    <LanguageContext.Provider value={props.language || "en"}>
      <Navigation {...data.navigation} />
      {pages && (
        <Grid
          content={{
            items: pages.map((item) => ({
              __typename: "PageBlocksGridContentItems",
              image: item?.node?.image,
              text: item?.node?.name,
              link: "/projects/" + item?.node?._sys.filename,
            })),
          }}
          settings={{
            columns_initial: "1",
            columns_xs: "1",
            columns_sm: "1",
            columns_md: "3",
            columns_lg: "3",
            columns_xl: "3",
          }}
        ></Grid>
      )}
      <Footer {...data.footer} />
    </LanguageContext.Provider>
  );
}

/*
<Box>
  <Heading content={{ text_de: "A" }} />
</Box>;
{
  pages.map((item, i) => (
    <Box key={i}>
      <Image
        link={"/projects/" + item?.node?._sys.filename}
        content={{
          image: item?.node?.image,
          blocks: [
            {
              __typename: "PageBlocksImageContentBlocksText",
              content: {
                text_de: item?.node?.name,
                text_en: item?.node?.name,
              },
              settings: {
                align: "center",
                textColor: "white",
                font: "serif",
                textSize: "9",
              },
            },
          ],
        }}
        settings={{
          blocksPosition: "center",
          aspectRatio_initial: "1/1" as AspectRatio,
          aspectRatio_xs: "1/1" as AspectRatio,
          aspectRatio_sm: "1/1" as AspectRatio,
          aspectRatio_md: "1/1" as AspectRatio,
          aspectRatio_lg: "1/1" as AspectRatio,
          aspectRatio_xl: "1/1" as AspectRatio,
        }}
      />
    </Box>
  ));
}
*/
