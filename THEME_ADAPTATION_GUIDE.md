# Theme Adaptation Guide

This guide explains how to adapt the Tina CMS + Next.js project to use a WordPress theme. The "Fewer" theme was used as an example implementation.

## Overview

Adapting a WordPress theme to a Next.js + Tina CMS project involves:

1. Extracting design system values from the theme
2. Copying and configuring custom fonts
3. Converting CSS/design tokens to CSS custom properties
4. Updating global styles and component styling
5. Integrating the theme with the Radix UI configuration

---

## Project Customization Points

When adapting this project for a new client or theme, update these critical configuration files:

### 1. **project.js** - Production domain

```javascript
module.exports = {
  url: "yourdomain.com" /* Change to your production domain */,
};
```

- Controls SEO canonical URLs
- Used in sitemap generation
- Required for Tina CMS deployment

### 2. **content/config/config.json** - Application branding

```json
{
  "applicationName": "Your Brand Name",
  "authors": [
    {
      "name": "Your Name/Company",
      "url": "yourdomain.com"
    }
  ]
}
```

- Application name displayed in Tina CMS
- Author metadata for generated content
- Used in SEO and social sharing metadata

### 3. **package.json** - Project metadata

```json
{
  "name": "your-project-name",
  "version": "0.1.0",
  "description": "Your project description"
}
```

- Project identifier
- Used in build and deployment processes

### 4. **README.md** - Documentation

- Update project description
- Update deployment instructions specific to your client
- Document any custom configurations

**Example transformation (Adrian Focke → Tienholz Design):**

- `project.js`: `adrianfocke.at` → `tienholzdesign.at`
- `config.json` applicationName: `Adrian Focke` → `Tienholz Design`
- `config.json` author.url: `github.com/adrianfocke` → `tienholzdesign.at`

### 5. **Environment Variables** - Tina CMS configuration

Create or update `.env.local` with your Tina CMS credentials:

```bash
NEXT_PUBLIC_TINA_CLIENT_ID=your_tina_client_id_here
TINA_TOKEN=your_tina_token_here
```

- `NEXT_PUBLIC_TINA_CLIENT_ID` - Public Tina CMS client identifier (visible in frontend)
- `TINA_TOKEN` - Private Tina CMS authentication token (keep secret, server-side only)

Get these credentials from:

