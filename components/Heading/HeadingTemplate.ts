import type { Template } from "tinacms";
import {
  createIntlField,
  createResponsiveField,
} from "../../tina/templating/special-fields";
import {
  TextSizeField,
  MarginTopField,
  MarginBottomField,
} from "../../tina/templating/granular-fields";

export default {
  name: "Heading",
  label: "Heading",
  fields: [
    {
      name: "settings",
      label: "Settings",
      type: "object",
      fields: [
        MarginTopField,
        MarginBottomField,
        ...createResponsiveField(TextSizeField),
      ],
    },
    ...createIntlField({
      name: "text",
      label: "Text",
      type: "string",
      ui: { component: "textarea" },
    }),
  ],
} as Template;
