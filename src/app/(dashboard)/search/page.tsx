import { MediaListCard } from '@/components/cards-media/card-media-list';
import { Paginations } from '@/components/pagination/Paginations';
import { tmdbService } from '@/services/tmdb';
import { Movie, TVShow } from '@/types/media';

interface Props {
  searchParams: {
    page?: string;
    name?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const { page, name } = await searchParams;
  const currentPage = page ? page : undefined;

  if (!name) return <p className="text-white">Ingresar nombre para buscar</p>;

  const { search } = await tmdbService.getFoundMedia({
    page: currentPage,
    searchMedia: name,
  });

  return (
    <>
      <section className="space-y-10">
        <h1 className="lg:text-3xl text-white">Resultados</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {search.results.map((media) => (
            <MediaListCard
              key={media.id}
              id_media={media.id}
              title={
                media_type === 'movie'
                  ? (media as Movie).title
                  : (media as TVShow).name
              }
              backdropPath={media.backdrop_path}
              releaseYear={
                media_type === 'movie'
                  ? (media as Movie).release_date.split('-')[0]
                  : (media as TVShow).first_air_date.split('-')[0]
              }
              mediaType={media_type}
            />
          ))}
        </div>
        <Paginations totalPages={search.total_pages} />
      </section>
    </>
  );
}
