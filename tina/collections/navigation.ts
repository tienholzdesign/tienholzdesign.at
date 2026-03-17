import { type Collection } from "tinacms";
import { PaddingXField, PaddingYField } from "../templating/granular-fields";
import TextTemplate from "../../components/Text/TextTemplate";

export default {
  label: "Navigation Menu",
  name: "navigation",
  path: "content/navigation",
  format: "json",
  fields: [
    {
      name: "logo",
      label: "Logo",
      type: "object",
      fields: [
        {
          name: "logoImage",
          label: "Logo Image",
          type: "image",
        },
        ...TextTemplate.fields.filter((field) => field.name !== "settings"),
      ],
    },

    {
      name: "links",
      label: "Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item, index) => {
          console.log("item", item?.content);
          return {
            label: item?.text_de ?? item?.text_en ?? "Link" + (index + 1),
          };
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
