import {
  Flex,
  Box,
  Popover,
  Button as RadixButton,
  Container,
  Grid,
} from '@radix-ui/themes';
import type { NavigationQuery } from '../../tina/__generated__/types';
import Text from '../Text/Text';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import NextImage from 'next/image';
import Link from 'next/link';
import config from '../../utils/config';
import { tinaField } from 'tinacms/dist/react';
import Image from '../Image/Image';

export default function Navigation(props: NavigationQuery['navigation']) {
  return (
    <Container>
      <Flex
        mt={config.layout.padding}
        style={{
          border: '1px solid var(--gray-6)',
          borderRadius: config.layout.borderRadius,
          borderBottomWidth: '10px',
          borderImage: 'src("../public/uploads/placeholders/gradient.jpg")',
          boxShadow: config.layout.boxShadow,
        }}
        justify={'between'}
        p={config.layout.padding}
      >
        <Flex justify={'between'}>
          <Link
            href={'/'}
            className='no-line-height'
            data-tina-field={tinaField(props, 'logo')}
          >
            {props.logo?.logoImage ? (
              <NextImage
                src={props.logo.logoImage}
                alt='Logo'
                width={props.logo.width ?? 40}
                height={props.logo.height ?? 40}
                style={{ margin: 0 }}
              />
            ) : (
              <Text {...(props.logo as any)} link='' />
            )}
          </Link>
          <Box display={{ initial: 'block', md: 'none' }}>
            <Popover.Root>
              <Popover.Trigger>
                <RadixButton mt={'1'} aria-label='Open navigation menu'>
                  <HamburgerMenuIcon />
                </RadixButton>
              </Popover.Trigger>
              <Popover.Content side='bottom' align='end'>
                <Flex direction='column' gap={config.layout.padding}>
                  {props.links?.map((link, index) => {
                    return <Text key={index} {...(link as any)} />;
                  })}
                </Flex>
              </Popover.Content>
            </Popover.Root>
          </Box>
        </Flex>

        <Flex
          gap={config.layout.padding}
          display={{ initial: 'none', md: 'flex' }}
          direction={'row'}
          justify={'between'}
          align={'center'}
          style={{ textTransform: 'uppercase' }}
        >
          {props.links?.map((link, index) => {
            return (
              <Text
                key={index}
                {...(link as any)}
                extraProps={{ tinaFieldDisabled: true }}
              />
            );
          })}
        </Flex>
      </Flex>
    </Container>
  );
}
