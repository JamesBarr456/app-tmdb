import { CastMember } from './cast';
import { MediaVideo } from './video';

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