import { Box, Text } from '@radix-ui/themes';
import type { PageBlocksText } from '../../tina/__generated__/types';
import { useContext } from 'react';
import { LanguageContext } from '../../utils/context/language';
import { tinaField } from 'tinacms/dist/react';
import { findIntlValue } from '../../tina/templating/special-fields';
import { LinkWrapper } from '../helpers';
import config from '../../utils/config';
import type { ExtraProps } from '../types';

export default function Component(
  props: PageBlocksText & { extraProps?: ExtraProps },
) {
  const language = useContext(LanguageContext);
  const text = findIntlValue(language, 'text');

  console.log('Rendering Text component with props:', props.extraProps);

  const content = (
    <Text
      data-tina-field={
        props.extraProps?.tinaFieldDisabled ? undefined : tinaField(props)
      }
      size={config.layout.textSize}
      style={{ whiteSpace: 'pre-line' }}
    >
      {props[text] ? props[text] : 'Add your text here'}
    </Text>
  );

  return (
    <Box mt={props.settings?.mt ?? '0'} mb={props.settings?.mb ?? '0'}>
      <LinkWrapper link={props.link ?? ''} content={content} />
    </Box>
  );
}
