import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource/instrument-serif/400.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnchorNavigation } from "@/components/anchor-navigation";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${site.topic} | ${site.name}`,
    template: `%s | ${site.topic} | ${site.name}`,
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
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-primary px-5 py-3 text-sm text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <AnchorNavigation />
      </body>
    </html>
  );
}
