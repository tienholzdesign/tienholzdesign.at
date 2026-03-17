import type { Template } from "tinacms";
import ImageTemplate from "../Image/ImageTemplate";
import { GridColumnSpanField } from "../../tina/templating/granular-fields";
import HeadingTemplate from "../Heading/HeadingTemplate";
import TextTemplate from "../Text/TextTemplate";
import ButtonTemplate from "../Button/ButtonTemplate";
import SlideshowTemplate from "../Slideshow/SlideshowTemplate";
import CallToActionTemplate from "../CallToAction/CallToActionTemplate";

export default {
  name: "Grid",
  label: "Grid",
  fields: [
    {
      name: "items",
      label: "Grid Items",
      type: "object",
      list: true,
      fields: [
        {
          name: "settings",
          label: "Settings",
          type: "object",
          fields: [GridColumnSpanField],
        },
        {
          name: "blocks",
          label: "Content Blocks",
          type: "object",
          list: true,
          templates: [
            ButtonTemplate,
            HeadingTemplate,
            ImageTemplate,
            SlideshowTemplate,
            TextTemplate,
            CallToActionTemplate,
          ],
        },
      ],
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.blocks?.[0]?._template} ${
              item.blocks?.length > 1
                ? `and ${item.blocks?.length - 1} more`
                : ""
            }`,
          };
        },
      },
    },
  ],
} as Template;
