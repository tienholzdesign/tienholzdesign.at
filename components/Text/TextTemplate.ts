import type { Template } from "tinacms";
import {
  createIntlField,
  createResponsiveField,
} from "../../tina/templating/special-fields";
import {
  TextSizeField,
  LinkField,
  MarginTopField,
  MarginBottomField,
} from "../../tina/templating/granular-fields";

export default {
  name: "Text",
  label: "Text",
  fields: [
    {
      name: "settings",
      label: "Settings",
      type: "object",
      fields: [MarginTopField, MarginBottomField],
    },
    LinkField,
    ...createIntlField({
      name: "text",
      label: "Text",
      type: "string",
      ui: { component: "textarea" },
    }),
  ],
} as Template;
