"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { fetchMovies } from "@/actions/fetch-movies";
import { Movie } from "@/types";
import { Movies } from "@/components/movies";

export function LoadMore() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreMovies = async () => {
    // Once the page 8 is reached repeat the process all over again.
    await delay(2000);
    const nextPage = (page % 7) + 1;
    const newProducts = (await fetchMovies(nextPage)) ?? [];
    setMovies((prevProducts: Movie[]) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  return (
    <>
      <Movies movies={movies} />
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  );
}
