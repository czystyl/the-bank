import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bank Brew",
  description: "Bank Brew, best transfer app in the world",
  openGraph: {
    title: "Bank Brew",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://google.com",
    siteName: "Bank Brew",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={["font-sans", fontSans.variable].join(" ")}>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
