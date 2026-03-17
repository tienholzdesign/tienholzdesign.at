import type { Template } from "tinacms";
import {
  createIntlField,
  createResponsiveField,
} from "../../tina/templating/special-fields";
import {
  AlignField,
  TextSizeField,
  PaddingXField,
  PaddingYField,
  LinkField,
  RadiusField,
  TextColorField,
  ExtraMarginBottomField,
  FontField,
  ExtraMarginTopField,
  MarginTopField,
  MarginBottomField,
} from "../../tina/templating/granular-fields";

export default {
  name: "Button",
  label: "Button",
  fields: [
    {
      name: "settings",
      label: "Settings",
      type: "object",
      fields: [
        MarginTopField,
        MarginBottomField,
        {
          name: "variant",
          label: "Variant",
          type: "string",
          options: ["classic", "solid", "soft", "surface", "outline", "ghost"],
        },
        ...createResponsiveField(TextSizeField),
      ],
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
