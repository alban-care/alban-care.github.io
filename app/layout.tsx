import type { Metadata } from "next";
import Providers from "@/app/providers";
import { appTitle, appDescription, appLocale } from "@/lib/config";
import { Footer } from "@/app/footer";
import "./globals.css";

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
          <main className="container mx-auto w-full flex-1 flex flex-col gap-8 p-4">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
