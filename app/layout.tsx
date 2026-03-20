import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DUCANI — Toshkentning Verified Krossovka va Streetwear Platformasi",
  description: "O'zbekistondagi birinchi verifikatsiyalangan ko'cha madaniyati platformasi. Original krossovka va kiyimlarni sotib ol yoki sot. Payme, Click, Uzum qabul qilinadi.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
