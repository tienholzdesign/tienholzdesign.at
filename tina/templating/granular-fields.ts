import type { Template } from 'tinacms';
import config from '../../utils/config';

const radixUnitsPositive = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] as const;
const radixUnits = [
  ...radixUnitsPositive,
  '0',
  '-1',
  '-2',
  '-3',
  '-4',
  '-5',
  '-6',
  '-7',
  '-8',
  '-9',
] as const;

export const aspectRatios = [
  '16/9',
  '4/3',
  '1/1',
  '3/4',
  '5/1',
  '4/1',
  '3/1',
  '2/1',
] as const;

export type AspectRatio = (typeof aspectRatios)[number];

export const aspectRatioMap: Record<AspectRatio, number> = {
  '16/9': 16 / 9,
  '4/3': 4 / 3,
  '1/1': 1,
  '3/4': 3 / 4,
  '5/1': 5 / 1,
  '4/1': 4 / 1,
  '3/1': 3 / 1,
  '2/1': 2 / 1,
};

const aspectRatioFieldLabel = {
  en: 'Aspect Ratio',
  de: 'Seitenverhältnis',
};
export const AspectRatioField: Template['fields'][number] = {
  name: 'aspectRatio',
  label: aspectRatioFieldLabel[config.tina.language],
  type: 'string',
  options: [...aspectRatios],
};

const seoFieldLabel = {
  title: {
    en: 'Title',
    de: 'Titel',
  },
  metaDescription: {
    en: 'Meta description',
    de: 'Meta Beschreibung',
  },
  metaKeywords: {
    en: 'Meta keywords',
    de: 'Meta Schlüsselwörter',
  },
};
const seoFieldDescription = {
  metaDescription: {
    en: 'Short summary of the content of the page. Displayed in search engine results.',
    de: 'Kurze Zusammenfassung des Seiteninhalts. Wird in Suchergebnissen von Suchmaschinen angezeigt.',
  },
  metaKeywords: {
    en: 'Specific keywords for search engine',
    de: 'Spezifische Schlüsselwörter für die Suchmaschine',
  },
};
export const SEOField: Template['fields'][number] = {
  name: 'seo',
  label: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'title',
      label: seoFieldLabel.title[config.tina.language],
      type: 'string',
    },
    {
      name: 'metaDescription',
      label: seoFieldLabel.metaDescription[config.tina.language],
      type: 'string',
      ui: {
        component: 'textarea',
        description: seoFieldDescription.metaDescription[config.tina.language],
        validate: (value) => {
          if (value?.length > 165) {
            return 'Meta desciption should not be longer than 165 characters';
          }
        },
      },
    },
    {
      name: 'metaKeywords',
      label: 'Meta keywords',
      type: 'string',
      list: true,
      description: seoFieldDescription.metaKeywords[config.tina.language],
    },
  ],
};

const textSizeFieldLabel = {
  en: 'Text Size',
  de: 'Textgröße',
};
export const TextSizeField: Template['fields'][number] = {
  name: 'textSize',
  label: textSizeFieldLabel[config.tina.language],
  type: 'string',
  options: [...radixUnitsPositive],
};

export const FilenameField: Template['fields'][number] = {
  name: 'name',
  label: 'Name',
  type: 'string',
  required: true,
  ui: {
    validate: (value) => {
      // Regex for letters, numbers, umlaute, blank and hyphen
      const regex = /^[A-Za-z0-9äöüÄÖÜß\- ]+$/;

      if (!value) {
        return 'Value must be defined';
      }

      if (!regex.test(value)) {
        return 'Allowed values: letters, numbers, umlaute, blank and hyphen';
      }
    },
  },
};

const linkFieldDescription = {
  en: 'Add a link here to link the text.',
  de: 'Fügen Sie hier einen Link hinzu, um den Text zu verlinken.',
};
export const LinkField: Template['fields'][number] = {
  name: 'link',
  label: 'Link (optional)',
  type: 'string',
  description: linkFieldDescription[config.tina.language],
};

const gridColumnSpanFieldLabel = {
  en: 'Grid column span',
  de: 'Raster Spaltenbreite',
};
export const GridColumnSpanField: Template['fields'][number] = {
  name: 'gridColumnSpan',
  label: gridColumnSpanFieldLabel[config.tina.language],
  type: 'string',
  options: [...radixUnitsPositive],
};

const marginTopFieldLabel = {
  en: 'Top margin',
  de: 'Abstand oben',
};
export const MarginTopField: Template['fields'][number] = {
  name: 'mt',
  label: marginTopFieldLabel[config.tina.language],
  type: 'string',
  options: [...radixUnits],
};

const marginBottomFieldLabel = {
  en: 'Bottom margin',
  de: 'Abstand unten',
};
export const MarginBottomField: Template['fields'][number] = {
  name: 'mb',
  label: marginBottomFieldLabel[config.tina.language],
  type: 'string',
  options: [...radixUnits],
};
