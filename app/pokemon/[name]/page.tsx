'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface PokemonDetail {
  name: string;
  id: number;
  height: number;
  weight: number;
  base_experience: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  moves: Array<{
    move: {
      name: string;
    };
  }>;
}

export default function PokemonDetailPage() {
  const params = useParams();
  const name = params.name as string;
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!res.ok) throw new Error('Pokémon no encontrado');
        const data = await res.json();
        setDetail(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300">Cargando pokémon...</p>
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Link href="/pokemon" className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Volver a Pokémon
          </Link>
        </div>
      </div>
    );
  }

  const typeColor = getTypeColor(detail.types[0]?.type.name || 'normal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/pokemon" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors">
          ← Volver
        </Link>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div 
            className="h-32 sm:h-48"
            style={{ backgroundColor: typeColor }}
          ></div>

          <div className="px-4 sm:px-8 py-4 sm:py-8">
            {/* Header */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {/* Image */}
              <div className="flex items-center justify-center -mt-24 sm:mt-0">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
                  <img
                    src={detail.sprites.other['official-artwork'].front_default}
                    alt={detail.name}
                    className="h-32 sm:h-48 w-32 sm:w-48 object-contain"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="sm:col-span-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white capitalize mb-2">
                  {detail.name}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-4">
                  #{String(detail.id).padStart(3, '0')}
                </p>

                {/* Types */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {detail.types.map((t) => (
                    <span
                      key={t.type.name}
                      className="px-3 sm:px-4 py-1 sm:py-2 rounded-full text-white font-semibold text-sm sm:text-base"
                      style={{
                        backgroundColor: getTypeColor(t.type.name),
                      }}
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>

                {/* Physical Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Altura</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {detail.height / 10}m
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Peso</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {detail.weight / 10}kg
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Estadísticas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {detail.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">
                        {stat.stat.name}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {stat.base_stat}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(stat.base_stat / 150) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Habilidades
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.abilities.map((ability) => (
                  <div
                    key={ability.ability.name}
                    className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg"
                  >
                    <p className="font-semibold text-gray-900 dark:text-white capitalize text-sm sm:text-base">
                      {ability.ability.name}
                    </p>
                    {ability.is_hidden && (
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        (Habilidad oculta)
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Moves Preview */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Movimientos ({detail.moves.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {detail.moves.slice(0, 12).map((move) => (
                  <div
                    key={move.move.name}
                    className="bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 px-3 py-2 rounded text-xs sm:text-sm font-semibold capitalize text-center"
                  >
                    {move.move.name}
                  </div>
                ))}
              </div>
              {detail.moves.length > 12 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  +{detail.moves.length - 12} movimientos más...
                </p>
              )}
            </div>
          </div>
        </div>
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
