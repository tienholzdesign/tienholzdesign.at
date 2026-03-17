/**
 * Central Theme Configuration
 *
 * This file serves as the single source of truth for all theme customization.
 * Update values here to automatically apply them across:
 * - CSS variables (styles/theme.css) — Run: pnpm run generate-theme-css
 * - Project metadata (project.js) — Run: pnpm run sync-config
 * - Application config (content/config/config.json) — Run: pnpm run sync-config
 * - Radix UI theme (app/layout.tsx) — Auto-imported, no additional steps needed
 *
 * To regenerate all synced files at once:
 *   pnpm run sync-all
 */

export const themeConfig = {
  // ==========================================
  // Project & Branding Metadata
  // ==========================================
  project: {
    /** Production domain - used for canonical URLs and sitemaps */
    domain: "tienholzdesign.at",

    /** Application name displayed in Tina CMS */
    applicationName: "Tien Holz Design",

    /** Author/company information */
    authors: [
      {
        name: "Tien Holz Design",
        url: "tienholzdesign.at",
      },
    ],
  },

  // ==========================================
  // Layout Dimensions
  // ==========================================
  layout: {
    contentSize: "620px",
    wideSize: "1000px",
    defaultPadding: 4,
  },

  // ==========================================
  // Typography
  // ==========================================
  typography: {
    // Font sizes - used for headings and text
    fontSize: {
      small: "1rem",
      medium: "1.125rem",
      large: "1.75rem",
      xLarge: "3rem",
    },
    // Heading styles
    heading: {
      fontWeight: 300,
      letterSpacing: "-0.02em",
      lineHeight: 1.3,
    },
  },

  // ==========================================
  // Spacing Scale
  // ==========================================
  spacing: {
    unit: "1rem",
  },

  // ==========================================
  // Radix UI Theme Configuration
  // ==========================================
  radixUI: {
    /** Primary color accent for Radix UI components */
    accentColor: "gray" as const,

    /** Light or dark theme appearance */
    appearance: "light" as const,

    /** Panel background styling */
    panelBackground: "translucent" as const,
  },
} as const;

/**
 * Type-safe font size key
 */
export type FontSizeKey = keyof typeof themeConfig.typography.fontSize;
