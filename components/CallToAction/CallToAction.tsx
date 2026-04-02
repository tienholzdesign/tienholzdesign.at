import { Box, Card } from '@radix-ui/themes';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksCall_To_Action } from '../../tina/__generated__/types';
import { renderBlocks } from '../../tina/templating/utils';
import config from '../../utils/config';

export default function Component(props: PageBlocksCall_To_Action) {
  const content = (
    <Card
      data-tina-field={tinaField(props)}
      style={{
        background: props.settings?.isPlain
          ? 'var(--gray-3)'
          : 'radial-gradient(circle, var(--color-background) 0%,var(--accent-10) 100%',
      }}
    >
      <Box pt={config.layout.padding}>
        {props?.blocks?.map((block, index) => {
          return renderBlocks(block, index);
        })}
      </Box>
    </Card>
  );

  return (
    <Box
      mt={props.settings?.mt ?? '0'}
      mb={props.settings?.mb ?? config.layout.padding}
    >
      {content}
    </Box>
  );
}
