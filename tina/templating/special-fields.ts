import type { Responsive } from '@radix-ui/themes/dist/cjs/props/prop-def';
import type { Template } from 'tinacms';

export const languages = ['de', 'en'] as const;
export type Language = (typeof languages)[number];
const radixResponsiveSizes: Responsive<any>[] = [
  'initial',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];

const responsiveLabels: Record<
  Responsive<(typeof radixResponsiveSizes)[number]>,
  string
> = {
  initial: 'Phone vertical',
  xs: 'Phone horizontal',
  sm: 'Tablet vertical',
  md: 'Tablet horizontal',
  lg: 'Laptop',
  xl: 'Desktop',
};

export const createIntlField = (field: Template['fields'][number]) => {
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
  key: string,
) => {
  return `${key}_${breakpoint}`;
};

export const findResponsiveValue = (settings: any, key: string) => {
  if (!settings) return undefined;
  return {
    initial: settings?.[`${key}_initial`],
    xs: settings?.[`${key}_xs`],
    sm: settings?.[`${key}_sm`],
    md: settings?.[`${key}_md`],
    lg: settings?.[`${key}_lg`],
    xl: settings?.[`${key}_xl`],
  };
};

export const createResponsiveField = (field: Template['fields'][number]) => {
  return radixResponsiveSizes.map((size) => ({
    ...field,
    name: `${field.name}_${size}`,
    label: `${field.label} (${responsiveLabels[size]})`,
  }));
};
