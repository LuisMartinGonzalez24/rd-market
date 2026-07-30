import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MiniMarket",
  description: "CRUD académico de un mini market con Next.js, Prisma y SQLite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
