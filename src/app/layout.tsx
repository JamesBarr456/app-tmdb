import './globals.css';

import type { Metadata } from 'next';
import { UserProvider } from '@/context/context-user';

export const metadata: Metadata = {
  title: 'Entertainment',
  description: 'Movies and TV Series from TMDB',
  keywords:
    'Películas populares, Estrenos de cine, Mejores películas, Cartelera de cine, Recomendaciones de películas',
  icons: {
    icon: [{ url: '/icon/logo.svg', sizes: '40x40' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`font-outfit bg-dark-blue antialiased`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