1. Log in to [Tina Cloud](https://dashboard.tinajs.io/)
2. Go to your project settings
3. Copy your Client ID and generate a new Token
4. Update `.env.local` with these values
5. Never commit `.env.local` to version control (add to `.gitignore`)

---

## Account Setup

Before customizing the project, ensure all required accounts are created and configured:

### 1. **Vercel Account**

Required for production hosting and deployments.

**Setup steps:**
1. Create account at [vercel.com](https://vercel.com)
2. Connect GitHub repository
3. Set environment variables:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
4. Deploy the project to Vercel

### 2. **Tina Cloud Account**

Required for headless CMS functionality.

**Setup steps:**
1. Create account at [Tina Cloud](https://dashboard.tinajs.io/)
2. Create a new project for this client
3. Generate Client ID and Token
4. **Update Tina CMS Branch (for forked projects):**
   - In `tina/config.ts`, ensure `branch` is set to your repository's default branch (e.g., `main` or `master`). If you've forked the project, this might need to be explicitly set to the forked branch.
   - Example: `branch: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || "main"`
   - Ensure this matches the default branch of your connected GitHub repository.
5. Add credentials to `.env.local` (development) and Vercel (production)
6. **Invite developer as collaborator:**
   - Go to Project Settings → Collaborators
   - Add developer email as a team member
   - Set appropriate permissions (typically Editor or Admin)

**Collaborator access allows the developer to:**
- Edit content through the Tina CMS interface
- Manage schema and configuration
- Monitor project activity and logs

---

## Step 1: Extract Design System from theme.json

The WordPress theme's `theme.json` file contains all design specifications.

### What to extract:

- **Color Palette**: Primary, secondary, background, foreground colors
- **Layout Sizes**: Content width and wide width breakpoints
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Gap and padding scales

### Example from Fewer theme:

```json
{
  "color": {
    "palette": [
      { "color": "#000000", "name": "Primary", "slug": "primary" },
      { "color": "#767676", "name": "Secondary", "slug": "secondary" },
      { "color": "#f5f5f5", "name": "Background", "slug": "background" }
    ]
  },
  "layout": {
    "contentSize": "620px",
    "wideSize": "1000px"
  },
  "typography": {
    "fontFamilies": [...],
    "fontSizes": [...]
  }
}
```

---

## Step 2: Copy Font Files

Locate all font files in the WordPress theme and copy them to your Next.js project.

### Process:

```bash
# Copy fonts from WordPress theme
mkdir -p public/fonts
cp /path/to/theme/assets/fonts/*.ttf public/fonts/
```

### File locations:

- **WordPress theme fonts**: Usually in `theme-folder/assets/fonts/`
- **Next.js destination**: `public/fonts/`

### Document font specifications:

- Font family names
- Available weights (300, 400, 500, 600, 700, etc.)
- Available styles (normal, italic)
- File names for reference

---

## Step 3: Update CSS Variables

Create or update `styles/theme.css` with CSS custom properties that map to the WordPress theme design system.

### Template structure:

```css
:root {
  /* Color Palette */
  --color-primary: #000000;
  --color-secondary: #767676;
  --color-foreground: #000000;
  --color-background: #f5f5f5;
  --color-tertiary: #e6e6e6;

  /* Layout */
  --layout-content-size: 620px;
  --layout-wide-size: 1000px;

  /* Typography */
  --font-size-small: 1rem;
  --font-size-medium: 1.125rem;
  --font-size-large: 1.75rem;
  --font-size-x-large: 3rem;

  /* Spacing */
  --spacing-unit: 1rem;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Add heading styles:

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

h1 {
  font-size: var(--font-size-x-large);
}
h2 {
  font-size: var(--font-size-large);
}
/* ... etc ... */
```

---

## Step 4: Update Font Configuration

Modify `app/fonts.ts` to use local fonts instead of Google Fonts.

### Step 4a: Document font usage

Extract from theme.json which fonts are used for what:

- Headings font family
- Body/paragraph font family
- Available weights/styles for each

### Step 4b: Create localFont configuration

```typescript
import localFont from "next/font/local";

// Example: Primary heading font
export const serif = localFont({
  src: [
    { path: "../public/fonts/epilogue_300.ttf", weight: "300" },
    {
      path: "../public/fonts/epilogue_300italic.ttf",
      weight: "300",
      style: "italic",
    },
    { path: "../public/fonts/epilogue_500.ttf", weight: "500" },
    {
      path: "../public/fonts/epilogue_500italic.ttf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-serif",
});

// Example: Body font
export const sans = localFont({
  src: [
    { path: "../public/fonts/albert-sans_normal_400.ttf", weight: "400" },
    {
      path: "../public/fonts/albert-sans_italic_400.ttf",
      weight: "400",
      style: "italic",
    },
    // ... etc ...
  ],
  variable: "--font-sans",
});
```

### Key points:

- Use `localFont` for local TTF/OTF files (not `{ localFont }` named import)
- Map each file to correct weight and style
- Use consistent `variable` names
- Pair with CSS variable references in components

---

## Step 5: Update Radix UI Theme

Modify `app/layout.tsx` to use the WordPress theme's color scheme.

### Theme mapping:

Map WordPress theme colors to Radix UI accent colors:

```typescript
<Theme
  accentColor="gray"           // Use theme's primary color scheme
  appearance="light"            // or "dark" based on theme
  panelBackground="translucent" // Optional styling
>
  {children}
</Theme>
```

### Radix UI accent color options:

- `tomato`, `red`, `ruby`, `crimson`, `pink`, `plum`, `purple`, `violet`, `iris`, `indigo`, `blue`, `cyan`, `teal`, `jade`, `green`, `grass`, `orange`, `gold`, `yellow`, `amber`, `lime`, `mint`, `sky`, `brown`, `bronze`, `gray`, `mauve`, `slate`, `sage`, `olive`, `sand`

### Selection strategy:

1. Identify WordPress theme's primary color purpose (neutral, accent, etc.)
2. Find closest matching Radix accent color
3. Override if needed with custom CSS using `--color-primary` variable

---

## Common Files Modified

| File                             | Purpose               | Changes                                      |
| -------------------------------- | --------------------- | -------------------------------------------- |
| `project.js`                     | Project configuration | Update `url` to match your production domain |
| `app/fonts.ts`                   | Font configuration    | Convert to local fonts                       |
| `app/layout.tsx`                 | Root layout           | Update Theme component colors                |
| `styles/theme.css`               | CSS variables         | Add color palette, typography, layout scales |
| `styles/main.css`                | Global styles         | Import theme.css, add WordPress style rules  |
| `components/Button/Button.tsx`   | Button styling        | Update colors, border radius, typography     |
| `components/Heading/Heading.tsx` | Heading styling       | Add font weight, letter-spacing, line-height |
| `components/Text/Text.tsx`       | Text styling          | Add typography properties                    |
| `components/Grid/Grid.tsx`       | Grid spacing          | Update gap defaults to match theme spacing   |

### Important: Always Update project.js

**Always update `project.js`** with your production domain:

```javascript
module.exports = {
  url: "yourdomain.com" /* Configure for production */,
};
```

This file is critical for:

- SEO and canonical URLs
- Sitemap generation
- Production deployment configuration
- Tina CMS settings

**Example** (for tienholzdesign.at project):

```javascript
module.exports = {
  url: "tienholzdesign.at" /* Configure for production */,
};
```

---

## Testing & Validation

### 1. **Lint and Type Check**

```bash
pnpm lint
```

Fix any TypeScript errors related to font imports or component props.

### 2. **Build Test**

```bash
pnpm build
```

Ensure Next.js and Tina build successfully with new fonts and styles.

### 3. **Dev Server**

```bash
pnpm dev
```

Visual inspection:

- Fonts load correctly
- Colors display as expected
- Layout widths match theme specifications
- Spacing is consistent

### 4. **Component Testing**

Test each component on a test page:

- Headings (h1-h6)
- Paragraphs and text
- Buttons (different variants)
- Links
- Code blocks
- Blockquotes

---

## Troubleshooting

### Font files not loading

- Verify font files copied to `public/fonts/`
- Check file paths in `app/fonts.ts` are correct
- Ensure TTF/OTF format is supported
- Clear `.next` build cache: `rm -rf .next`

### Color variables not applying

- Ensure CSS variables defined in `styles/theme.css`
- Check `styles/main.css` imports `theme.css`
- Verify components use `var(--color-*)` syntax
- Check for conflicting Radix UI styles

### Typography not matching theme

- Verify font weights are available in copied font files
- Check `app/fonts.ts` weight values match actual files
- Ensure `--font-serif` and `--font-sans` variables used correctly
- Add `font-weight` and `letter-spacing` explicitly if needed

### Layout width issues

- Verify `--layout-content-size` and `--layout-wide-size` in CSS
- Check Container `size` prop doesn't override widths
- Test responsive breakpoints match theme

---

## Converting Additional Themes

To adapt a different WordPress theme:

1. **Locate theme.json** in theme root directory
2. **Extract sections**: colors, typography, layout, spacing
3. **Find font files** in `assets/fonts/` or similar
4. **Map color names** to use cases (primary = buttons, secondary = hover, etc.)
5. **Update CSS variables** for new color scheme
6. **Modify `app/fonts.ts`** with new font files and weights
7. **Update component styles** to match new typography rules
8. **Test all components** with new theme

---

## Project Customization Checklist

Use this checklist when deploying the project for a new client:

**Prerequisites:**
- [ ] **Vercel account** - Created and repository connected
- [ ] **Tina Cloud account** - Project created with Client ID and Token
- [ ] **Developer invited** - Added as collaborator in Tina Cloud (Collaborators → Add team member)

**Configuration:**
- [ ] **project.js** - Update production URL
- [ ] **content/config/config.json** - Update applicationName and author details
- [ ] **package.json** - Update project name, version, and description
- [ ] **.env.local** - Configure Tina CMS credentials (NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN)
- [ ] **Vercel environment variables** - Add NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN
- [ ] **README.md** - Update with project-specific documentation

**Design & Styling:**
- [ ] **app/layout.tsx** - Verify Radix Theme colors match new theme
- [ ] **styles/theme.css** - Verify all CSS variables are correct
- [ ] **app/fonts.ts** - Verify fonts are loading correctly

**Validation:**
- [ ] Run `pnpm lint` - Fix any linting errors
- [ ] Run `pnpm build` - Verify production build succeeds
- [ ] Test on dev server - Visual inspection of all pages and components
- [ ] Deploy to Vercel - Verify production deployment works

---

## References

- WordPress theme.json specification: https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json-schema/
- Radix UI Theme Props: https://www.radix-ui.com/docs/colors/getting-started/themes
- Next.js Font Configuration: https://nextjs.org/docs/app/api-reference/components/font
