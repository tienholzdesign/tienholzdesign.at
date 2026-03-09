import { Box, Container, Text } from "@radix-ui/themes";
import type { PageBlocksText } from "../../tina/__generated__/types";
import { useContext } from "react";
import { LanguageContext } from "../../utils/context/language";
import { tinaField } from "tinacms/dist/react";
import { findIntlValue } from "../../tina/templating/special-fields";
import Link from "next/link";
import { colorMap } from "../../tina/templating/granular-fields";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { radixSizeMinusOne } from "../../tina/templating/utils";

export default function Component(props: PageBlocksText) {
  const language = useContext(LanguageContext);
  const text = findIntlValue(language, "text");

  const isExternalLink = props.link?.startsWith("http");

  const content = (
    <Text
      className={props.settings?.font as any}
      data-tina-field={tinaField(props.content ?? props)}
      size={
        props.settings?.textSize
          ? {
              initial: radixSizeMinusOne(props.settings?.textSize) as any,
              md: props.settings?.textSize as any,
            }
          : {
              initial: "5",
              md: "6",
            }
      }
      style={{
        color: colorMap[props.settings?.textColor as any],
        fontWeight: 300,
        letterSpacing: "-0.01em",
        lineHeight: 1.6,
        whiteSpace: "pre-line",
      }}
    >
      {props.content?.[text] || "Add your text here"}
    </Text>
  );

  const box = (
    <Box
      mx={props.settings?.marginX ?? "0"}
      my={props.settings?.marginY ?? "0"}
      mb={props.settings?.marginBottom ?? "5"}
      px={props.settings?.paddingX ?? "0"}
      py={props.settings?.paddingY ?? "0"}
      style={{
        textAlign: props.settings?.align as any,
      }}
    >
      {props.link ? (
        <Link
          className="link"
          href={props.link}
          target={isExternalLink ? "_blank" : undefined}
          rel={isExternalLink ? "noopener noreferrer" : undefined}
        >
          {content} {isExternalLink && <ArrowTopRightIcon />}
        </Link>
      ) : (
        content
      )}
    </Box>
  );

  return props.settings?.hasContainer !== false ? (
    <Container>{box}</Container>
  ) : (
    box
  );
}
