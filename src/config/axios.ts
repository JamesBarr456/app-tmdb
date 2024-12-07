import axios from "axios";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3", // URL base de TMDB
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
    "Content-Type": "application/json",
  },
});
