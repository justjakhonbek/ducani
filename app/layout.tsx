import type { Metadata } from "next";
import { Geist, Oswald } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DUCANI — Ташкентнинг Verified Кроссовка ва Streetwear Платформаси",
  description: "O'zbekistondagi birinchi verifikatsiyalangan ko'cha madaniyati platformasi. Original krossovka va kiyimlarni sotib ol yoki sot. Payme, Click, Uzum qabul qilinadi.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${oswald.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
