import type { Template } from 'tinacms';
import ImageTemplate from '../Image/ImageTemplate';
import {
  GridColumnSpanField,
  MarginBottomField,
  MarginTopField,
} from '../../tina/templating/granular-fields';
import HeadingTemplate from '../Heading/HeadingTemplate';
import TextTemplate from '../Text/TextTemplate';
import ButtonTemplate from '../Button/ButtonTemplate';
import SlideshowTemplate from '../Slideshow/SlideshowTemplate';
import CallToActionTemplate from '../CallToAction/CallToActionTemplate';
import config from '../../utils/config';

const label = {
  grid: {
    en: 'Grid',
    de: 'Raster',
  },
  gridItems: {
    en: 'Grid items',
    de: 'Raster Elemente',

    blocks: {
      en: 'Content',
      de: 'Inhalt',
    },
  },
};

export default {
  name: 'Grid',
  label: label.grid[config.tina.language],
  fields: [
    {
      name: 'settings',
      label: `${label.grid[config.tina.language]} Settings`,
      type: 'object',
      fields: [MarginTopField, MarginBottomField],
    },
    {
      name: 'items',
      label: label.gridItems[config.tina.language],
      type: 'object',
      list: true,
      fields: [
        {
          name: 'settings',
          label: `${label.gridItems.blocks[config.tina.language]} Settings`,
          type: 'object',
          fields: [GridColumnSpanField],
        },
        {
          name: 'blocks',
          label: label.gridItems.blocks[config.tina.language],
          type: 'object',
          list: true,
          templates: [
            ButtonTemplate,
            HeadingTemplate,
            ImageTemplate,
            SlideshowTemplate,
            TextTemplate,
            CallToActionTemplate,
          ],
        },
      ],
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.blocks?.[0]?._template} ${
              item.blocks?.length > 1
                ? `and ${item.blocks?.length - 1} more`
                : ''
            }`,
          };
        },
      },
    },
  ],
} as Template;
