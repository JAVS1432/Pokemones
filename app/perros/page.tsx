type DogApiResponse = {
  message: string;
  status: string;
};

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
    <section className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
          Razas de Perros
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">
          Descubre hermosas razas de perros del mundo
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {images.map(({ raza, image }) => (
            <a
              key={raza}
              href={`/perros/${raza}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow h-full overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={`Perro raza ${raza}`}
                    className="h-40 sm:h-48 lg:h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-40 sm:h-48 lg:h-56 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    Imagen no disponible
                  </div>
                )}

                <div className="p-4 text-center">
                  <span className="capitalize font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                    {raza}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
