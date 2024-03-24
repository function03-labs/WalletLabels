import "@style/globals.scss";
import "@glideapps/glide-data-grid/dist/index.css";
import "@glideapps/glide-data-grid-cells/dist/index.css";

import { ThemeProvider } from "next-themes";
import type { Viewport, Metadata } from "next";
import { ChakraProvider } from "@chakra-ui/react";
import { NextUIProvider } from "@nextui-org/react";

import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/Toaster";
import { TailwindIndicator } from "@component/config/TailwindIndicator";

import { siteConfig } from "@config/site";
import { DM_Mono, Inter as FontSans, JetBrains_Mono } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = DM_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const fontMonoJetBrains = JetBrains_Mono({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default:
      "WalletLabels - Easily identify your favorite wallets and exchanges",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "walletlabels",
    "wallet",
    "label",
    "exchange",
    "crypto",
    "cryptocurrency",
    "ethereum",
    "bitcoin",
    "blockchain",
    "wallet labels",
  ],
  authors: [
    {
      name: "Aiden",
      url: "https://github.com/0xaaiden",
    },
    {
      name: "FindMalek",
      url: "https://www.findmalek.com",
    },
  ],
  creator: "Aiden",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.links.twitter,
  },
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon-16x16.png",
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className={fontSans.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <NextUIProvider>
              <ChakraProvider>{children}</ChakraProvider>
            </NextUIProvider>
            <Toaster />
            <Analytics />
            <TailwindIndicator />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
