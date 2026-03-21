import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";

export const metadata: Metadata = {
  title: "DUCANI — Верифицированный маркетплейс кроссовок в Ташкенте",
  description: "Первая верифицированная платформа уличной культуры в Узбекистане. Только оригиналы.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0a]">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
