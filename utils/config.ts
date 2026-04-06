import type { Language } from '../tina/templating/special-fields';

export default {
  project: {
    applicationName: 'Adrian Focke',
    /** The base URL for the project without the protocol */
    url: 'adrianfocke.at',
    authors: [
      {
        name: 'Adrian Focke',
        url: 'adrianfocke.at',
      },
    ],
  },
  layout: {
    boxShadow: 'var(--shadow-4)',
    borderRadius: 'var(--radius-4)',
    padding: '4',
    gridColumns: {
      initial: '1',
      md: '2',
    },
    radius: 'full',
    textSize: {
      initial: '4',
      md: '5',
    },
    headingSize: {
      initial: '7',
      md: '8',
      lg: '7',
      xl: '7',
    },
  },
  tina: {
    language: 'de' as Language,
  },
  radixUI: {
    accentColor: 'gray' as const,
    appearance: 'light' as const,
    scaling: '100%',
    panelBackground: 'translucent' as const,
  },
} as const;
