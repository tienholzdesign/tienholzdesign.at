'use client';
import { Container, Flex, Select } from '@radix-ui/themes';
import { useContext } from 'react';
import { LanguageContext } from '../../utils/context/language';
import { languages, type Language } from '../../tina/templating/special-fields';
import type { FooterQuery } from '../../tina/__generated__/types';
import Text from '../Text/Text';
import config from '../../utils/config';
import { GlobeIcon } from '@radix-ui/react-icons';
import Image from '../Image/Image';

const languageLabels: Record<Language, string> = {
  de: 'Deutsch',
  en: 'English',
};

export default function Footer(props: FooterQuery['footer']) {
  const language = useContext(LanguageContext);

  const handleLanguageChange = (newLanguage: string) => {
    document.cookie = `language=${newLanguage}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <Container pb={config.layout.padding}>
      <Image
        content={{ image: '' }}
        settings={{
          mb: '0',
          aspectRatio_initial: '7/1',
          aspectRatio_xs: '7/1',
          aspectRatio_sm: '7/1',
          aspectRatio_md: '7/1',
          aspectRatio_lg: '7/1',
          aspectRatio_xl: '7/1',
        }}
        extraProps={{
          styles: {
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0',
          },
          tinaFieldDisabled: true,
        }}
      />

      <Flex
        style={{
          border: '1px solid var(--gray-6)',
          borderTop: 'none',
          borderRadius: config.layout.borderRadius,
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
        }}
        justify={'between'}
        p={config.layout.padding}
      >
        <Flex align={'center'} direction={'row'} gap={config.layout.padding}>
          {props.links?.map((link, index) => {
            return <Text key={index} {...(link as any)} />;
          })}
        </Flex>

        <Flex>
          <Select.Root value={language} onValueChange={handleLanguageChange}>
            <Select.Trigger
              aria-label='Select language'
              style={{
                borderRadius: 'var(--radius-6)',
              }}
            />
            <Select.Content>
              {languages.map((lang) => (
                <Select.Item key={lang} value={lang}>
                  <Flex align={'center'} gap={'1'}>
                    <GlobeIcon />
                    {languageLabels[lang]}
                  </Flex>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
      </Flex>
    </Container>
  );
}
