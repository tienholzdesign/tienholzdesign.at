import { Box, Button } from "@radix-ui/themes";
import type { PageBlocksButton } from "../../tina/__generated__/types";
import { useContext } from "react";
import { LanguageContext } from "../../utils/context/language";
import { tinaField } from "tinacms/dist/react";
import { findIntlValue } from "../../tina/templating/special-fields";
import Link from "next/link";

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
      style={{
        cursor: "pointer",
      }}
    >
      {props.content?.[text] || "Add your text here"}
    </Button>
  );

  return (
    <Box
      mx={props.settings?.marginX ?? "0"}
      my={props.settings?.marginY ?? "0"}
      mb={props.settings?.marginBottom ?? "inherit"}
      px={props.settings?.paddingX ?? "0"}
      py={props.settings?.paddingY ?? "0"}
      style={{
        textAlign: props.settings?.align as any,
      }}
    >
      {props.link ? <Link href={props.link}>{content}</Link> : content}
    </Box>
  );
}

export default Component;
