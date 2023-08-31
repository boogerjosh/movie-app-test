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

export async function fetchMoviesSearch(query: string) {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=d212dc1bfc2d8009f736f68f2e71938f&query=${query}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results as Movie[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
