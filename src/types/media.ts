export interface TMDBApiResponse<T> {
  page: number;
  results: T[];
}
export interface Media {
  id: number;
  backdrop_path: string;
  original_language: string;
  genre_ids: number[];
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Movie extends Media {
  adult: boolean;
  original_title: string;
  release_date: string; // Formato ISO (YYYY-MM-DD)
  title: string;
  video: boolean;
}

export interface TVShow extends Media {
  name: string;
  first_air_date: string; // Formato ISO (YYYY-MM-DD)
  original_name: string;
}
