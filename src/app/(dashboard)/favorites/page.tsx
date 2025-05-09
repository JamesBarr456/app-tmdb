'use client';

import Image from 'next/image';
import { MediaCard } from '@/components/media/cards';
import { SpinnerLoading } from '@/components/loading';
import { useUser } from '@/context/user-context';

export default function Page() {
  const { favorites, loading } = useUser();

  if (loading || favorites === undefined)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <SpinnerLoading color="text-bright-red" height={40} width={40} />
      </div>
    );

  // Si no hay favoritos, mostrar un mensaje
  if (!favorites || favorites.length === 0) {
    return (
      <div className="flex flex-col mt-20 items-center justify-center p-8 text-center">
        <div className="mb-4 rounded-full bg-gray-800 p-4">
          <Image
            alt="Favorite Media"
            src={'/icon/icon-bookmark-empty.svg'}
            width={12}
            height={14}
            sizes="(max-width: 768px) 100vw, 12px"
          />
        </div>
        <h3 className="mb-2 text-xl font-medium text-white">
          No hay favoritos
        </h3>
        <p className="text-gray-400">
          No se pudo cargar la información o aún no has agregado ninguna
          película o serie a favoritos.
        </p>
      </div>
    );
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
              release_year={item.release_date}
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
              release_year={item.release_date}
              media_type="tv"
              title_position="outside"
            />
          ))}
        </div>
      </section>
    </>
  );
}
