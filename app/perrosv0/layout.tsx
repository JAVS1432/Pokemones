import Link from "next/link";

const razas = [
    "affenpinscher",
    "airedale",
    "akita",
    "appenzeller",
    "basenji",
    "beagle",
    "bluetick",
    "borzoi",
    "bouvier",
    "boxer",
    "brabancon",
    "briard",
    "cavapoo",
    "chihuahua",
];

//lrc
export default function DogsLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col" >
            <nav className="w-full flex items-center justify-center bg-gray-800/75 p-4 gap-4 mb-1 sm:px-4 lg:px-8">
                <div className="flex flex-1 items-center sm:flex-col lg:flex-row lg:justify-center gap-2 sm:items-stretch sm:justify-start  ">
                     

                    {
                        razas.map((raza) => (
                            <Link
                                key={raza}
                                href={`/perrosv0/${raza}`}
                                className="bg-gray-800 border-2 border-gray-400/50 text-white px-3 py-2 rounded-md text-md font-medium hover:bg-gray-900/50 hover:border-2 hover:border-gray-100"
                            >
                                {raza.replace('-', ' ')}
                            </Link>
                        ))
                    }
                </div>
            </nav>

            <div>
                {children}
            </div>
            <footer className="bg-gray-800 border-t">
                <div className="w-full mx-auto px-6 py-3 text-md text-gray-200 text-center ">
                    {new Date().getFullYear()} Catálogo Canino  - <Link href="https://dog.ceo/dog-api/" className="hover:underline">Dog API</Link>
                </div>
            </footer>
        </div>
    );
}