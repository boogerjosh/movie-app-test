import { Movie } from "@/types";

export async function fetchMovies(page: number) {
  const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?page=${page}&api_key=d212dc1bfc2d8009f736f68f2e71938f`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchMoviesSearch(query: string, page: number) {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?page=${page}&api_key=d212dc1bfc2d8009f736f68f2e71938f&query=${query}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchMoviesByyear(year: string, page: number) {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=d212dc1bfc2d8009f736f68f2e71938f&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchMoviesById(id: string) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=d212dc1bfc2d8009f736f68f2e71938f`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

