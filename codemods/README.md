# Codemods Guide

> ⚠️ **TODO**: Read through this guide before using codemods. Understand what each codemod does and test with `--dry` first.

This directory contains jscodeshift codemods for automating code transformations.

## removeGranularField.js

Removes specified granular fields from template and component files.

### Installation

First, install jscodeshift globally or locally:

```bash
npm install -D jscodeshift
# or
pnpm add -D jscodeshift
```

### Usage

Run the codemod with field names to remove:

```bashremoveGranularField.js --fieldName=ExtraMarginTopField components/

# Remove multiple fields at once
npx jscodeshift -t codemods/removeGranularField.js --fieldNames=ExtraMarginTopField,ExtraMarginBottomField components/

# Remove all margin-related fields
npx jscodeshift -t codemods/removeGranularField.js --fieldNames=ExtraMarginXField,ExtraMarginYField,ExtraMarginTopField,ExtraMarginBottomField components/

# Dry run (see what would change without modifying files)
npx jscodeshift -t codemods/removeGranularField.js --dry --fieldNames=ExtraMarginTopField components/

# Transform a specific directory or file
npx jscodeshift -t codemods/removeGranularField.js --fieldName=ExtraMarginTopField components/Button/
npx jscodeshift -t codemods/removeGranularField
npx jscodeshift -t codemods/marginTransform.js --fieldName=ExtraMarginTopField components/Button/
npx jscodeshift -t codemods/marginTransform.js --fieldName=ExtraMarginTopField components/Button/ButtonTemplate.ts
```

### What It Does

For each field name specified, the codemod:

1. **Removes the import** from template files

   ```typescript
   // Before
   import {
     ExtraMarginTopField,
     ExtraMarginBottomField,
   } from "../../tina/templating/granular-fields";

   // After
   import { ExtraMarginBottomField } from "../../tina/templating/granular-fields";
   ```

2. **Removes the field from the fields array** in template files

   ```typescript
   // Before
   fields: [
     RadiusField,
     ExtraMarginTopField,
     ExtraMarginBottomField,
     PaddingXField,
   ];

   // After
   fields: [RadiusField, PaddingXField];
   ```

3. **Removes corresponding JSX attributes** from component files

   ```typescript
   // Before
   <Box
     mt={props.settings?.marginTop ?? "inherit"}
     mb={props.settings?.marginBottom ?? "inherit"}
     px={props.settings?.paddingX ?? "0"}
   />

   // After
   <Box
     px={props.settings?.paddingX ?? "0"}
   />
   ```

### How It Works

The codemod uses jscodeshift to:

1. Parse your TypeScript/TSX files into an **AST** (Abstract Syntax Tree)
2. Find and remove imports of the specified fields
3. Remove field references from template field arrays
4. Remove corresponding JSX attributes from components (based on field name conversion)
5. Clean up the resulting code

### Field Name Conversion

When removing a field, the codemod automatically converts the field name to its corresponding JSX prop:

- `ExtraMarginTopField` → `mt` (marginTop)
- `ExtraMarginBottomField` → `mb` (marginBottom)
- `ExtraMarginXField` → `mx` (marginX)
- `ExtraMarginYField` → `my` (marginY)
- `TextSizeField` → `size` (textSize)
- `TextColorField` → `color` (textColor)
- `PaddingXField` → `px` (paddingX)
- `PaddingYField` → `py` (paddingY)

### Advanced Usage

```bashremoveGranularField.js --verbose=2 --fieldName=ExtraMarginTopField components/

# Run on all files recursively
npx jscodeshift -t codemods/removeGranularField.js --fieldNames=ExtraMarginXField,ExtraMarginYField .

# Save the results
npx jscodeshift -t codemods/removeGranularField
# Save the results
npx jscodeshift -t codemods/marginTransform.js --fieldNames=ExtraMarginTopField components/ && git add -A
```

### Creating More Codemods

Use this codemod as a template. Key jscodeshift concepts:

- `j.ImportDeclaration` - Find import statements
- `j.Identifier` - Find variable/function names
- `j.ArrayExpression` - Find arrays
- `j.JSXAttribute` - Find JSX attributes
- `j(path).remove()` - Remove AST nodes
- `path.value.specifiers` - Get/modify import specifiers

Reference: [jscodeshift documentation](https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation)
