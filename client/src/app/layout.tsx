import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Audiocalendar",
  description: "Never Miss a Beat",
  manifest: "./site.webmanifest",
  icons: [
    {
      url: "./favicon-32x32.png",
      sizes: "32x32",
      rel: "icon",
      type: "image/png",
    },
    {
      url: "./favicon-16x16.png",
      sizes: "16x16",
      rel: "icon",
      type: "image/png",
    },
    {
      url: "./apple-touch-icon.png",
      sizes: "180x180",
      rel: "apple-touch-icon",
    },
  ],
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className="overflow-y-scroll scroll-smooth">
      <body
        className={`${inter.className} min-h-screen max-w-screen-xl mx-auto flex flex-col`}
      >
        <Navigation />
        <main className="flex-1 px-16">{children}</main>
        <Footer />

        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
