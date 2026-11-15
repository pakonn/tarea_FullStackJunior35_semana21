import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const instant = false;

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PersonajePage({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) notFound();
  const character: Character = await res.json();

  return (
    <main className="min-h-screen bg-white px-4 py-8 font-sans">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-block rounded-md bg-green-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-600"
        >
          Volver
        </Link>
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <Image
            src={character.image}
            alt={character.name}
            width={400}
            height={400}
            className="h-80 w-full object-cover"
          />
          <div className="flex flex-col gap-2 p-6">
            <h1 className="text-3xl font-bold text-blue-900">
              {character.name}
            </h1>
            <p className="text-slate-700">
              <span className="font-medium">Estado:</span> {character.status}
            </p>
            <p className="text-slate-700">
              <span className="font-medium">Especie:</span> {character.species}
            </p>
            <p className="text-slate-700">
              <span className="font-medium">Género:</span> {character.gender}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}