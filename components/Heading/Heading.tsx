import { Heading, Box, Container } from "@radix-ui/themes";
import { tinaField } from "tinacms/dist/react";
import { useContext } from "react";
import { LanguageContext } from "../../utils/context/language";
import type { PageBlocksHeading } from "../../tina/__generated__/types";
import { findIntlValue } from "../../tina/templating/special-fields";
import { colorMap } from "../../tina/templating/granular-fields";
import { radixSizeMinusOne } from "../../tina/templating/utils";
import styles from "./Heading.module.css";

export default function Component(props: PageBlocksHeading) {
  const language = useContext(LanguageContext);
  const text = findIntlValue(language, "text");

  const content = (
    <Heading
      className={
        ((props.settings?.font as any)
          ? (props.settings?.font as any)
          : "serif") +
        " " +
        styles.headingContent
      }
      data-tina-field={tinaField(props.content ?? props)}
      align={(props.settings?.align as any) ?? "left"}
      size={
        props.settings?.textSize
          ? {
              initial: radixSizeMinusOne(props.settings?.textSize) as any,
              md: props.settings?.textSize as any,
            }
          : "9"
      }
      style={{
        color: colorMap[props.settings?.textColor as any],
      }}
    >
      {props.content?.[text] || "Add your heading here"}
    </Heading>
  );

  const box = (
    <Box
      id={props.settings?.id || undefined}
      mt={props.settings?.marginTop ?? "inherit"}
      mb={props.settings?.marginBottom ?? "inherit"}
      px={props.settings?.paddingX ?? "0"}
      py={props.settings?.paddingY ?? "0"}
    >
      {content}
    </Box>
  );

  return props.settings?.hasContainer !== false ? (
    <Container>{box}</Container>
  ) : (
    box
  );
}
