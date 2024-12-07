import { TMDBApiResponse, TVShow } from "@/types/media";

import { tmdbApi } from "@/config/axios";

export const tvAPI = {
  getTopRated: () =>
    tmdbApi
      .get<TMDBApiResponse<TVShow>>("/tv/top_rated")
      .then((response) => response.data),

  getPopular: () =>
    tmdbApi
      .get<TMDBApiResponse<TVShow>>("/tv/popular")
      .then((response) => response.data),

  getTrending: () =>
    tmdbApi
      .get<TMDBApiResponse<TVShow>>("/trending/tv/week")
      .then((response) => response.data),
};
