import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokédex Dinámico - Next.js",
  description: "Aplicación interactiva de Pokémon con Next.js y Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-white dark:bg-gray-900">
        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Pokédex
                </span>
              </Link>
              <div className="flex gap-4 sm:gap-8">
                <Link href="/" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
                  Inicio
                </Link>
                <Link href="/pokemon" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
                  Pokemon
                </Link>
                <Link href="/perros" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
                  Perros
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        {children}
      </body>
    </html>
  );
}
