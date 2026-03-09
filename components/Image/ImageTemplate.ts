import type { Template } from "tinacms";
import {
  AspectRatioField,
  AlignField,
  MarginXField,
  MarginYField,
  PaddingXField,
  PaddingYField,
  LinkField,
  BlocksPositionField,
  ExtraMarginBottomField,
  HasContainerField,
} from "../../tina/templating/granular-fields";
import HeadingTemplate from "../Heading/HeadingTemplate";
import TextTemplate from "../Text/TextTemplate";
import { createResponsiveField } from "../../tina/templating/special-fields";
import ButtonTemplate from "../Button/ButtonTemplate";

export default {
  name: "Image",
  label: "Image",
  fields: [
    LinkField,
    {
      name: "content",
      label: "Content",
      type: "object",
      fields: [
        {
          name: "image",
          label: "Image",
          type: "image",
        },
        {
          name: "blurImage",
          label: "Preload Image",
          type: "image",
          description:
            "Insert a compressed version of the original image that preloads and prevents white flashes",
        },
        {
          name: "blocks",
          label: "Content Blocks",
          type: "object",
          list: true,
          templates: [ButtonTemplate, HeadingTemplate, TextTemplate],
        },
      ],
    },
    {
      name: "settings",
      label: "Settings",
      type: "object",
      fields: [
        ...createResponsiveField(AspectRatioField),
        HasContainerField,
        AlignField,
        MarginXField,
        MarginYField,
        ExtraMarginBottomField,
        PaddingXField,
        PaddingYField,
        BlocksPositionField,
      ],
    },
  ],
} as Template;
