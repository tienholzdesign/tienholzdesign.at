import type { Template } from 'tinacms';
import {
  AspectRatioField,
  LinkField,
  MarginTopField,
  MarginBottomField,
} from '../../tina/templating/granular-fields';
import HeadingTemplate from '../Heading/HeadingTemplate';
import TextTemplate from '../Text/TextTemplate';
import { createResponsiveField } from '../../tina/templating/special-fields';
import ButtonTemplate from '../Button/ButtonTemplate';
import CallToActionTemplate from '../CallToAction/CallToActionTemplate';

export default {
  name: 'Image',
  label: 'Image',
  fields: [
    {
      name: 'content',
      label: 'Image',
      type: 'object',
      fields: [
        LinkField,
        {
          name: 'image',
          label: 'Image',
          type: 'image',
        },
        {
          name: 'blurImage',
          label: 'Preload Image',
          type: 'image',
          description:
            'Insert a compressed version of the original image that preloads and prevents white flashes',
        },
        {
          name: 'blocks',
          label: 'Content Blocks',
          type: 'object',
          list: true,
          templates: [
            ButtonTemplate,
            HeadingTemplate,
            TextTemplate,
            CallToActionTemplate,
          ],
        },
      ],
    },
    {
      name: 'settings',
      label: 'Settings',
      type: 'object',
      fields: [
        MarginTopField,
        MarginBottomField,
        ...createResponsiveField(AspectRatioField),
      ],
    },
  ],
} as Template;
