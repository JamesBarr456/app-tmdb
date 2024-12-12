export interface TMDBApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
}
export interface TMDBApiCastResponse {
  cast: CastMember[];
}

export interface TMDBApiVideoResponse {
  results: MediaVideo[];
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
  status: string;
}

export interface Movie extends Media {
  original_title: string;
  release_date: string; // Formato ISO (YYYY-MM-DD)
  title: string;
  runtime: number;
  tagline: string;
}

export interface TVShow extends Media {
  name: string;
  first_air_date: string; // Formato ISO (YYYY-MM-DD)
  original_name: string;
  tagline: string;
  last_air_date: string;
}

export interface CastMember {
  id: number;
  original_name: string;
  profile_path: string;
}

export interface MediaVideo {
  name: string; 
  key: string;
  site: string;
  size: number; 
  type: string;
}