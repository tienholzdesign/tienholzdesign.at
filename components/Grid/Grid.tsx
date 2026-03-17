import { Box, Container, Grid } from "@radix-ui/themes";
import { tinaField, useEditState } from "tinacms/dist/react";
import type { PageBlocksGrid } from "../../tina/__generated__/types";
import EditHelper from "../../tina/templating/EditHelper";
import { renderBlocks } from "../../tina/templating/utils";
import { themeConfig } from "../../config/theme-config";

export default function Component(props: PageBlocksGrid) {
  const { edit } = useEditState();

  return (
    <Container
      px={{
        initial: themeConfig.layout.defaultPadding,
        md: "0",
      }}
    >
      {edit && <EditHelper {...props} />}
      <Grid
        columns={themeConfig.layout.defaultGridColumns}
        gap={themeConfig.layout.defaultPadding}
        className="test"
      >
        {props.items?.map((item, index) => (
          <Box
            key={index}
            gridColumn={`span ${item?.settings?.gridColumnSpan}`}
            data-tina-field={tinaField(item)}
          >
            {item?.blocks?.map((block, index) => {
              return renderBlocks(block, index);
            })}
          </Box>
        ))}
      </Grid>
    </Container>
  );
}
