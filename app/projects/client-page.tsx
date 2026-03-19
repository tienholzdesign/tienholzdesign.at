"use client";
import { useTina } from "tinacms/dist/react";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import type { ProjectAndNavConnectionQuery } from "../../tina/__generated__/types";
import type { Language } from "../../tina/templating/special-fields";
import { LanguageContext } from "../../utils/context/language";
import { Box, Container, Flex, Grid } from "@radix-ui/themes";
import { themeConfig } from "../../config/theme-config";
import Heading from "../../components/Heading/Heading";
import Image from "../../components/Image/Image";
import Text from "../../components/Text/Text";

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
        <Container
          mt={"6"}
          mb={"6"}
          px={{
            initial: themeConfig.layout.padding,
            md: "0",
          }}
        >
          <Grid
            columns={themeConfig.layout.gridColumns}
            gap={{ initial: "0", md: themeConfig.layout.padding }}
          >
            <Flex justify={"between"}>
              <Heading text_de={"Projects"} text_en={"Projects"} />
            </Flex>

            <Flex
              gridColumn="span 2"
              display={{ initial: "none", md: "flex" }}
              direction={"row"}
              justify={"between"}
              align={"center"}
            >
              <Grid
                columns={"2"}
                gap={{ initial: "0", md: themeConfig.layout.padding }}
                width={"100%"}
              >
                {pages.map((page) => {
                  return (
                    <Box>
                      <Image
                        content={{
                          // link: `/designs/${page!.node?._sys.filename}`,
                          image: page!.node?.image,
                        }}
                      />
                      <Text
                        key={page!.node?._sys.filename}
                        text_de={page!.node?.name}
                        text_en={page!.node?.name}
                      />
                    </Box>
                  );
                })}
              </Grid>
            </Flex>
          </Grid>
        </Container>
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
