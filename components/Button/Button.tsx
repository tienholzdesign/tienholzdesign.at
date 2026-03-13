import { Box, Button } from "@radix-ui/themes";
import type { PageBlocksButton } from "../../tina/__generated__/types";
import { useContext } from "react";
import { LanguageContext } from "../../utils/context/language";
import { tinaField } from "tinacms/dist/react";
import { findIntlValue } from "../../tina/templating/special-fields";
import Link from "next/link";
import styles from "./Button.module.css";

function Component(props: PageBlocksButton) {
  const language = useContext(LanguageContext);
  const text = findIntlValue(language, "text");
  const variant = props.settings?.variant ?? "classic";

  const content = (
    <Button
      className={props.settings?.font as any}
      radius={(props.settings?.radius as any) ?? "0px"}
      data-tina-field={tinaField(props.content ?? props)}
      variant={variant as any}
      size={(props.settings?.textSize as any) ?? "3"}
    >
      {props.content?.[text] || "Add your text here"}
    </Button>
  );

  return (
    <Box
      mt={props.settings?.marginTop ?? "inherit"}
      mb={props.settings?.marginBottom ?? "inherit"}
      px={props.settings?.paddingX ?? "0"}
      py={props.settings?.paddingY ?? "0"}
      className={styles.buttonContainer}
      style={
        {
          "--text-align": props.settings?.align as any,
        } as React.CSSProperties
      }
    >
      {props.link ? <Link href={props.link}>{content}</Link> : content}
    </Box>
  );
}

export default Component;
