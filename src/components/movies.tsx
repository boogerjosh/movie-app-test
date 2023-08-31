"use client";

import { Movie } from "@/types";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

export interface MoviesProps {
  movies: Movie[] | null;
}

const setVoteClass = (vote: number) => {
  if (vote >= 8) {
    return "text-[#05b805]";
  } else if (vote >= 6) {
    return "text-[#ffa500]";
  } else {
    return "text-[#ff0000]";
  }
};

export function Movies({ movies }: MoviesProps) {
  return (
    <>
      {movies?.map((movie) => (
        <Link
          key={movie.id}
          href={`/${movie.title}/${movie.id}`}
          className="rounded-xl border relative overflow-hidden group"
        >
          <Card key={movie.id}>
            <CardContent>
              <img
                src={
                  movie.poster_path
                    ? IMG_API + movie.poster_path
                    : "https://images.unsplash.com/photo-1538152911114-73f1aa6d6128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
                }
                className="h-[450px] w-full"
                alt={movie.title}
              ></img>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4">
              <CardTitle className="m-0">
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </CardTitle>
              <span
                className={clsx(
                  "bg-[#22254b] rounded-md font-bold p-2 flex items-center ml-2",
                  setVoteClass(movie.vote_average)
                )}
              >
                <div className="text-[#F1C96F] mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#F1C96F"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </div>
                {movie.vote_average}
              </span>
            </CardFooter>
            <div className="group-hover:translate-y-0 bg-white rounded-t-lg shadow-md text-indigo-900 p-4 absolute bottom-0 left-0 right-0 overflow-auto max-h-full transform translate-y-full transition-transform duration-300 ease-in-out">
              <h2 className="text-black font-bold">Overview:</h2>
              <CardDescription className="text-black">
                {movie.overview}
              </CardDescription>
            </div>
          </Card>
        </Link>
      ))}
    </>
  );
}
