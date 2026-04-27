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
  title: `${companyName} — AI Readiness for Your Business`,
  description: "Discover exactly how AI can transform your business. Take our free AI Readiness Quiz and get a personalized report in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
