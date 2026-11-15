"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types/character";
import FavoriteButton from "@/components/FavoriteButton";

const PER_PAGE = 4;

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results ?? []))
      .catch(() => setCharacters([]))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(characters.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const current = characters.slice(start, start + PER_PAGE);

  return (
    <main className="min-h-screen bg-white px-4 py-8 font-sans">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-900">
            Personajes de Rick and Morty
          </h1>
          <a
            href="/favoritos"
            className="rounded-md bg-green-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-600"
          >
            Ver favoritos
          </a>
        </div>

        {loading ? (
          <p className="text-slate-600 dark:text-slate-300">Cargando...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {current.map((character) => (
                <article
                  key={character.id}
                  className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={300}
                    height={300}
                    className="h-64 w-full object-cover"
                  />
                  <div className="flex flex-col gap-1 p-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                      {character.name}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium">Estado:</span>{" "}
                      {character.status}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium">Especie:</span>{" "}
                      {character.species}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium">Género:</span>{" "}
                      {character.gender}
                    </p>
                    <FavoriteButton character={character} />
                    <Link
                      href={`/personajes/${character.id}`}
                      className="mt-2 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-center text-sm font-medium text-slate-800 hover:bg-slate-300"
                    >
                      Ver
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-sm font-medium text-blue-900">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}