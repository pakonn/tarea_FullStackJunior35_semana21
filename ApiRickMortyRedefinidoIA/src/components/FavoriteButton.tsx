"use client";

import { useEffect, useState } from "react";
import {
  addFavorito,
  deleteFavoritoByCharacterId,
  getFavoritoByCharacterId,
} from "@/lib/favoritos";
import type { Character } from "@/types/character";

type Props = {
  character: Character;
};

export default function FavoriteButton({ character }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    getFavoritoByCharacterId(character.id).then((fav) => {
      if (active) setIsFavorite(!!fav);
    });
    return () => {
      active = false;
    };
  }, [character.id]);

  const toggle = async () => {
    setLoading(true);
    if (isFavorite) {
      const ok = await deleteFavoritoByCharacterId(character.id);
      if (ok) setIsFavorite(false);
    } else {
      const fav = await addFavorito({
        character_id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        image: character.image,
      });
      if (fav) setIsFavorite(true);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`mt-2 w-full rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
        isFavorite
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-blue-500 text-white hover:bg-blue-600"
      } disabled:opacity-50`}
    >
      {loading ? "..." : isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    </button>
  );
}