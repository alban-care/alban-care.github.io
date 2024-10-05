import Link from "next/link";
import MdxLayout from "@/app/mdx-layout";
import { getAllFilesData } from "@/actions/data";

export async function generateMetadata() {
  const snippets = await getAllFilesData("snippets");

  if (snippets.length === 0) {
    return {
      title: "Snippets",
      description: "A collection of code snippets and notes.",
    };
  }

  return {
    title: `Snippets | A collection of ${snippets.length} code snippets and notes.`,
    description: "A collection of code snippets and notes.",
  };
}

export default async function Snippets() {
  const data = await getAllFilesData("snippets");

  if (data.length === 0) {
    return (
      <MdxLayout>
        <h1>Snippets</h1>
        <p>There are no snippets yet…</p>
      </MdxLayout>
    );
  }

  return (
    <MdxLayout>
      <ul>
        {data.map(
          ({ slug, metadata: { title }, customMetadata: { publishedAt } }) => (
            <li key={slug} className="my-4">
              <Link prefetch={false} href={`/snippets/${slug}`}>
                {`${title}`} - <span className="text-sm">{publishedAt}</span>
              </Link>
            </li>
          )
        )}
      </ul>
    </MdxLayout>
  );
}
