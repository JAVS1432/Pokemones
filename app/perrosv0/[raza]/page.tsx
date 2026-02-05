//rfc
import React from 'react'

interface DogsInterface {
  params: {
    raza: string
  }
}

export default async function DogsPage(props: DogsInterface) {
  const { raza } = await props.params;
  const res = await fetch(`https://dog.ceo/api/breed/${raza}/images/random`);
  const jsonResponse = await res.json();
  console.log(jsonResponse.message);
  console.log(jsonResponse.status);

  if (jsonResponse.status != 'success') {
    return (
      <div> Error en API
      </div>
    )
  }

  return (

    <div className="flex justify-center items-center min-h-svh bg-amber-500/10">
      <div className="max-w-180 mx-auto ">
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
          <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
            <img
              src={jsonResponse.message}
              alt="card-image" className="object-cover w-full h-full" />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="block font-sans text-3xl antialiased font-bold leading-relaxed text-blue-gray-900">
                Raza {raza}
              </p>
              <p className="block font-sans text-base antialiased font-bold leading-relaxed text-blue-gray-900">
                $95.00
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

