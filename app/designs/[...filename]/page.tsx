import type { Metadata } from "next";
import { cookies } from "next/headers";
import client from "../../../tina/__generated__/client";
import type { GenerateMetadataProps } from "../../../tina/types";
import ClientPage from "./client-page";
import { findIntlValue } from "../../../tina/templating/special-fields";

export async function generateStaticParams() {
  const pages = await client.queries.designConnection();
  const paths = pages.data?.designConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }));

  return paths || [];
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const language = (await cookies()).get("language")?.value ?? "en";

  const title = (await params).filename[0];

  const config = await client.queries.config({
    relativePath: `config.json`,
  });

  const page = await client.queries.design({
    relativePath: `${title}.json`,
  });

  const seo = findIntlValue(language as any, "seo");

  const pageTitle =
    page.data.design?.[seo]?.title ?? title[0].toUpperCase() + title.slice(1);

  const description = page.data.design?.[seo]?.metaDescription;

  return {
    title: `${pageTitle} | ${config.data.config?.applicationName}`,
    description: description,
    applicationName: config.data.config?.applicationName,
    authors: config.data.config?.authors?.map((author) => ({
      name: author?.name || "",
      url: author?.url || "",
    })),
    keywords: page.data.design?.[seo]?.metaKeywords?.map((item, index) =>
      index === 0 ? item : ` ${item}`,
    ),
  };
}

export default async function Page(props: {
  params: Promise<{ filename: string[] }>;
}) {
  const params = await props.params;
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value ?? "en";

  const data = await client.queries.designAndNavigation({
    relativePath: `${params.filename}.json`,
  });

  return <ClientPage {...data} language={language as any} />;
}
