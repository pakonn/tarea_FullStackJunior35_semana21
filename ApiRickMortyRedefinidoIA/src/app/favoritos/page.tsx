"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllFavoritos, deleteFavorito, searchFavoritosByName } from "@/lib/favoritos";
import type { Favorito } from "@/lib/supabase";

const PER_PAGE = 4;

export default function FavoritosPage() {
  const [allFavoritos, setAllFavoritos] = useState<Favorito[]>([]);
  const [displayList, setDisplayList] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);
  const [queryName, setQueryName] = useState("");
  const [page, setPage] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getAllFavoritos();
    setAllFavoritos(data);
    setDisplayList(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id?: number) => {
    if (id == null) return;
    const ok = await deleteFavorito(id);
    if (ok) {
      setAllFavoritos((prev) => prev.filter((f) => f.id !== id));
      setDisplayList((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleQuery = async () => {
    if (!queryName.trim()) {
      setDisplayList(allFavoritos);
      setPage(1);
      return;
    }
    setLoading(true);
    const results = await searchFavoritosByName(queryName.trim());
    setDisplayList(results);
    setPage(1);
    setLoading(false);
  };

  const totalPages = Math.max(1, Math.ceil(displayList.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const current = displayList.slice(start, start + PER_PAGE);

  return (
    <main className="min-h-screen bg-white px-4 py-8 font-sans">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-900">
            Favoritos
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInfo((v) => !v)}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Información
            </button>
            <Link
              href="/"
              className="rounded-md bg-green-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-600"
            >
              Volver
            </Link>
          </div>
        </div>

        {showInfo && (
          <section className="mb-8 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-3 text-lg font-semibold text-blue-900">
              Información del proyecto
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li>Next.js 16 con App Router.</li>
              <li>React 19 y TypeScript 5.</li>
              <li>Tailwind CSS 4 para estilos.</li>
              <li>Turbopack como bundler.</li>
              <li>Supabase para persistencia de favoritos.</li>
              <li>API de Rick and Morty para los personajes.</li>
              <li>Paginación de 4 resultados por página.</li>
            </ul>
          </section>
        )}

        <section className="mb-8 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-100">
            Buscar un registro en específico
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={queryName}
              onChange={(e) => setQueryName(e.target.value)}
              placeholder="Nombre del personaje"
              className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            <button
              onClick={handleQuery}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>
        </section>

        {loading ? (
          <p className="text-slate-600 dark:text-slate-400">Cargando...</p>
        ) : displayList.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">
            No hay favoritos que coincidan.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {current.map((fav) => (
                <article
                  key={fav.id}
                  className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <Image
                    src={fav.image}
                    alt={fav.name}
                    width={300}
                    height={300}
                    className="h-64 w-full object-cover"
                  />
                  <div className="flex flex-col gap-1 p-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                      {fav.name}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium">Estado:</span> {fav.status}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium">Especie:</span> {fav.species}
                    </p>
                    <Link
                      href={`/favoritos/${fav.id}`}
                      className="mt-2 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-center text-sm font-medium text-slate-800 hover:bg-slate-300"
                    >
                      Ver
                    </Link>
                    <button
                      onClick={() => handleDelete(fav.id)}
                      className="mt-2 w-full rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-sm font-medium text-blue-900">
                Página {safePage} de {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
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