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
  title: `${companyName} — AI Follow-Up Systems for Local Businesses`,
  description: "AI Implementation Center installs AI-powered follow-up, missed-call, quote, review, appointment, CRM, and office automation systems for local businesses and professional offices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f6f1e8] text-[#201713]">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
