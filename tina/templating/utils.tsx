import components from "../components";

// Extracts the component name from a typename string
// Examples: "StoryBlocksCall_To_Action" → "Call_To_Action", "PageBlocksCall_To_ActionBlocksHeading" → "Heading"
// Pattern: Everything after the last occurrence of "Blocks"
const findComponentByTypeName = (typeName: string) => {
  // Split by "Blocks" and take the last part
  const parts = typeName.split("Blocks");
  const componentName = parts[parts.length - 1];

  if (!componentName) {
    console.warn(`Could not extract component name from typename ${typeName}`);
    return undefined;
  }
  return componentName;
};

export const renderBlocks = (block: any, key: number) => {
  if (!block?.__typename) return null;

  const componentName = findComponentByTypeName((block as any).__typename);
  const Component = components[componentName as any];

  if (!Component) return <p key={key}>{componentName}</p>;

  return <Component key={key} {...block} />;
};
