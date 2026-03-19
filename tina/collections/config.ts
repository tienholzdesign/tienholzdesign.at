import type { Collection } from "tinacms";

export default {
  label: "Configuration",
  name: "config",
  path: "content/config",
  format: "json",
  fields: [
    {
      name: "applicationName",
      label: "Project Name",
      type: "string",
    },
    {
      name: "url",
      label: "Project URL",
      type: "string",
    },
    {
      name: "authors",
      label: "Project Authors",
      type: "object",
      list: true,
      fields: [
        {
          name: "name",
          label: "Author Name",
          type: "string",
        },
        {
          name: "url",
          label: "Author URL",
          type: "string",
        },
      ],
    },
  ],
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
} as Collection;
