import type { Template } from "tinacms";
import ImageTemplate from "../Image/ImageTemplate";
import {
  MarginBottomField,
  MarginTopField,
} from "../../tina/templating/granular-fields";
import HeadingTemplate from "../Heading/HeadingTemplate";
import TextTemplate from "../Text/TextTemplate";
import ButtonTemplate from "../Button/ButtonTemplate";

export default {
  name: "Slideshow",
  label: "Slideshow",
  fields: [
    {
      name: "settings",
      label: "Settings",
      type: "object",
      fields: [
        MarginTopField,
        MarginBottomField,
        // ...createResponsiveField({
        //   name: "numberOfSlidesShown",
        //   label: "Number of Slides Shown",
        //   type: "number",
        //   ui: {
        //     validate: (value: number) => checkForPositveNumber(value),
        //   },
        // }),
        {
          name: "nextSlideTimeout",
          label: "Next Slide in seconds",
          type: "string",
          options: ["4", "5", "6", "7", "8", "9", "10"],
        },
      ],
    },
    {
      name: "blocks",
      label: "Content Blocks",
      type: "object",
      list: true,
      templates: [ButtonTemplate, HeadingTemplate, ImageTemplate, TextTemplate],
    },
  ],
} as Template;
