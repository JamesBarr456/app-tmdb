import "./globals.css";

import type { Metadata } from "next";
import { outfit } from "@/fonts";

export const metadata: Metadata = {
  title: "Entertainment",
  description: "Movies and TV Series from TMDB",
  keywords:
    "Películas populares, Estrenos de cine, Mejores películas, Cartelera de cine, Recomendaciones de películas",
  icons: {
    icon: [{ url: "/icon/logo.svg", sizes: "40x40" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} antialiased`}>{children}</body>
    </html>
  );
}
