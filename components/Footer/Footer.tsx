"use client";
import { Box, Container, Flex, Select } from "@radix-ui/themes";
import { useContext } from "react";
import { LanguageContext } from "../../utils/context/language";
import { languages, type Language } from "../../tina/templating/special-fields";
import type { FooterQuery } from "../../tina/__generated__/types";
import Text from "../Text/Text";

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
    <Box
      style={{
        borderTop: "1px solid var(--gray-6)",
      }}
      mx={props.settings?.marginX ?? "0"}
      mt={"9"}
      px={props.settings?.paddingX ?? "0"}
      py={props.settings?.paddingY ?? "0"}
    >
      <Container>
        <Flex justify={"between"} align={"center"}>
          <Flex gap={"4"} direction={"row"} display={"flex"} align={"center"}>
            {props.links?.map((link, index) => {
              return <Text key={index} {...(link as any)} />;
            })}
          </Flex>
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
      </Container>
    </Box>
  );
}
