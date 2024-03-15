import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Modal } from "antd";
import LoginForm from "@/components/LoginForm";
import { useModalContext } from "@/context/ModalContext";

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
    <html lang="fa" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <header>
            <link rel="icon" href="/changeston-favicon-color.ico" sizes="any" />
          </header>
          <Navbar />

          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
