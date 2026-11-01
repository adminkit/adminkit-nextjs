import type { Metadata } from "next";
import pro from "@/data/editions/pro.json";
import pages from "@/data/pages.json";
import stats from "@/data/stats.json";

export const site = {
  // Your app's address: social previews need an absolute URL for public/og-image.png
  url: "https://nextjs-demo-mit.adminkit.io",
  title: "AdminKit Demo",
  slogan: "Next.js Admin Template",
  description:
    "Responsive Admin & Dashboard Template based on Next.js and Bootstrap 5",
  author: "AdminKit",
  keywords:
    "adminkit, nextjs, react, bootstrap, bootstrap 5, admin, dashboard, template, responsive, typescript, sass, theme, ui kit",
  year: new Date().getFullYear(),
};

/** Set by next.config.ts: "" or the path the app is served from, such as /admin. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * The URL of a file in public/: next/link adds the base path to links, but <img src> and
 * other plain attributes need it added.
 */
export const asset = (path: string) => `${basePath}${path}`;

export type Page = (typeof pages)[number];

/** A page from src/data/pages.json, the list of pages that scripts/stats.mjs counts. */
export const getPage = (path: string): Page => {
  const page = pages.find((entry) => entry.path === path);
  if (!page) {
    throw new Error(`${path} is not in src/data/pages.json`);
  }
  return page;
};

// Counts in descriptions, such as {icons.lucide} or {editions.pro.pages.count}
const counts: unknown = { ...stats, editions: { pro } };

const withCounts = (text: string) =>
  text.replace(/\{([\w.]+)\}/g, (match, path: string) => {
    const value = path
      .split(".")
      .reduce<unknown>(
        (object, key) => (object as Record<string, unknown>)?.[key],
        counts
      );
    return typeof value === "number" ? value.toLocaleString("en-US") : match;
  });

/** Metadata for the page at `path`: its title and description from src/data/pages.json. */
export const pageMetadata = (path: string): Metadata => {
  const { title, description } = getPage(path);

  return {
    // The dashboard is the home page and keeps the site title
    ...(path === "/" ? {} : { title }),
    description: withCounts(description),
  };
};
