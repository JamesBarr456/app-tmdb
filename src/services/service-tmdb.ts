
import { TMDBApiCastResponse, TMDBApiResponse, TMDBApiVideoResponse } from '@/types/tmdb/api-response';
import { TMDB_ROUTES } from '../routes/routes-tmdb-api';
import { tmdbApi } from '@/config/axios';
import { Media, Movie, TVShow } from '@/types/tmdb/media';


class TMDBService {
  async getMediaData<T>({
    endpoint,
    params,
  }: {
    endpoint: string;
    params?: Record<string, string | number | boolean | undefined>;
  }): Promise<T> {
    try {
      const response = await tmdbApi
        .get<T>(endpoint, { params })
        .then((response) => response.data);

      return response;
    } catch (error) {
      console.error(`Error in getMediaData (${endpoint}):`, error);
      throw new Error(
        (error as Error).message || 'An unexpected error occurred.'
      );
    }
  }

  // Home Page Data
  async getHomePageData() {
    try {
      const [
        topRatedMovies,
        popularMovies,
        trendingMovies,
        topRatedTVShows,
        popularTVShows,
        trendingTVShows,
      ] = await Promise.all([
        this.getMediaData<TMDBApiResponse<Movie>>({
          endpoint: TMDB_ROUTES.movies.topRated,
        }),
        this.getMediaData<TMDBApiResponse<Movie>>({
          endpoint: TMDB_ROUTES.movies.popular,
        }),
        this.getMediaData<TMDBApiResponse<Movie>>({
          endpoint: TMDB_ROUTES.movies.trending,
        }),
        this.getMediaData<TMDBApiResponse<TVShow>>({
          endpoint: TMDB_ROUTES.tvShows.topRated,
        }),
        this.getMediaData<TMDBApiResponse<TVShow>>({
          endpoint: TMDB_ROUTES.tvShows.popular,
        }),
        this.getMediaData<TMDBApiResponse<TVShow>>({
          endpoint: TMDB_ROUTES.tvShows.trending,
        }),
      ]);

      return {
        movies: {
          topRated: topRatedMovies?.results.slice(0, 10),
          popular: popularMovies?.results.slice(0, 10),
          trending: trendingMovies?.results.slice(0, 10),
        },
        tvShows: {
          topRated: topRatedTVShows?.results.slice(0, 10),
          popular: popularTVShows?.results.slice(0, 10),
          trending: trendingTVShows?.results.slice(0, 10),
        },
      };
    } catch (error) {
      console.error('Error fetching home page data:', error);
      throw new Error(
        (error as Error).message || 'An unexpected error occurred.'
      );
    }
  }

  //Movie Page Data
  async getMoviePageData(id: number) {
    try {
      const [detailsMovies, creditsMovies, videosMovies] = await Promise.all([
        this.getMediaData<Movie>({
          endpoint: TMDB_ROUTES.movies.details(id),
        }),
        this.getMediaData<TMDBApiCastResponse>({
          endpoint: TMDB_ROUTES.movies.credits(id),
        }),
        this.getMediaData<TMDBApiVideoResponse>({
          endpoint: TMDB_ROUTES.movies.videos(id),
        }),
      ]);

      const trailer = videosMovies.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );
      return {
        movie: {
          details: detailsMovies,
          credits: creditsMovies.cast,
          videos: trailer ? trailer.key : null,
        },
      };
    } catch (error) {
      console.error(`Error in getMoviePageData`, error);
      throw new Error(
        (error as Error).message || 'An unexpected error occurred.'
      );
    }
  }

  //Movies Page Data
  async getMoviesPageData({
    page = '1',
    genre,
  }: {
    page?: string;
    genre?: string;
  }) {
    try {
      const discoverMovies = await await this.getMediaData<
        TMDBApiResponse<Movie>
      >({
        endpoint: TMDB_ROUTES.movies.discover,
        params: {
          page,
          sort_by: 'popularity.desc',
          with_genres: genre,
        },
      });
      return {
        movie: {
          discover: discoverMovies,
        },
      };
    } catch (error) {
      console.error(`Error in getMoviesPageData`, error);
      throw new Error(
        (error as Error).message || 'An unexpected error occurred.'
      );
    }
  }
  //TV Page Data
  async getTVShowPageData(id: number) {
    try {
      const [detailsTV, creditsTV, videosTV] = await Promise.all([
        this.getMediaData<TVShow>({
          endpoint: TMDB_ROUTES.tvShows.details(id),
        }),
        this.getMediaData<TMDBApiCastResponse>({
          endpoint: TMDB_ROUTES.tvShows.credits(id),
        }),
        this.getMediaData<TMDBApiVideoResponse>({
          endpoint: TMDB_ROUTES.tvShows.videos(id),
        }),
      ]);

      const trailer = videosTV.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );
      return {
        tv: {
          details: detailsTV,
          credits: creditsTV.cast,
          videos: trailer ? trailer.key : null,
        },
      };
    } catch (error) {
      console.error(`Error in getTVShowPageData`, error);
      throw new Error(
        (error as Error).message || 'An unexpected error occurred.'
      );
    }
  }

  //TVs Page Data
  async getTVShowsPageData({
    page = '1',
    genre,
  }: {
    page?: string;
    genre?: string;
  }) {
    try {
      const discoverTVShows = await this.getMediaData<TMDBApiResponse<TVShow>>({
        endpoint: TMDB_ROUTES.tvShows.discover,
        params: {
          page,
          sort_by: 'popularity.desc',
          with_genres: genre,
        },
      });

      return {
        tv: {
          discover: discoverTVShows,
        },
      };
    } catch (error) {
      console.error(`Error in getTVShowsPageData`, error);
      throw new Error(
        (error as Error).message || 'An unexpected error occurred.'
      );
    }
  }

  async getFoundMedia({
    page,
    searchMedia,
  }: {
    page?: string;
    searchMedia: string;
  }) {
    try {
      const response = await this.getMediaData<TMDBApiResponse<Media>>({
        endpoint: '/search/multi',
        params: {
          page,
          query: searchMedia,
        },
      });
      return {
        data: response,
      };
    } catch (error) {
      console.error('Error in getFoundMedia:', error);
      throw new Error(
        (error as Error).message || 'An unexpected error occurred.'
      );
    }
  }
}

export const tmdbService = new TMDBService();
