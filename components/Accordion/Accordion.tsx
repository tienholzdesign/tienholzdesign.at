import { Box, Flex } from '@radix-ui/themes';
import type { PageBlocksAccordion } from '../../tina/__generated__/types';
import config from '../../utils/config';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { renderBlocks } from '../../tina/templating/utils';
import styles from './Accordion.module.css';
import Text from '../Text/Text';

export default function Component(props: PageBlocksAccordion) {
  const content = (
    <Accordion.Root type='multiple' defaultValue={['item-1']}>
      {props.blocks?.map((block, index) => (
        <Accordion.Item value={`item-${index + 1}`} key={index}>
          <Accordion.Trigger className={styles.trigger}>
            <Flex justify={'between'} align={'center'}>
              <Text text_de={block?.title} />
              <ChevronDownIcon />
            </Flex>
          </Accordion.Trigger>

          <Accordion.Content>
            <Box py='3'>
              {block?.blocks?.map((block, index) => {
                return renderBlocks(block, index);
              })}
            </Box>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
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
