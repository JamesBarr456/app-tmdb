import { Movie, TVShow } from '@/types/media';

import { EmptySearch } from '@/components/search-input/empty-search';
import { MediaListCard } from '@/components/cards-media/card-media-list';
import { Paginations } from '@/components/pagination/Paginations';
import { SearchX } from 'lucide-react';
import { tmdbService } from '@/services/tmdb';

interface Props {
  searchParams: Promise<{
    page?: string;
    name?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const { page, name } = await searchParams;
  const currentPage = page ? page : undefined;

  if (!name) return <EmptySearch />;

  const { data } = await tmdbService.getFoundMedia({
    page: currentPage,
    searchMedia: name,
  });

  const noResults = !data.results || data.results.length === 0;

  return (
    <>
      <section className="space-y-10">
        {noResults ? (
          <div className="h-[75vh] w-full flex flex-col gap-7 items-center justify-center">
            <SearchX className="w-20 h-20 mx-auto text-bright-red" />
            <p className="text-white text-center lg:text-2xl">
              No results were found for the search.
              <br />
              &#34; <span className=" text-bright-red">{name}</span>&#34;.
            </p>
          </div>
        ) : (
          <>
            <h1 className="lg:text-3xl text-white">Results</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {data.results.map((media) => (
                <MediaListCard
                  key={media.id}
                  id_media={media.id}
                  title={
                    media.media_type === 'movie'
                      ? (media as Movie).title
                      : (media as TVShow).name
                  }
                  backdropPath={media.backdrop_path}
                  releaseYear={
                    media.media_type === 'movie'
                      ? (media as Movie).release_date
                      : (media as TVShow).first_air_date
                  }
                  mediaType={media.media_type}
                />
              ))}
            </div>
            <Paginations totalPages={data.total_pages} />
          </>
        )}
      </section>
    </>
  );
}
