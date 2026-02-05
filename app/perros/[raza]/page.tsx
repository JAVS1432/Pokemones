//rfc
import React from 'react'
import Link from 'next/link';

type DogApiResponse = {
  message: string;
  status: string;
};


interface RazaProps {
  params: {
    raza: string;
  };
}

export default async function RazaPage(props: RazaProps) {
  const { raza } = await props.params;

  const res = await fetch(
    `https://dog.ceo/api/breed/${raza}/images/random`,
    { cache: "no-store" }
  );


  if (!res.ok) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 dark:text-red-400 mb-6">
            Error al obtener la información de la raza.
          </p>
          <Link href="/perros" className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Volver
          </Link>
        </div>
      </div>
    );
  }

  const data: DogApiResponse = await res.json();


  if (data.status !== "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 dark:text-red-400 mb-6">
            La raza solicitada no está disponible.
          </p>
          <Link href="/perros" className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Volver
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8'>
      <div className='max-w-2xl mx-auto'>
        {/* Back Button */}
        <Link href="/perros" className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 mb-8 transition-colors font-medium">
          ← Volver al catálogo
        </Link>

        {/* Card */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden'>
          {/* Image */}
          <div className='aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700'>
            <img
              src={data.message}
              alt={`Imagen de un ${raza}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Info */}
          <div className='p-6 sm:p-8'>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold capitalize text-gray-900 dark:text-white mb-4">
              {raza.replace('-', ' ')}
            </h1>

            {/* Details Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8'>
              <div className='bg-orange-50 dark:bg-gray-700 p-4 rounded-lg'>
                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1'>Tipo</p>
                <p className='text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400'>
                  Raza Canina
                </p>
              </div>
              <div className='bg-orange-50 dark:bg-gray-700 p-4 rounded-lg'>
                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1'>Estado</p>
                <p className='text-lg sm:text-xl font-bold text-green-600 dark:text-green-400'>
                  Disponible
                </p>
              </div>
            </div>

            {/* Description */}
            <div className='mb-8'>
              <h2 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                Sobre esta raza
              </h2>
              <p className='text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4'>
                Explora las características y curiosidades sobre la raza <span className='font-semibold capitalize'>{raza.replace('-', ' ')}</span>. Esta raza es apreciada por sus cualidades únicas.
              </p>
              <div className='bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 rounded'>
                <p className='text-sm sm:text-base text-blue-900 dark:text-blue-100'>
                  Consejo: Visita la página principal para explorar más razas de perros del mundo.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3'>
              <Link href="/perros" className='flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold text-center'>
                Ver más razas
              </Link>
              <Link href="/" className='flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold text-center'>
                Ir al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/*
https://dog.ceo/api/breed/labrador/images/random
{
  "message":"https:\/\/images.dog.ceo\/breeds\/labrador\/n02099712_511.jpg",
  "status":"success"
}
*/
