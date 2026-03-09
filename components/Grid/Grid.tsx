import { Box, Container, Grid } from "@radix-ui/themes";
import { useEditState } from "tinacms/dist/react";
import type { PageBlocksGrid } from "../../tina/__generated__/types";
import EditHelper from "../../tina/templating/EditHelper";
import { renderBlocks } from "../../tina/templating/utils";

export default function Component(props: PageBlocksGrid) {
  const { edit } = useEditState();

  const content = (
    <Grid
      columns={{
        initial: props.settings?.columns_initial || "1",
        xs: props.settings?.columns_xs || "1",
        sm: props.settings?.columns_sm || "1",
        md: props.settings?.columns_md || "2",
        lg: props.settings?.columns_lg || "2",
        xl: props.settings?.columns_xl || "2",
      }}
      gap={{
        initial: props.settings?.gap_initial || "1.5rem",
        xs: props.settings?.gap_xs || "1.5rem",
        sm: props.settings?.gap_sm || "1.5rem",
        md: props.settings?.gap_md || "1.5rem",
        lg: props.settings?.gap_lg || "1.5rem",
        xl: props.settings?.gap_xl || "1.5rem",
      }}
      px={{
        initial: props.settings?.paddingX || "4",
        xs: props.settings?.paddingX || "4",
        sm: props.settings?.paddingX || "4",
        md: props.settings?.paddingX || "4",
        lg: props.settings?.paddingX || "4",
        xl: props.settings?.paddingX || "4",
      }}
    >
      {props.content?.items?.map((item, i) => (
        <Box key={i}>
          {item?.blocks?.map((block, j) => {
            return renderBlocks(block, j);
          })}
        </Box>
      ))}
    </Grid>
  );

  const box = (
    <Box
      mx={props.settings?.marginX ?? "0"}
      my={props.settings?.marginY ?? "0"}
      mb={props.settings?.marginBottom ?? "inherit"}
    >
      {edit && <EditHelper {...props} />}
      {content}
    </Box>
  );

  return props.settings?.hasContainer !== false ? (
    <Container>{box}</Container>
  ) : (
    box
  );
}
