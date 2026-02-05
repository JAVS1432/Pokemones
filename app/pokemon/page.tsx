'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetail {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  image?: string;
}

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<Record<string, PokemonDetail>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
        const data = await res.json();
        setPokemon(data.results);

        // Obtener detalles de los primeros pokémon para mostrar
        const detailsPromises = data.results.slice(0, 15).map(async (poke: Pokemon) => {
          const response = await fetch(poke.url);
          const details = await response.json();
          return {
            name: details.name,
            id: details.id,
            height: details.height,
            weight: details.weight,
            types: details.types,
            image: details.sprites.other['official-artwork'].front_default,
          };
        });

        const details = await Promise.all(detailsPromises);
        const detailsMap: Record<string, PokemonDetail> = {};
        details.forEach(d => {
          detailsMap[d.name] = d;
        });
        setPokemonDetails(detailsMap);
      } catch (error) {
        console.error('Error fetching pokemon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filtered = pokemon.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300">Cargando pokémon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Pokédex
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
            Descubre y explora {pokemon.length} pokémon de la API oficial
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Buscar pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            >
              <option value="all">Todos los tipos</option>
              <option value="fire">Fuego</option>
              <option value="water">Agua</option>
              <option value="grass">Planta</option>
              <option value="electric">Eléctrico</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">{pokemon.length}</div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Total Pokémon</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">18</div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Tipos</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{Object.keys(pokemonDetails).length}</div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Cargados</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{filtered.length}</div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Resultados</p>
          </div>
        </div>

        {/* Pokemon Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.slice(0, 12).map((p) => {
            const detail = pokemonDetails[p.name];
            return (
              <Link key={p.name} href={`/pokemon/${p.name}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full p-4 sm:p-6 cursor-pointer transform hover:scale-105 duration-300">
                  {detail?.image ? (
                    <div className="mb-4 h-32 sm:h-40 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded">
                      <img
                        src={detail.image}
                        alt={detail.name}
                        className="h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="mb-4 h-32 sm:h-40 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded">
                      <span className="text-gray-400">Sin imagen</span>
                    </div>
                  )}
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white capitalize mb-2">
                    {detail?.name || p.name}
                  </h3>

                  {detail && (
                    <>
                      <div className="mb-3 space-y-1">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">ID:</span> #{detail.id}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Altura:</span> {detail.height / 10}m
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Peso:</span> {detail.weight / 10}kg
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {detail.types.map((t) => (
                          <span
                            key={t.type.name}
                            className="inline-block px-2 py-1 rounded text-xs font-semibold text-white"
                            style={{
                              backgroundColor: getTypeColor(t.type.name),
                            }}
                          >
                            {t.type.name}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No se encontraron pokémon con "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return colors[type] || '#777777';
}
