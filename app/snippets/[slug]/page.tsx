import dynamic from "next/dynamic";
import MdxLayout from "@/app/mdx-layout";
import { getAllFilesData, getFileMetadata } from "@/lib/utils";
import type { Metadata } from "next/types";

interface SnippetPageParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const snippets = await getAllFilesData("snippets");
  const staticParams = snippets.map((snippet) => ({
    slug: snippet.slug,
  }));

  return staticParams;
}

export async function generateStaticProps({
  params,
}: SnippetPageParams): Promise<Metadata> {
  const { metadata } = await getFileMetadata("snippets", params.slug);

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function Snippet({ params }: SnippetPageParams) {
  const { metadata, customMetadata } = await getFileMetadata(
    "snippets",
    params.slug
  );

  const MdxComponent = dynamic(
    () => import(`@/content/snippets/${params.slug}.mdx`)
  );

  return (
    <MdxLayout>
      <MdxComponent />
    </MdxLayout>
  );
}
