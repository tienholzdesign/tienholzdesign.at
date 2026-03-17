import type { Responsive } from "@radix-ui/themes/dist/cjs/props/prop-def";

export const themeConfig = {
  project: {
    domain: "tienholzdesign.at",
    applicationName: "Tien Holz Design",
    authors: [
      {
        name: "Tien Holz Design",
        url: "tienholzdesign.at",
      },
    ],
  },

  layout: {
    defaultPadding: "4",
    defaultGridColumns: {
      initial: "1",
      md: "3",
    } as Responsive<string>,
    radius: "full",
  },

  radixUI: {
    accentColor: "gray" as const,
    appearance: "light" as const,
    scaling: "100%",
    panelBackground: "translucent" as const,
  },
} as const;
