import { Box, Button } from "@radix-ui/themes";
import type { PageBlocksButton } from "../../tina/__generated__/types";
import { useContext } from "react";
import { LanguageContext } from "../../utils/context/language";
import { tinaField } from "tinacms/dist/react";
import {
  findIntlValue,
  findResponsiveValue,
} from "../../tina/templating/special-fields";
import Link from "next/link";
import { LinkWrapper } from "../helpers";
import { themeConfig } from "../../config/theme-config";

function Component(props: PageBlocksButton) {
  const language = useContext(LanguageContext);
  const text = findIntlValue(language, "text");

  const content = (
    <Button
      data-tina-field={tinaField(props ?? props)}
      variant={props.settings?.variant as any}
      size={findResponsiveValue(props.settings, "textSize")}
      style={{ cursor: "pointer" }}
      radius={themeConfig.layout.radius}
    >
      {props?.[text] || "Add your text here"}
    </Button>
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

export default Component;
