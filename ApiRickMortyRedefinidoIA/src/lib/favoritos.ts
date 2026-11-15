import { supabase, type Favorito } from "./supabase";

// 1) Consultar un registro en específico por su id
export async function getFavoritoById(id: number): Promise<Favorito | null> {
  const { data, error } = await supabase
    .from("favoritos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error al consultar favorito:", error.message);
    return null;
  }
  return data as Favorito;
}

// Consultar un registro en específico por character_id
export async function getFavoritoByCharacterId(
  characterId: number
): Promise<Favorito | null> {
  const { data, error } = await supabase
    .from("favoritos")
    .select("*")
    .eq("character_id", characterId)
    .maybeSingle();

  if (error) {
    console.error("Error al consultar favorito:", error.message);
    return null;
  }
  return (data as Favorito) ?? null;
}

// Consultar un registro en específico por nombre
export async function getFavoritoByName(name: string): Promise<Favorito | null> {
  const { data, error } = await supabase
    .from("favoritos")
    .select("*")
    .ilike("name", `%${name}%`)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error al consultar favorito por nombre:", error.message);
    return null;
  }
  return (data as Favorito) ?? null;
}

// Buscar registros cuyo nombre coincida con el filtro
export async function searchFavoritosByName(name: string): Promise<Favorito[]> {
  const { data, error } = await supabase
    .from("favoritos")
    .select("*")
    .ilike("name", `%${name}%`);

  if (error) {
    console.error("Error al buscar favoritos por nombre:", error.message);
    return [];
  }
  return (data as Favorito[]) ?? [];
}

// 2) Eliminar un registro en específico por su id
export async function deleteFavorito(id: number): Promise<boolean> {
  const { error } = await supabase.from("favoritos").delete().eq("id", id);

  if (error) {
    console.error("Error al eliminar favorito:", error.message);
    return false;
  }
  return true;
}

// Eliminar un registro en específico por character_id
export async function deleteFavoritoByCharacterId(
  characterId: number
): Promise<boolean> {
  const { error } = await supabase
    .from("favoritos")
    .delete()
    .eq("character_id", characterId);

  if (error) {
    console.error("Error al eliminar favorito:", error.message);
    return false;
  }
  return true;
}

// 3) Extraer todo el contenido
export async function getAllFavoritos(): Promise<Favorito[]> {
  const { data, error } = await supabase.from("favoritos").select("*");

  if (error) {
    console.error("Error al extraer favoritos:", error.message);
    return [];
  }
  return (data as Favorito[]) ?? [];
}

// Método auxiliar para agregar un favorito
export async function addFavorito(favorito: Omit<Favorito, "id" | "created_at">): Promise<Favorito | null> {
  const { data, error } = await supabase
    .from("favoritos")
    .insert(favorito)
    .select()
    .single();

  if (error) {
    console.error("Error al agregar favorito:", error.message);
    return null;
  }
  return data as Favorito;
}