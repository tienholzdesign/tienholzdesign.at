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

export const TextSizeField: Template["fields"][number] = {
  name: "textSize",
  label: "Text Size",
  type: "string",
  options: [...radixUnitsPositive],
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
