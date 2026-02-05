import Link from "next/link";


export default function PerrosLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-gradient-to-r from-amber-900 to-orange-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                        Catálogo de Razas de Perros
                    </h1>
                    <p className="text-sm sm:text-base text-amber-100">
                        Selección y descripción de razas caninas del mundo
                    </p>
                </div>
            </header>

            <nav className="bg-orange-700 dark:bg-gray-800 border-b border-orange-600 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ul className="flex flex-wrap gap-3 sm:gap-6 py-3 text-xs sm:text-sm font-medium text-white">
                        <li>
                            <Link
                                href="/perros"
                                className="hover:text-orange-200 transition-colors"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/perros/labrador"
                                className="hover:text-orange-200 transition-colors"
                            >
                                Labrador
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/perros/beagle"
                                className="hover:text-orange-200 transition-colors"
                            >
                                Beagle
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/perros/akita"
                                className="hover:text-orange-200 transition-colors"
                            >
                                Akita
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 dark:bg-gray-900 border-t border-gray-700 mt-8 sm:mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-xs sm:text-sm text-gray-400 text-center">
                    © {new Date().getFullYear()} Catálogo Canino · Next.js + Tailwind CSS
                </div>
            </footer>
        </div>
    );
}