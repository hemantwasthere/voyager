import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voyager",
  description: "A list of transactions on starknet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="bg-[#121212] sm:px-4 py-10">
            <div className="rounded-md bg-[#1b1b1b] text-white p-4 sm:p-8 min-h-screen w-full mx-auto max-w-7xl h-full">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
