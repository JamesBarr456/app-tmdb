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
  media_type: 'movie' | 'tv';
}

export interface Movie extends Media {
  original_title: string;
  release_date: string;
  title: string;
  runtime: number;
  tagline: string;
}

export interface TVShow extends Media {
  name: string;
  first_air_date: string;
  original_name: string;
  tagline: string;
  last_air_date: string;
}