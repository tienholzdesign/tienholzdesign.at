import type { Collection } from 'tinacms';
import { templates } from '../components';
import { createIntlField } from '../templating/special-fields';
import { FilenameField, SEOField } from '../templating/granular-fields';
import { sanitizeFilenameForURL } from '../templating/validation';

export default {
  label: 'Pages',
  name: 'page',
  path: 'content/page',
  format: 'mdx',
  fields: [
    FilenameField,
    ...createIntlField(SEOField),
    {
      name: 'blocks',
      label: 'Content',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?._template || 'Block' };
        },
      },
      templates,
    },
  ],
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === 'home') {
        return `/`;
      }

      return `/${document._sys.filename}`;
    },
    filename: {
      readonly: true,
      slugify: (values) => {
        const filename = values?.name || 'untitled';
        return sanitizeFilenameForURL(filename);
      },
    },
  },
} as Collection;
