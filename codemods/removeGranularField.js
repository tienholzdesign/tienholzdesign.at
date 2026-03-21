/**
 * Codemod: Remove granular fields from template and component files
 *
 * Usage examples:
 *   # Remove a single field
 *   npx jscodeshift -t codemods/removeGranularField.js --fieldName=ExtraMarginTopField components/
 *
 *   # Remove multiple fields
 *   npx jscodeshift -t codemods/removeGranularField.js --fieldNames=ExtraMarginTopField,ExtraMarginBottomField components/
 *
 *   # With dry-run
 *   npx jscodeshift -t codemods/removeGranularField.js --dry --fieldNames=ExtraMarginTopField,ExtraMarginBottomField components/
 *
 * This will:
 * 1. Remove the field import from template files
 * 2. Remove the field usage from the fields array in template files
 * 3. Remove JSX attributes that reference the field props in component files
 */

module.exports = function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Get field names to remove from command-line arguments
  let fieldNames = [];

  if (options.fieldNames) {
    fieldNames = options.fieldNames.split(",").map((f) => f.trim());
  } else if (options.fieldName) {
    fieldNames = [options.fieldName];
  }

  if (fieldNames.length === 0) {
    console.warn(
      "No fieldName(s) specified. Use --fieldName=FieldName or --fieldNames=Field1,Field2",
    );
    return file.source;
  }

  // Remove imports
  root.find(j.ImportDeclaration).forEach((path) => {
    const specifiers = path.value.specifiers;
    const newSpecifiers = specifiers.filter((spec) => {
      if (spec.imported) {
        return !fieldNames.includes(spec.imported.name);
      }
      return true;
    });

    if (newSpecifiers.length === 0) {
      // Remove entire import if no specifiers remain from granular-fields
      if (path.value.source.value.includes("granular-fields")) {
        j(path).remove();
      }
    } else {
      path.value.specifiers = newSpecifiers;
    }
  });

  // Remove field usage from template arrays (e.g., fields: [..., ExtraMarginTopField, ...])
  root.find(j.Identifier).forEach((path) => {
    if (fieldNames.includes(path.value.name)) {
      // Check if this is a standalone identifier in an array (not part of a larger expression)
      const parent = path.parent.value;

      // If parent is an array, remove it
      if (j.ArrayExpression.check(parent)) {
        const arrayElements = parent.elements;
        const index = arrayElements.indexOf(path.value);
        if (index > -1) {
          arrayElements.splice(index, 1);
        }
      }
    }
  });

  // Remove JSX attributes that reference props from removed fields
  // Map field names to approximate prop names (e.g., ExtraMarginTopField -> marginTop)
  const fieldToPropMap = {};
  fieldNames.forEach((field) => {
    // Convert ExtraMarginTopField -> marginTop
    const propName = field
      .replace(/^Extra/, "")
      .replace(/Field$/, "")
      .replace(/([A-Z])/g, (match, letter, offset) =>
        offset === 0 ? letter.toLowerCase() : match,
      );
    fieldToPropMap[field] = propName;
  });

  // Remove JSX attributes that correspond to removed fields
  root.find(j.JSXAttribute).forEach((path) => {
    const attrName = path.value.name?.name;
    if (attrName && Object.values(fieldToPropMap).includes(attrName)) {
      j(path).remove();
    }
  });

  return root.toSource();
};

// Export parser option for TypeScript/TSX files
module.exports.parser = "tsx";
