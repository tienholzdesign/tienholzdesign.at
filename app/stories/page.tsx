import type { Metadata } from "next";
import { cookies } from "next/headers";
import client from "../../tina/__generated__/client";
import ClientPage from "./client-page";
import { type Language } from "../../tina/templating/special-fields";
import type { GenerateMetadataProps } from "../../tina/types";

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const title = "Projects";

  const config = await client.queries.config({
    relativePath: `config.json`,
  });

  return {
    title: `${title} | ${config.data.config?.applicationName}`,
    description: config.data.config?.applicationName || "Projects",
    applicationName: config.data.config?.applicationName,
    authors: config.data.config?.authors?.map((author) => ({
      name: author?.name || "",
      url: author?.url || "",
    })),
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value ?? "en";

  const data = await client.queries.projectAndNavConnection();

  return (
    <ClientPage
      query={data.query}
      variables={{ relativePath: "" }}
      data={data.data}
      language={language as Language}
    />
  );
}
