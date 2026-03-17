import type { Template } from "tinacms";

const radixUnitsPositive = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
] as const;
const radixUnits = [
  ...radixUnitsPositive,
  "0",
  "-1",
  "-2",
  "-3",
  "-4",
  "-5",
  "-6",
  "-7",
  "-8",
  "-9",
] as const;

export const aspectRatios = [
  "16/9",
  "4/3",
  "1/1",
  "3/4",
  "5/1",
  "4/1",
  "3/1",
  "2/1",
] as const;

export type AspectRatio = (typeof aspectRatios)[number];

export const aspectRatioMap: Record<AspectRatio, number> = {
  "16/9": 16 / 9,
  "4/3": 4 / 3,
  "1/1": 1,
  "3/4": 3 / 4,
  "5/1": 5 / 1,
  "4/1": 4 / 1,
  "3/1": 3 / 1,
  "2/1": 2 / 1,
};

export const AspectRatioField: Template["fields"][number] = {
  name: "aspectRatio",
  label: "Aspect Ratio",
  type: "string",
  options: [...aspectRatios],
};

export const AlignField: Template["fields"][number] = {
  name: "align",
  label: "Align",
  type: "string",
  options: ["left", "center", "right"],
};

export const ExtraMarginBottomField: Template["fields"][number] = {
  name: "marginBottom",
  label: "Alternating Bottom Margin Size",
  type: "string",
  options: [...radixUnits],
};

export const ExtraMarginTopField: Template["fields"][number] = {
  name: "marginTop",
  label: "Alternating Top Margin Size",
  type: "string",
  options: [...radixUnits],
};

export const PaddingXField: Template["fields"][number] = {
  name: "paddingX",
  label: "Horizontal Padding Size",
  type: "string",
  options: [...radixUnits],
};

export const PaddingYField: Template["fields"][number] = {
  name: "paddingY",
  label: "Vertical Padding Size",
  type: "string",
  options: [...radixUnits],
};

export const ExtraPaddingWhenInGridField: Template["fields"][number] = {
  name: "extraPaddingWhenInGrid",
  label: "Extra Padding When In Grid",
  type: "boolean",
};

export const GapField: Template["fields"][number] = {
  name: "gap",
  label: "Gap Size",
  type: "string",
  options: [...radixUnitsPositive],
};

export const TextSizeField: Template["fields"][number] = {
  name: "textSize",
  label: "Text Size",
  type: "string",
  options: [...radixUnitsPositive],
};

export const colorMap: Record<(typeof colors)[number], string> = {
  gray: "var(--color-text)",
  white: "var(--color-background)",
};

const colors = ["gray", "white"] as const;
export const TextColorField: Template["fields"][number] = {
  name: "textColor",
  label: "Text Color",
  type: "string",
  options: [...colors],
};

export const SEOField: Template["fields"][number] = {
  name: "seo",
  label: "SEO",
  type: "object",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "metaDescription",
      label: "Meta desciption",
      type: "string",
      ui: {
        component: "textarea",
        description: "Descriptive information for better web search listing",
        validate: (value) => {
          if (value?.length > 165) {
            return "Meta desciption should not be longer than 165 characters";
          }
        },
      },
    },
    {
      name: "metaKeywords",
      label: "Meta keywords",
      type: "string",
      list: true,
    },
  ],
};

export const FilenameField: Template["fields"][number] = {
  name: "name",
  label: "Name",
  type: "string",
  required: true,
  ui: {
    validate: (value) => {
      // Regex for letters, numbers, umlaute, blank and hyphen
      const regex = /^[A-Za-z0-9äöüÄÖÜß\- ]+$/;

      if (!value) {
        return "Value must be defined";
      }

      if (!regex.test(value)) {
        return "Allowed values: letters, numbers, umlaute, blank and hyphen";
      }
    },
  },
};

export const LinkField: Template["fields"][number] = {
  name: "link",
  label: "Link (optional)",
  type: "string",
};

export const HasContainerField: Template["fields"][number] = {
  name: "hasContainer",
  label: "Wrap Component in Container",
  type: "boolean",
};

export const IDField: Template["fields"][number] = {
  name: "id",
  label: "ID",
  type: "string",
  description: "Add an ID to this component for linking or accessibility",
};

export const FontField: Template["fields"][number] = {
  name: "font",
  label: "Font",
  type: "string",
  options: ["serif", "sans"],
};

export const BlocksPositionField: Template["fields"][number] = {
  name: "blocksPosition",
  label: "Blocks Position",
  type: "string",
  options: ["start", "center"],
};

export const RadiusField: Template["fields"][number] = {
  name: "radius",
  label: "Radius",
  type: "string",
  options: ["full", "large", "medium", "small", "none"],
};

export const ColumnsField: Template["fields"][number] = {
  name: "columns",
  label: "Columns",
  type: "string",
  options: [...radixUnitsPositive],
};

export const DirectionField: Template["fields"][number] = {
  name: "direction",
  label: "Direction",
  type: "string",
  options: ["row", "column", "row-reverse", "column-reverse"],
};

export const GridColumnSpanField: Template["fields"][number] = {
  name: "gridColumnSpan",
  label: "Grid Column Span",
  type: "string",
  options: [...radixUnitsPositive],
};

export const MarginTopField: Template["fields"][number] = {
  name: "mt",
  label: "Top Margin Size",
  type: "string",
  options: [...radixUnits],
};

export const MarginBottomField: Template["fields"][number] = {
  name: "mb",
  label: "Bottom Margin Size",
  type: "string",
  options: [...radixUnits],
};
