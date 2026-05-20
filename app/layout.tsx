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
  description: "AI Implementation Center installs AI-powered follow-up systems that help local businesses stop losing calls, leads, quotes, reviews, appointments, and revenue. Pick one pain point and see the first quick fix at no upfront cost.",
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
