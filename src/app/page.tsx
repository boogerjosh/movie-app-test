"use client";

import { fetchMovies, fetchMoviesSearch } from "@/actions/fetch-movies";
import { LoadMore } from "@/components/load-more";
import { Movies } from "@/components/movies";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    async function fetchTopRatedMovies() {
      const movies = await fetchMovies(1);
      setTopRatedMovies(movies);
    }
    fetchTopRatedMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(query, "query");

    if (query === "") {
      // If the query is empty, clear search results
      setSearchResults([]);
      setSearchPerformed(false);
      const movies = await fetchMovies(1);
      setTopRatedMovies(movies);
    } else {
      // Fetch search results using the query
      const movies = await fetchMoviesSearch(query);
      setSearchResults(movies);
      setSearchPerformed(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mx-auto px-4 py-8 min-h-screen max-w-5xl">
        <form className="mb-4" onSubmit={handleSearch}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            options={topRatedMovies.map((movie) => movie.title)}
            onInputChange={(event, newInputValue) => {
              setQuery(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search movie..."
                InputProps={{
                  ...params.InputProps,
                  className: "text-white border-white",
                  type: "search",
                }}
                InputLabelProps={{
                  className: "text-white color", // Apply white color to the input label
                }}
                variant="outlined"
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
            )}
          />
        </form>
        <h1 className="text-3xl font-bold mb-4 text-center">
          Top Rated Movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Movies movies={searchPerformed ? searchResults : topRatedMovies} />
          {!searchPerformed && <LoadMore />}
        </div>
      </div>
    </main>
  );
}
