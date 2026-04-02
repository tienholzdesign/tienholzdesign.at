import { Box, Button } from '@radix-ui/themes';
import type { PageBlocksButton } from '../../tina/__generated__/types';
import { useContext } from 'react';
import { LanguageContext } from '../../utils/context/language';
import { tinaField } from 'tinacms/dist/react';
import {
  findIntlValue,
  findResponsiveValue,
} from '../../tina/templating/special-fields';
import { LinkWrapper } from '../helpers';
import config from '../../utils/config';

function Component(props: PageBlocksButton) {
  const language = useContext(LanguageContext);
  const text = findIntlValue(language, 'text');

  const content = (
    <Button
      data-tina-field={tinaField(props ?? props)}
      variant={(props.settings?.variant as any) ?? 'classic'}
      size={findResponsiveValue(props.settings, 'textSize')}
      style={{ cursor: 'pointer' }}
      radius={config.layout.radius}
    >
      {props?.[text] || 'Add your text here'}
    </Button>
  );

  return (
    <Box
      mt={props.settings?.mt ?? '4'}
      mb={props.settings?.mb ?? config.layout.padding}
    >
      <LinkWrapper link={props.link ?? ''} content={content} />
    </Box>
  );
}

export default Component;
