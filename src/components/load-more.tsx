"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import {
  fetchMovies,
  fetchMoviesByyear,
  fetchMoviesSearch,
} from "@/actions/fetch-movies";
import { Movie } from "@/types";
import { Movies } from "@/components/Movies";

export interface LoadMoreProps {
  selectedYear: string;
  searchPerformed: boolean;
  query: string;
}

export function LoadMore({
  selectedYear,
  searchPerformed,
  query,
}: LoadMoreProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [filterMovie, setFilterMovie] = useState<Movie[]>([]);
  const [searchMovie, setSearchMovie] = useState<Movie[]>([]);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    setMovies([]);
    setFilterMovie([]);
    setSearchMovie([]);
    setPage(1);
    setLoadingComplete(false);
  }, [selectedYear, searchPerformed, query]);

  const loadMoreMovies = async () => {
    // Once the page 8 is reached repeat the process all over again.
    await delay(2000);

    const nextPage = page + 1;

    let newProducts;

    if (searchPerformed) {
      if (selectedYear) {
        newProducts = (await fetchMoviesByyear(selectedYear, nextPage)) ?? [];

        setFilterMovie((prevProducts: Movie[]) => [
          ...prevProducts,
          ...newProducts,
        ]);

        setPage(nextPage);

        // Check if there are more movies to load
        if (newProducts.length === 0) {
          setLoadingComplete(true);
        }
      } else {
        newProducts = (await fetchMoviesSearch(query, nextPage)) ?? [];

        setSearchMovie((prevProducts: Movie[]) => [
          ...prevProducts,
          ...newProducts,
        ]);

        setPage(nextPage);

        // Check if there are more movies to load
        if (newProducts.length === 0) {
          setLoadingComplete(true);
        }
      }
    } else {
      newProducts = (await fetchMovies(nextPage)) ?? [];

      setMovies((prevProducts: Movie[]) => [...prevProducts, ...newProducts]);

      setPage(nextPage);

      // Check if there are more movies to load
      if (newProducts.length === 0) {
        setLoadingComplete(true);
      }
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  return (
    <>
      {searchPerformed && (
        <Movies movies={selectedYear ? filterMovie : searchMovie} />
      )}

      {!searchPerformed && <Movies movies={movies} />}

      {/* Conditional rendering of the spinner */}
      {!loadingComplete && (
        <div
          className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
          ref={ref}
        >
          <Spinner />
        </div>
      )}
    </>
  );
}
