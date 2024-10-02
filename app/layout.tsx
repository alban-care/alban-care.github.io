import type { Metadata } from "next";
import Providers from "@/app/providers";
import { appTitle, appDescription, appLocale } from "@/lib/config";
import "./globals.css";
import { Footer } from "./footer";

export const metadata: Metadata = {
  title: appTitle,
  description: appDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={appLocale} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col justify-between font-sans antialiased">
        <Providers>
          <main className="container w-full flex-1 flex flex-col gap-8 p-4">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
