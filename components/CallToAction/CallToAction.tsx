import { Box, Card } from '@radix-ui/themes';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksCall_To_Action } from '../../tina/__generated__/types';
import { themeConfig } from '../../config/theme-config';
import { renderBlocks } from '../../tina/templating/utils';

export default function Component(props: PageBlocksCall_To_Action) {
  const content = (
    <Card
      data-tina-field={tinaField(props)}
      style={{
        background:
          'radial-gradient(circle, var(--color-background) 0%,var(--violet-10) 100%',
      }}
    >
      {props?.blocks?.map((block, index) => {
        return renderBlocks(block, index);
      })}
    </Card>
  );

  return (
    <Box
      mt={props.settings?.mt ?? '0'}
      mb={props.settings?.mb ?? themeConfig.layout.padding}
    >
      {content}
    </Box>
  );
}
