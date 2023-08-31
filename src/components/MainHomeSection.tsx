"use client";

import { useState } from "react";
import { Movies } from "./Movies";
import DatePickerSection from "./DatePickerSection";
import { Movie } from "@/types";
import { LoadMore } from "./load-more";
import {
  fetchMoviesByyear,
  fetchMovies,
  fetchMoviesSearch,
} from "@/actions/fetch-movies";
import { Autocomplete, TextField } from "@mui/material";

export interface MainHomeProps {
  movies: Movie[] | null;
}

const MainHomeSection = ({ movies }: MainHomeProps) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [topRatedMovies, setTopRatedMovies] = useState(movies);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [query, setQuery] = useState("");

  const handleYearChange = async (newValue) => {
    const movies = await fetchMoviesByyear(newValue, 1);
    setSearchResults(movies);
    setSearchPerformed(true);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query === "") {
      // If the query is empty, clear search results
      setSearchResults([]);
      setSearchPerformed(false);
      const movies = await fetchMovies(1);
      setTopRatedMovies(movies);
    } else {
      // Fetch search results using the query
      setSelectedYear("");
      const movies = await fetchMoviesSearch(query, 1);
      console.log(movies);
      setSearchResults(movies);
      setSearchPerformed(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen max-w-5xl">
      <form className="mb-4" onSubmit={handleSearch}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          options={movies.map((movie) => movie.title)}
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
      <DatePickerSection
        handleYearChange={handleYearChange}
        setSelectedYear={setSelectedYear}
      />
      <h1 className="text-3xl font-bold mb-8 mt-4 text-center">
        Top Rated Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Movies movies={searchPerformed ? searchResults : topRatedMovies} />
        <LoadMore
          selectedYear={selectedYear}
          searchPerformed={searchPerformed}
          query={query}
        />
      </div>
    </div>
  );
};

export default MainHomeSection;
