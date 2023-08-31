import { fetchMovies } from "@/actions/fetch-movies";
import MainHomeSection from "@/components/MainHomeSection";

export default async function Home() {
  const movies = await fetchMovies(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <MainHomeSection movies={movies} />
    </main>
  );
}
