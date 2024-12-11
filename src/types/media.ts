export interface TMDBApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
}
export interface TMDBApiCastResponse {
  cast: CastMember[];
}

export interface Media {
  id: number;
  backdrop_path: string;
  original_language: string;
  genres: {
    id: number;
    name: string;
  }[];
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
}

export interface Movie extends Media {
  original_title: string;
  release_date: string; // Formato ISO (YYYY-MM-DD)
  title: string;
  runtime: number;
  status: string; // Ejemplo: "Released"
  tagline: string;
}

export interface TVShow extends Media {
  name: string;
  first_air_date: string; // Formato ISO (YYYY-MM-DD)
  original_name: string;
}

export interface CastMember {
  id: number;
  original_name: string;
}
