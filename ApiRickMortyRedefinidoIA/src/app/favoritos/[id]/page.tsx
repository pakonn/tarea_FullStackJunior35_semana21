"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFavoritoById } from "@/lib/favoritos";
import type { Favorito } from "@/lib/supabase";

type Props = {
  params: Promise<{ id: string }>;
};

export default function FavoritoDetailPage({ params }: Props) {
  const [favorito, setFavorito] = useState<Favorito | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    params.then(({ id }) => {
      getFavoritoById(Number(id)).then((fav) => {
        if (active) {
          setFavorito(fav);
          setLoading(false);
        }
      });
    });
    return () => {
      active = false;
    };
  }, [params]);

  return (
    <main className="min-h-screen bg-white px-4 py-8 font-sans">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/favoritos"
          className="mb-6 inline-block rounded-md bg-green-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-600"
        >
          Volver
        </Link>
        {loading ? (
          <p className="text-slate-600">Cargando...</p>
        ) : !favorito ? (
          <p className="text-slate-600">No se encontró el favorito.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <Image
              src={favorito.image}
              alt={favorito.name}
              width={400}
              height={400}
              className="h-80 w-full object-cover"
            />
            <div className="flex flex-col gap-2 p-6">
              <h1 className="text-3xl font-bold text-blue-900">
                {favorito.name}
              </h1>
              <p className="text-slate-700">
                <span className="font-medium">Estado:</span> {favorito.status}
              </p>
              <p className="text-slate-700">
                <span className="font-medium">Especie:</span>{" "}
                {favorito.species}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}