export const TMDB_ROUTES = {
  movies: {
    popular: '/movie/popular',
    topRated: '/movie/top_rated',
    trending: '/trending/movie/week',
    discover: '/discover/movie',
    details: (id: string | number) => `/movie/${id}`,
    credits: (id: string | number) => `/movie/${id}/credits`,
    videos: (id: string | number) => `/movie/${id}/videos`,
  },
  tvShows: {
    popular: '/tv/popular',
    topRated: '/tv/top_rated',
    trending: '/trending/tv/week',
    discover: '/discover/tv',
    details: (id: string | number) => `/tv/${id}`,
    credits: (id: string | number) => `/tv/${id}/credits`,
    videos: (id: string | number) => `/tv/${id}/videos`,
  },
};

// Usage example
// Import TMDB_ROUTES and use the routes as needed
// Example:
// const popularMoviesUrl = TMDB_ROUTES.movies.popular;
