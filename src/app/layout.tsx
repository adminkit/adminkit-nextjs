import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { PageEffects } from "@/layouts/page-effects";
import { headScript } from "@/lib/head-scripts";
import { asset, site } from "@/lib/site";
import "@/scss/app.scss";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.title} - ${site.slogan}`,
    template: `%s | ${site.title}`,
  },
  description: site.description,
  authors: [{ name: site.author }],
  keywords: site.keywords,
  icons: { icon: asset("/img/icons/icon-48x48.png") },
  // Social preview image (public/og-image.png)
  openGraph: {
    images: [{ url: asset("/og-image.png"), width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The head script sets data-bs-theme and a class on <html> before React hydrates.
    // Bootstrap's reboot scrolls smoothly; Next.js turns that off while it navigates.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Color mode before the first paint (src/lib/head-scripts.ts) */}
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body>
        {children}
        <PageEffects />
      </body>
    </html>
  );
}
