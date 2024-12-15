import { Media, Movie } from '@/types/media';

import { TMDBApiResponse } from '../types/media';
import { moviesAPI } from './api/api-movies';
import { tmdbApi } from '@/config/axios';
import { tvAPI } from './api/api-tv';

class TMDBService {
  // Movies
  async getTopRatedMovies() {
    try {
      const response = await tmdbApi
        .get<TMDBApiResponse<Movie>>('/movie/top_rated')
        .then((response) => response.data);

      return response;
    } catch (error) {
      console.error('Error in getTopRatedMovies:', error);
      throw new Error(
        (error as Error).message || 'An unexpected error occurred.'
      );
    }
  }

  async getPopularMovies() {
    try {
      const response = await tmdbApi
        .get<TMDBApiResponse<Movie>>('/movie/popular')
        .then((response) => response.data);

      return response;
    } catch (error) {
      console.error('Error in getPopularMovies:', error);
      throw new Error(
        (error as Error).message || 'An unexpected error occurred.'
      );
    }
  }

  async getTrendingMovies() {
    try {
      const response = await tmdbApi
        .get<TMDBApiResponse<Movie>>('/trending/movie/week')
        .then((response) => response.data);
      return response;
    } catch (error) {
      console.error('Error in getTrendingMovies:', error);
      throw new Error(
        (error as Error).message || 'An unexpected error occurred.'
      );
    }
  }

  async getDetailsMovie(id: number) {
    return moviesAPI.getDetails(id);
  }

  async getCreditsMovie(id: number) {
    return moviesAPI.getCredits(id);
  }

  async getDiscoverMovie({ page, genre }: { page?: string; genre?: string }) {
    return moviesAPI.getDiscover({ genre, page });
  }

  async getVideosMovie(id: number) {
    return moviesAPI.getTrailer(id);
  }
  // TV Shows
  async getPopularTVShows() {
    return tvAPI.getPopular();
  }

  async getTopRatedTVShows() {
    return tvAPI.getTopRated();
  }

  async getTrendingTVShows() {
    return tvAPI.getTrending();
  }
  async getDetailsTVShows(id: number) {
    return tvAPI.getDetails(id);
  }

  async getCreditsTVShows(id: number) {
    return tvAPI.getCredits(id);
  }

  async getDiscoverTVShows({ page, genre }: { page?: string; genre?: string }) {
    return tvAPI.getDiscover({ genre, page });
  }

  async getVideosTVShows(id: number) {
    return tvAPI.getTrailer(id);
  }
  // Home Page Data
  async getHomePageData() {
    try {
      const [
        topRatedMovies,
        popularMovies,
        trendingMovies,
        popularTVShows,
        topRatedTVShows,
        trendingTVShows,
      ] = await Promise.all([
        this.getTopRatedMovies(),
        this.getPopularMovies(),
        this.getTrendingMovies(),
        this.getPopularTVShows(),
        this.getTopRatedTVShows(),
        this.getTrendingTVShows(),
      ]);

      return {
        movies: {
          topRated: topRatedMovies.results.slice(0, 10),
          popular: popularMovies.results.slice(0, 10),
          trending: trendingMovies.results.slice(0, 10),
        },
        tvShows: {
          topRated: topRatedTVShows.results.slice(0, 10),
          popular: popularTVShows.results.slice(0, 10),
          trending: trendingTVShows.results.slice(0, 10),
        },
      };
    } catch (error) {
      console.error('Error fetching home page data:', error);
      throw error;
    }
  }

  //Movie Page Data
  async getMoviePageData(id: number) {
    try {
      const [detailsMovies, creditsMovies, videosMovies] = await Promise.all([
        this.getDetailsMovie(id),
        this.getCreditsMovie(id),
        this.getVideosMovie(id),
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
      console.error('Error fetching home page data:', error);
      throw error;
    }
  }

  //Movies Page Data
  async getMoviesPageData({ page, genre }: { page?: string; genre?: string }) {
    try {
      const discoverMovies = await this.getDiscoverMovie({ page, genre });

      return {
        movie: {
          discoverMovies: discoverMovies,
        },
      };
    } catch (error) {
      console.error('Error fetching home page data:', error);
      throw error;
    }
  }
  //TV Page Data
  async getTVShowPageData(id: number) {
    try {
      const [detailsTV, creditsTV, videosTV] = await Promise.all([
        this.getDetailsTVShows(id),
        this.getCreditsTVShows(id),
        this.getVideosTVShows(id),
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
      console.error('Error fetching home page data:', error);
      throw error;
    }
  }

  //TVs Page Data
  async getTVShowsPageData({ page, genre }: { page?: string; genre?: string }) {
    try {
      const discoverMovies = await this.getDiscoverTVShows({ page, genre });

      return {
        movie: {
          discoverMovies: discoverMovies,
        },
      };
    } catch (error) {
      console.error('Error fetching home page data:', error);
      throw error;
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
      const response = await tmdbApi
        .get<TMDBApiResponse<Media>>(`/search/multi`, {
          params: {
            page,
            query: searchMedia,
          },
        })
        .then((response) => response.data);

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
