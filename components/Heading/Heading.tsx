import { Box, Heading } from "@radix-ui/themes";
import type { PageBlocksHeading } from "../../tina/__generated__/types";
import { useContext } from "react";
import { LanguageContext } from "../../utils/context/language";
import { tinaField } from "tinacms/dist/react";
import {
  findIntlValue,
  findResponsiveValue,
} from "../../tina/templating/special-fields";
import { themeConfig } from "../../config/theme-config";

export default function Component(props: PageBlocksHeading) {
  const language = useContext(LanguageContext);
  const text = findIntlValue(language, "text");

  const content = (
    <Heading
      data-tina-field={tinaField(props)}
      size={themeConfig.layout.headingSize}
      style={{ whiteSpace: "pre-line" }}
    >
      {props[text] ? props[text] : "Add your text here"}
    </Heading>
  );

  return (
    <Box
      mt={props.settings?.mt ?? "0"}
      mb={props.settings?.mb ?? themeConfig.layout.defaultPadding}
    >
      {content}
    </Box>
  );
}
