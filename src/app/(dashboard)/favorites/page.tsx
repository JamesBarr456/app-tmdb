'use client';

import { MediaCard } from '@/components/media/card';
import { useUser } from '@/context/user-context';
import LoadingScreen from '@/components/loading/screen-page';
import EmptyFavorites from '@/components/feedbacks/empty-favorites';

export default function Page() {
  const { favorites, loading } = useUser();

  if (loading || favorites === undefined) return <LoadingScreen />;

  // Si no hay favoritos, mostrar un mensaje
  if (!favorites || favorites.length === 0) {
    return <EmptyFavorites />;
  }

  const movies = favorites.filter((item) => item.media_type === 'movie');
  const tvSeries = favorites.filter((item) => item.media_type === 'tv');

  return (
    <>
      <section className="space-y-5">
        <h1 className="lg:text-3xl text-white">Bookmarked Movies</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {movies.map((item) => (
            <MediaCard
              key={item.id}
              id={item.id}
              title={item.title}
              backdrop_path={item.backdrop_path || ''}
              release_year={item.release_date || ''}
              media_type="movie"
              title_position="outside"
            />
          ))}
        </div>
      </section>
      <section className="space-y-5 mt-6">
        <h1 className="lg:text-3xl text-white">Bookmarked TV Series</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {tvSeries.map((item) => (
            <MediaCard
              key={item.id}
              id={item.id}
              title={item.title}
              backdrop_path={item.backdrop_path || ''}
              release_year={item.release_date || ''}
              media_type="tv"
              title_position="outside"
            />
          ))}
        </div>
      </section>
    </>
  );
}
