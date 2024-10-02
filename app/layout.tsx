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
      <body className="font-sans antialiased">
        <Providers>
          <div className="min-h-screen grid grid-rows-[1rem_1fr_1rem] items-center justify-items-center p-8">
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
