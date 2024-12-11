import { Movie, TMDBApiCastResponse, TMDBApiResponse } from "@/types/media";

import { tmdbApi } from "@/config/axios";

export const moviesAPI = {
  getTopRated: () =>
    tmdbApi
      .get<TMDBApiResponse<Movie>>("/movie/top_rated")
      .then((response) => response.data),

  getPopular: () =>
    tmdbApi
      .get<TMDBApiResponse<Movie>>("/movie/popular")
      .then((response) => response.data),

  getTrending: () =>
    tmdbApi
      .get<TMDBApiResponse<Movie>>("/trending/movie/week")
      .then((response) => response.data),

  getDetails: (id: number) =>
    tmdbApi.get<Movie>(`/movie/${id}`).then((response) => response.data),
  getCredits: (id: number) =>
    tmdbApi
      .get<TMDBApiCastResponse>(`/movie/${id}/credits`)
      .then((response) => response.data),
  getDiscover: ({ page = "1", genre }: { page?: string; genre?: string }) =>
    tmdbApi
      .get<TMDBApiResponse<Movie>>(`/discover/movie`, {
        params: {
          page,
          sort_by: "popularity.desc",
          with_genres: genre,
        },
      })
      .then((response) => response.data),
};
