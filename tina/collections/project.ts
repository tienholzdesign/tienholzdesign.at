import type { Collection } from "tinacms";
import { templates } from "../components";
import { createIntlField } from "../templating/special-fields";
import { FilenameField, SEOField } from "../templating/granular-fields";
import { sanitizeFilenameForURL } from "../templating/validation";

export default {
  label: "Projects",
  name: "project",
  path: "content/projects",
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
      templates,
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/projects/${document._sys.filename}`;
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
