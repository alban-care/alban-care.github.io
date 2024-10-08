import dynamic from "next/dynamic";
import MdxLayout from "@/app/mdx-layout";
import { getAllFilesData, getFileMetadata } from "@/actions/data";
import type { Metadata } from "next/types";

interface SnippetPageParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const snippets = await getAllFilesData("snippets");
  return snippets.map((snippet) => ({
    slug: snippet.slug,
  }));
}

export async function generateMetadata({
  params,
}: SnippetPageParams): Promise<Metadata> {
  const { metadata } = await getFileMetadata("snippets", params.slug);

  if (!metadata) {
    throw new Error(`Missing metadata for snippet: ${params.slug}`);
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function Snippet({ params }: SnippetPageParams) {
  const MdxComponent = dynamic(
    () => import(`@/content/snippets/${params.slug}.mdx`)
  );

  return (
    <MdxLayout>
      <MdxComponent />
    </MdxLayout>
  );
}
