import { Box, Heading } from '@radix-ui/themes';
import type { PageBlocksHeading } from '../../tina/__generated__/types';
import { useContext } from 'react';
import { LanguageContext } from '../../utils/context/language';
import { tinaField } from 'tinacms/dist/react';
import { findIntlValue } from '../../tina/templating/special-fields';
import config from '../../utils/config';

export default function Component(props: PageBlocksHeading) {
  const language = useContext(LanguageContext);
  const text = findIntlValue(language, 'text');

  const content = (
    <Heading
      // className="serif"
      data-tina-field={tinaField(props)}
      size={config.layout.headingSize}
      style={{ whiteSpace: 'pre-line' }}
    >
      {props[text] ? props[text] : 'Add your text here'}
    </Heading>
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
