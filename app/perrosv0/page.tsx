import React from 'react'
import Image from 'next/image'
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

type DogApiResponse = {
    message: string;
    status: string;
};


async function getDogImage(raza: string): Promise<string | null> {
    const res = await fetch(
        `https://dog.ceo/api/breed/${raza}/images/random`,
        { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data: DogApiResponse = await res.json();
    return data.status === "success" ? data.message : null;
}




export default async function PerrosPage() {

    const images = await Promise.all(
        razas.map(async (raza) => ({
            raza,
            image: await getDogImage(raza),
        }))
    );

    return (
        <div className="grid  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 min-h-svh bg-slate-900/10">
            {
                images.map(({ raza, image }) => (
                    <Link
                        key={raza}
                        href={`/perrosv0/${raza}`}
                        className="min-w-62.5 shrink-0 m-4"
                    >
                        <div className=" text-center flex flex-col gap-2 justify-center bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow transform  hover:scale-105 duration-200">

                            {image ? (
                                <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                                    <Image
                                        src={image}
                                        alt={`Perro raza ${raza}`}
                                        fill
                                        className="p-4 object-cover rounded-4xl"
                                    />
                                </div>
                            ) : (
                                <div className="w-full max-w-xs h-48 flex items-center justify-center bg-gray-200 rounded-t-lg">
                                    <span className="text-gray-500">Imagen no disponible</span>
                                </div>
                            )}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold capitalize">
                                    {raza.replace('-', ' ')}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))
            }

        </div>
    )
}

/*
    relative: El componente Image con la propiedad fill usa un posicionamiento absoluto (position: absolute). 
            Para que la imagen se quede dentro del div y no se "escape" por toda la pantalla, el padre debe ser relative.
    
            h-64 w-full: Define el tamaño del contenedor (256px de alto y todo el ancho disponible). 
    Como la imagen tiene fill, se estirará automáticamente para llenar este espacio exacto.
    
    overflow-hidden: Funciona como una "máscara". Si la imagen es más grande o tiene esquinas cuadradas, esta clase 
        recorta todo lo que sobresalga del borde del div. 
        Obliga a la imagen a "cortarse" siguiendo la forma redondeada del padre.

*/