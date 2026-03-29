import type { Template } from 'tinacms';
import {
  MarginTopField,
  MarginBottomField,
} from '../../tina/templating/granular-fields';
import HeadingTemplate from '../Heading/HeadingTemplate';
import TextTemplate from '../Text/TextTemplate';
import ButtonTemplate from '../Button/ButtonTemplate';

export default {
  name: 'Accordion',
  label: 'Accordion',
  fields: [
    {
      name: 'settings',
      label: 'Settings',
      type: 'object',
      fields: [MarginTopField, MarginBottomField],
    },
    {
      name: 'blocks',
      label: 'Content Blocks',
      type: 'object',
      list: true,
      templates: [HeadingTemplate, TextTemplate, ButtonTemplate],
    },
  ],
  // ui: {
  //   itemProps: (item) => {
  //     return {
  //       label: `${item.blocks?.[0]?._template} ${
  //         item.blocks?.length > 1
  //           ? `and ${item.blocks?.length - 1} more`
  //           : ""
  //       }`,
  //     };
  //   },
  // },
} as Template;
