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
}

export const tmdbService = new TMDBService();
