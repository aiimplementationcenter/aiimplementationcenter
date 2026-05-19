import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "AI Implementation Center";

export const metadata: Metadata = {
  title: `${companyName} — No-Upfront-Cost Quick Fixes`,
  description: "Pick one business pain. AI Implementation Center shows the first quick fix at no upfront cost so local businesses can see whether it can save time, recover leads, or protect revenue before spending money on a larger system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#eef7f8] text-[#09242f]">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
