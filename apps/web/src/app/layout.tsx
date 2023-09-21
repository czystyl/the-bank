import "~/styles/globals.css";

import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "~/components/ThemeProvider";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "./providers";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "The Bank",
  metadataBase: new URL("https://acme.com"),
  description: "The Bank, best transfer app in the world",
  openGraph: {
    title: "The Bank",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://google.com",
    siteName: "The Bank",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${roboto_mono.variable} font-mono`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning={true}>
        <ClerkProvider>
          <TRPCReactProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {props.children}
            </ThemeProvider>
          </TRPCReactProvider>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
