import { Media } from '@/types/tmdb/media';

export type MediaCard = Pick<Media, 'id' | 'backdrop_path' | 'media_type'> & {
  title: string;
  release_year: string;
  title_position?: 'outside' | 'inside';
};