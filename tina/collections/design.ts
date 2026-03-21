import type { Collection } from "tinacms";
import { templates } from "../components";
import { createIntlField } from "../templating/special-fields";
import { FilenameField, SEOField } from "../templating/granular-fields";
import { sanitizeFilenameForURL } from "../templating/validation";

export default {
  label: "Designs",
  name: "design",
  path: "content/designs",
  format: "json",
  fields: [
    FilenameField,
    ...createIntlField(SEOField),
    {
      name: "image",
      label: "Image",
      type: "image",
    },
    {
      name: "blocks",
      label: "Blocks",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?._template || "Block" };
        },
      },
      templates,
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/designs/${document._sys.filename}`;
    },
    filename: {
      readonly: true,
      slugify: (values) => {
        const filename = values?.name || "untitled";
        return sanitizeFilenameForURL(filename);
      },
    },
  },
} as Collection;
