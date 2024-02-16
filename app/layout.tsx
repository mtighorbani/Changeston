import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Changeston | چنجستون",
  description: "عرضه کننده انواع گیفت کارت بازی  و اکانت ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" >
      <Providers>
      <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
