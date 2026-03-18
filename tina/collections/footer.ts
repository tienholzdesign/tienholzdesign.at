import type { Collection } from "tinacms";
import TextTemplate from "../../components/Text/TextTemplate";

export default {
  label: "Footer Menu",
  name: "footer",
  path: "content/footer",
  format: "json",
  fields: [
    {
      name: "links",
      label: "Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.content?.text || "Link" };
        },
      },
      fields: TextTemplate.fields,
    },
  ],
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
} as Collection;
