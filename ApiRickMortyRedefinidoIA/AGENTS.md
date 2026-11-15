<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Reglas del proyecto ApiRickMortyRedefinidoIA

## Stack y versiones
- Next.js 16 (App Router), React 19, TypeScript 5.
- Tailwind CSS 4 (configurado vía `@tailwindcss/turbopack`).
- Supabase (`@supabase/supabase-js`) para persistencia de favoritos.
- Bundler: Turbopack.

## Estructura
- Código en `src/`. Rutas en `src/app/` (App Router): `layout.tsx`, `page.tsx`, `favoritos/page.tsx`, `favoritos/[id]/page.tsx`, `personajes/[id]/page.tsx`.
- Componentes reutilizables en `src/components/` (`FavoriteButton.tsx`).
- Lógica de datos en `src/lib/` (`supabase.ts`, `favoritos.ts`).
- Tipos en `src/types/` (`character.ts`).
- Alias de importación: `@/*` → `src/*`.

## Estilo y aspecto
- Fondo blanco en todas las páginas (`bg-white`).
- Títulos principales en color navy (`text-blue-900`).
- Botón "Agregar a favoritos": azul (`bg-blue-500`).
- Botón "Quitar de favoritos": rojo (`bg-red-500`).
- Botón "Ver favoritos", botones de paginación, botón "Volver" e "Información": verde/azul según corresponda (ver favoritos y paginación en verde; información en azul).
- Contenido centrado y estrecho (`mx-auto max-w-5xl`).
- Textos secundarios en slate (`text-slate-600`, `text-slate-700`).

## Datos y APIs
- API de personajes: `https://rickandmortyapi.com/api/character` (campos: id, name, status, species, gender, image).
- Imágenes remotas permitidas en `next.config.ts` (`images.remotePatterns` para `rickandmortyapi.com`).
- Supabase:
  - URL: `https://esrybgzmmmtfkmazwxjs.supabase.co`
  - Key pública: `sb_publishable_JKD37MGAS0ueqmfy0OYwqQ_H1tBKEoD`
  - Tabla `favoritos`: id (auto), created_at, character_id, name, image, status, species.
- Métodos en `src/lib/favoritos.ts`:
  - `getFavoritoById(id)` — consultar un registro específico.
  - `getFavoritoByCharacterId(characterId)` — por character_id.
  - `getFavoritoByName(name)` — por nombre (búsqueda parcial `ilike`).
  - `searchFavoritosByName(name)` — lista de coincidencias por nombre.
  - `deleteFavorito(id)` — eliminar un registro específico.
  - `deleteFavoritoByCharacterId(characterId)` — eliminar por character_id.
  - `getAllFavoritos()` — extraer todo el contenido.
  - `addFavorito(...)` — agregar un favorito.

## Funcionalidad
- Página principal (`/`): grid de 4 columnas con imagen, nombre, estado, especie y género; botón para enviar el registro a `favoritos`; botón "Ver" que abre `/personajes/[id]`.
- Página de favoritos (`/favoritos`): grid de favoritos; búsqueda por nombre que filtra el grid; botón "Información" con tecnologías; botón "Ver" que abre `/favoritos/[id]`; eliminación de registros.
- Páginas de detalle: `/personajes/[id]` y `/favoritos/[id]` muestran el elemento solo.
- Paginación de 4 resultados por página con botones "Anterior"/"Siguiente" y contador "Página X de Y", en ambas páginas.
- App Router: rutas basadas en carpetas bajo `src/app/`.