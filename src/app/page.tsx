import Image from "next/image";
import { fetchMovies } from "@/actions/fetch-movies";
import { LoadMore } from "@/components/load-more";
import { Movies } from "@/components/movies";

export default async function Home() {
  const movies = await fetchMovies(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mx-auto px-4 py-8 min-h-screen max-w-5xl">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Top Rated Movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Movies movies={movies} />
          <LoadMore />
        </div>
      </div>
    </main>
  );
}
