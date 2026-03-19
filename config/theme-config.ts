export const themeConfig = {
  project: {
    domain: "tienholzdesign.at",
    applicationName: "Tien Holz Design",
  },
  layout: {
    padding: "4",
    gridColumns: {
      initial: "1",
      md: "3",
    },
    radius: "full",
    textSize: {
      initial: "4",
      md: "5",
    },
    headingSize: {
      initial: "6",
      md: "7",
    },
  },

  radixUI: {
    accentColor: "gray" as const,
    appearance: "light" as const,
    scaling: "100%",
    panelBackground: "translucent" as const,
  },
} as const;
