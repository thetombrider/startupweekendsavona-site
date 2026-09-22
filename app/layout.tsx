import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#111111",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Startup Weekend Savona — Iscriviti e lancia la tua idea",
    template: "%s · Startup Weekend Savona",
  },
  description: site.description,
  openGraph: {
    title: "Startup Weekend Savona - Iscriviti e lancia la tua idea di Startup!",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "it_IT",
    type: "website",
    images: [{ url: "/images/gallery/hero.jpg", width: 1024, height: 683 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Weekend Savona",
    description: site.description,
  },
  icons: {
    icon: "/images/brand/icon.png",
    apple: "/images/brand/icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full overscroll-none antialiased`}
    >
      <body className="min-h-full overscroll-none bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
