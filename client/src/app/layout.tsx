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
  description: "Never lose a song again!",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} min-h-screen max-w-screen-xl mx-auto`}
      >
        <Navigation />
        {children}
        <Footer />

        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
