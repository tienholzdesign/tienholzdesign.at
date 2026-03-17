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
      fields: TextTemplate.fields,
    },
    {
      name: "logoImage",
      label: "Logo Image",
      type: "image",
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
            label:
              item?.content?.text_de ??
              item?.content?.text_en ??
              "Link" + (index + 1),
          };
        },
      },
      fields: TextTemplate.fields,
    },
    {
      name: "settings",
      label: "Settings",
      type: "object",
      fields: [PaddingXField, PaddingYField],
    },
  ],
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
} as Collection;
