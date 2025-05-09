import { Movie, TVShow } from '@/types/tmdb/media';
import { MediaCard } from '../cards';

interface Props {
  title_section: string;
  items: (Movie | TVShow)[];
  mediaType: 'movie' | 'tv';
}
export const GridMediaCards = ({ mediaType, items, title_section }: Props) => {
  return (
    <section className="space-y-5">
      <h1 className="lg:text-3xl text-white">{title_section}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {items.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            title={
              mediaType === 'movie'
                ? (item as Movie).title
                : (item as TVShow).name
            }
            backdrop_path={item.backdrop_path}
            release_year={
              mediaType === 'movie'
                ? (item as Movie).release_date.split('-')[0]
                : (item as TVShow).first_air_date.split('-')[0]
            }
            media_type={mediaType}
            title_position="outside"
          />
        ))}
      </div>
    </section>
  );
};
