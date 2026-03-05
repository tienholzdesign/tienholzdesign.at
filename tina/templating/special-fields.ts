import type { Responsive } from "@radix-ui/themes/dist/cjs/props/prop-def";
import type { Template } from "tinacms";

export const languages = ["de", "en"] as const;
export type Language = (typeof languages)[number];
const radixResponsiveSizes: Responsive<any>[] = [
  "initial",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
];

export const createIntlField = (field: Template["fields"][number]) => {
  return languages.map((locale) => ({
    ...field,
    name: `${field.name}_${locale}`,
    label: `${field.label} (${locale})`,
  }));
};

export const findIntlValue = (language: Language, key: string) => {
  return `${key}_${language}`;
};

export const findBreakpointValue = (
  breakpoint: (typeof radixResponsiveSizes)[number],
  key: string
) => {
  return `${key}_${breakpoint}`;
};

export const createResponsiveField = (field: Template["fields"][number]) => {
  return radixResponsiveSizes.map((size) => ({
    ...field,
    name: `${field.name}_${size}`,
    label: `${field.label} (${size})`,
  }));
};
