import { moviesAPI } from "./api/api-movies";
import { tvAPI } from "./api/api-tv";

class TMDBService {
  // Movies
  async getTopRatedMovies() {
    return moviesAPI.getTopRated();
  }

  async getPopularMovies() {
    return moviesAPI.getPopular();
  }

  async getTrendingMovies() {
    return moviesAPI.getTrending();
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
      console.error("Error fetching home page data:", error);
      throw error;
    }
  }

  //Movie Page Data
  async getMoviePageData(id: number) {
    try {
      const [detailsMovies, creditsMovies] = await Promise.all([
        this.getDetailsMovie(id),
        this.getCreditsMovie(id),
      ]);

      return {
        movie: {
          details: detailsMovies,
          credits: creditsMovies.cast,
        },
      };
    } catch (error) {
      console.error("Error fetching home page data:", error);
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
      console.error("Error fetching home page data:", error);
      throw error;
    }
  }
  //TV Page Data
  async getTVShowPageData(id: number) {
    try {
      const [detailsTV, creditsTV] = await Promise.all([
        this.getDetailsTVShows(id),
        this.getCreditsTVShows(id),
      ]);

      return {
        movie: {
          details: detailsTV,
          credits: creditsTV.cast,
        },
      };
    } catch (error) {
      console.error("Error fetching home page data:", error);
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
      console.error("Error fetching home page data:", error);
      throw error;
    }
  }
}

export const tmdbService = new TMDBService();
