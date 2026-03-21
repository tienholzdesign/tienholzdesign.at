import { defineConfig } from "tinacms";
import page from "./collections/page";
import navigation from "./collections/navigation";
import project from "./collections/project";
import design from "./collections/design";
import config from "./collections/config";
import footer from "./collections/footer";

const collections = [config, page, navigation, project, design, footer];

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch: "main",
  token: process.env.TINA_TOKEN,
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  schema: {
    collections,
  },
  client: {
    referenceDepth: 1,
  },
  cmsCallback: (cms) => {
    cms.flags.set("branch-switcher", true);
    return cms;
  },
});
