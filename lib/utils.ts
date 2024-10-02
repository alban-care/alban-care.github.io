import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import fs from "fs";
import path from "path";
import type { ClassValue } from "clsx";
import type { Dirent } from "fs";
import type { Metadata } from "next/types";
import { notFound } from "next/navigation";

/**
 * Merge Tailwind CSS classes
 * @param inputs The classes to merge
 * @returns The merged classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get all MDX files in a directory
 * @param dirPath The directory path
 * @param extension The file extension
 * @returns The MDX files
 */
export function hasValidExtension(
  entry: Dirent,
  extension: string = ".mdx"
): boolean {
  return entry.isFile() && path.extname(entry.name) === extension;
}

/**
 * Get all MDX files in a directory
 * @param dirPath The directory path
 * @param extension The file extension
 * @returns The MDX files
 */
export function isDirectoryEmpty(
  dirPath: string,
  extension: string = ".mdx"
): boolean {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return (
    entries.length === 0 ||
    entries.every(
      (entry) => entry.isDirectory() || !hasValidExtension(entry, extension)
    )
  );
}

/**
 * Get a slug from a filename
 * @param entry The file entry
 * @param extension The file extension
 * @returns The slug
 */
export const getSlugFromFilename = (
  entry: Dirent,
  extension: string = ".mdx"
): string => entry.name.slice(0, -extension.length);

export type FileMetadata = Metadata & {
  title: string;
  description: string;
};

export type FileCustomMetadata = {
  isPublished: boolean;
  publishedAt: string;
  lastUpdatedAt?: string;
  tags?: string[];
};

export type FileData = {
  slug: string;
  metadata: FileMetadata;
  customMetadata: FileCustomMetadata;
};

/**
 * Get metadata from a file
 * @param dirPath The directory path
 * @param slug The file slug
 * @param extension The file extensio
 * @returns
 */
export async function getFileMetadata(
  dirPath: string,
  slug: string,
  extension: string = ".mdx"
): Promise<FileData> {
  try {
    const file = await import(`@/content/${dirPath}/${slug}${extension}`);
    const { metadata, customMetadata } = file;

    switch (true) {
      case !metadata.title:
        throw new Error(`Missing title in ${slug}${extension}`);
      case !metadata.description:
        throw new Error(`Missing description in ${slug}${extension}`);
      case !customMetadata.isPublished:
        throw new Error(`Missing isPublished in ${slug}${extension}`);
      case !customMetadata.publishedAt:
        throw new Error(`Missing publishedAt in ${slug}${extension}`);
      default:
        return {
          slug,
          metadata,
          customMetadata,
        };
    }
  } catch (error) {
    console.error(`Error loading metadata for ${slug}:`, error);
    return notFound();
  }
}

/**
 * Get Data from all files
 * @param dirPath The directory path
 * @param extension The file extension
 * @returns The file data
 */
export async function getAllFilesData(
  dirPath: string,
  extension: string = ".mdx"
): Promise<FileData[]> {
  try {
    const entries = await fs.promises.readdir(`./content/${dirPath}`, {
      withFileTypes: true,
    });

    const files = entries.filter((entry) =>
      hasValidExtension(entry, extension)
    );

    if (files.length === 0) {
      console.error(`No files found in ${dirPath}`);
      return [];
    }

    const data = await Promise.all(
      files.map(async (entry) => {
        try {
          const result = await getFileMetadata(
            dirPath,
            getSlugFromFilename(entry)
          );
          return result.customMetadata.isPublished ? result : null;
        } catch (error) {
          console.error(`Error loading metadata for ${entry.name}:`, error);
          return null;
        }
      })
    );

    return data.filter((item) => item !== null);
  } catch (error) {
    console.error(`Error loading files in ${dirPath}:`, error);
    return [];
  }
}
