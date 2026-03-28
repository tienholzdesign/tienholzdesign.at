'use client';
import { useTina } from 'tinacms/dist/react';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import type { DesignAndNavConnectionQuery } from '../../tina/__generated__/types';
import type { Language } from '../../tina/templating/special-fields';
import { LanguageContext } from '../../utils/context/language';
import { Box, Container, Flex, Grid } from '@radix-ui/themes';
import { themeConfig } from '../../config/theme-config';
import Text from '../../components/Text/Text';
import Image from '../../components/Image/Image';
import Heading from '../../components/Heading/Heading';

type ClientPageProps = {
  query: string;
  variables: {
    relativePath: string;
  };
  data: DesignAndNavConnectionQuery;
  language: Language;
};

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pages = data.designConnection.edges?.sort(
    (a, b) =>
      new Date(b!.node?._sys.filename!).getTime() -
      new Date(a!.node?._sys.filename!).getTime(),
  );

  return (
    <LanguageContext.Provider value={props.language || 'en'}>
      <Navigation {...data.navigation} />
      {pages && (
        <Container
          mt={'6'}
          mb={'6'}
          px={{
            initial: themeConfig.layout.padding,
            md: '0',
          }}
        >
          <Grid
            columns={themeConfig.layout.gridColumns}
            gap={{ initial: '0', md: themeConfig.layout.padding }}
          >
            <Flex justify={'between'}>
              <Heading text_de={'Designs'} text_en={'Designs'} />
            </Flex>
            <Grid
              columns={{ initial: '1', md: '2' }}
              gridColumn={`span 2`}
              gap={themeConfig.layout.padding}
              width={'100%'}
            >
              {pages.map((page, index) => {
                return (
                  <Box key={index}>
                    <Image
                      content={{
                        link: `/designs/${page!.node?._sys.filename}`,
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
          </Grid>
        </Container>
      )}
      <Footer {...data.footer} />
    </LanguageContext.Provider>
  );
}
