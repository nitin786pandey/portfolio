import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/content";
import "./globals.css";

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nitin-pandey.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.name, url: site.github }],
  keywords: ["Nitin Pandey", "Product Manager", "AI PM", "LLM", "agentic AI", "portfolio"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0A0B0D", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <noscript>
          <style>{`.rv{opacity:1!important;transform:none!important}.mb .b i{width:var(--w)!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
