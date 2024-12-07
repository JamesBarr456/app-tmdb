import { Movie, TMDBApiResponse } from "@/types/media";

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
};
