/**
 * Generate theme.css from theme-config.ts
 *
 * This script reads theme configuration and generates CSS variables
 * to keep CSS and TypeScript configuration in sync.
 *
 * Run with: node scripts/generate-theme-css.js
 */

const fs = require("fs");
const path = require("path");

// Default theme values (synced from config/theme-config.ts)
// Update these if you change the TypeScript config
const themeConfig = {
  colors: {
    primary: "#000000",
    secondary: "#767676",
    foreground: "#000000",
    background: "#f5f5f5",
    tertiary: "#e6e6e6",
  },
  layout: {
    contentSize: "620px",
    wideSize: "1000px",
  },
  typography: {
    fontSize: {
      small: "1rem",
      medium: "1.125rem",
      large: "1.75rem",
      xLarge: "3rem",
    },
  },
  spacing: {
    unit: "1rem",
  },
};

const generateThemeCss = () => {
  const lines = [
    '@import "@radix-ui/colors/sage.css";',
    "",
    ":root {",
    "  /* Color Palette - Generated from config/theme-config.ts */",
  ];

  // Add color variables
  Object.entries(themeConfig.colors).forEach(([key, value]) => {
    lines.push(`  --color-${key}: ${value};`);
  });

  lines.push("", "  /* Layout */");
  Object.entries(themeConfig.layout).forEach(([key, value]) => {
    const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    lines.push(`  --layout-${kebabKey}: ${value};`);
  });

  lines.push("", "  /* Typography */");
  Object.entries(themeConfig.typography.fontSize).forEach(([key, value]) => {
    const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    lines.push(`  --font-size-${kebabKey}: ${value};`);
  });

  lines.push("", "  /* Spacing */");
  Object.entries(themeConfig.spacing).forEach(([key, value]) => {
    const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    lines.push(`  --spacing-${kebabKey}: ${value};`);
  });

  lines.push("", "  /* Box Shadows - Legacy */");
  lines.push(
    "  --box-shadow: 0 0 0 1px var(--gray-a6);",
    "  --box-shadow-hover: 0 0 0 1px var(--gray-a8);",
    "  --box-shadow-focus: 0 0 0 2px var(--gray-a8);",
  );

  lines.push("}");
  lines.push("");
  lines.push("body {");
  lines.push(`  background-color: var(--color-background);`);
  lines.push(`  color: var(--color-foreground);`);
  lines.push("  -webkit-font-smoothing: antialiased;");
  lines.push("  -moz-osx-font-smoothing: grayscale;");
  lines.push("  text-rendering: optimizeLegibility;");
  lines.push("}");
  lines.push("");
  lines.push("/* reset */");
  lines.push("input,");
  lines.push("textarea,");
  lines.push("button {");
  lines.push("  all: unset;");
  lines.push("  box-sizing: border-box;");
  lines.push("}");
  lines.push("");
  lines.push("a {");
  lines.push("  color: var(--color-primary);");
  lines.push("  text-decoration: none;");
  lines.push("}");

  return lines.join("\n");
};

try {
  const outputPath = path.join(__dirname, "../styles/theme.css");
  const cssContent = generateThemeCss();

  fs.writeFileSync(outputPath, cssContent, "utf8");
  console.log(`✓ Generated ${outputPath}`);
} catch (error) {
  console.error("✗ Error generating CSS:", error.message);
  process.exit(1);
}
