"use client";
import { Container, Flex, Grid, Select } from "@radix-ui/themes";
import { useContext } from "react";
import { LanguageContext } from "../../utils/context/language";
import { languages, type Language } from "../../tina/templating/special-fields";
import type { FooterQuery } from "../../tina/__generated__/types";
import Text from "../Text/Text";
import { themeConfig } from "../../config/theme-config";

const languageLabels: Record<Language, string> = {
  de: "Deutsch",
  en: "English",
};

export default function Footer(props: FooterQuery["footer"]) {
  const language = useContext(LanguageContext);

  const handleLanguageChange = (newLanguage: string) => {
    document.cookie = `language=${newLanguage}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <Container
      py="2"
      px={{
        initial: themeConfig.layout.padding,
        md: "0",
      }}
      style={{
        borderTop: "1px solid var(--gray-6)",
      }}
    >
      <Grid
        columns={themeConfig.layout.gridColumns}
        gap={{ initial: "0", md: themeConfig.layout.padding }}
      >
        <Flex
          gridColumn="span 2"
          align={"center"}
          display={{ initial: "none", md: "flex" }}
          direction={"row"}
          gap={themeConfig.layout.padding}
        >
          {props.links?.map((link, index) => {
            return <Text key={index} {...(link as any)} />;
          })}
        </Flex>

        <Flex justify={"end"}>
          <Select.Root value={language} onValueChange={handleLanguageChange}>
            <Select.Trigger
              aria-label="Select language"
              style={{
                borderRadius: "var(--radius-6)",
              }}
            />
            <Select.Content>
              {languages.map((lang) => (
                <Select.Item key={lang} value={lang}>
                  {languageLabels[lang]}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
      </Grid>
    </Container>
  );
}
