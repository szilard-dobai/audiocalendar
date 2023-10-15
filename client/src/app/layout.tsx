import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ProgressBarProvider from "@/components/ProgressBarProvider";
import { inter } from "@/utils/client/fonts";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Audiocalendar",
  description: "Never Miss a Beat",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className="overflow-y-scroll scroll-smooth">
      <body
        className={`${inter.className} min-h-screen max-w-screen-xl mx-auto flex flex-col`}
      >
        <ProgressBarProvider>
          <Navigation />
          <main className="flex-1 px-4 md:px-16">{children}</main>
          <Footer />

          <Analytics />
        </ProgressBarProvider>
      </body>
    </html>
  );
};

export default RootLayout;
