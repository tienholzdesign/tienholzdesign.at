import { Box, Text } from "@radix-ui/themes";
import type { PageBlocksText } from "../../tina/__generated__/types";
import { useContext } from "react";
import { LanguageContext } from "../../utils/context/language";
import { tinaField } from "tinacms/dist/react";
import {
  findIntlValue,
  findResponsiveValue,
} from "../../tina/templating/special-fields";
import { themeConfig } from "../../config/theme-config";
import { LinkWrapper } from "../helpers";

export default function Component(props: PageBlocksText) {
  const language = useContext(LanguageContext);
  const text = findIntlValue(language, "text");

  const content = (
    <Text
      data-tina-field={tinaField(props)}
      size={findResponsiveValue(props.settings, "textSize")}
      style={{ whiteSpace: "pre-line" }}
    >
      {props[text] ? props[text] : "Add your text here"}
    </Text>
  );

  return (
    <Box
      mt={props.settings?.mt ?? "0"}
      mb={props.settings?.mb ?? themeConfig.layout.defaultPadding}
    >
      <LinkWrapper link={props.link ?? ""} content={content} />
    </Box>
  );
}
