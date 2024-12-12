import { TMDBApiCastResponse, TMDBApiResponse, TMDBApiVideoResponse, TVShow } from "@/types/media";

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
  getDetails: (id: number) =>
    tmdbApi.get<TVShow>(`/tv/${id}`).then((response) => response.data),
  getCredits: (id: number) =>
    tmdbApi
      .get<TMDBApiCastResponse>(`/tv/${id}/credits`)
      .then((response) => response.data),
  getDiscover: ({ page = "1", genre }: { page?: string; genre?: string }) =>
    tmdbApi
      .get<TMDBApiResponse<TVShow>>(`/discover/tv`, {
        params: {
          page,
          sort_by: "popularity.desc",
          with_genres: genre,
        },
      })
      .then((response) => response.data),
  getTrailer: (id: number) =>
    tmdbApi
      .get<TMDBApiVideoResponse>(`/tv/${id}/videos`)
      .then((response) => response.data),
};
