import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.courseCode}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-50 -translate-y-24 rounded-lg bg-ink px-5 py-3 text-sm text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
