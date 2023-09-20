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
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
