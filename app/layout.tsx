import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import React from 'react';
import '../styles/main.css';
import { sans, local, serif } from './fonts';
import { LanguageInitializer } from './LanguageInitializer';
import config from '../utils/config';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accentColor, appearance, panelBackground, scaling } = config.radixUI;

  return (
    <html
      lang='en'
      className={`${sans.variable} ${serif.variable} ${local.variable}`}
    >
      <body style={{ margin: 0 }}>
        <LanguageInitializer />
        <Theme
          scaling={scaling}
          accentColor={accentColor}
          appearance={appearance}
          panelBackground={panelBackground}
        >
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
