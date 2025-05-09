import { BadgeInteractiveList } from '@/components/common/badges/badge-interactive-list';
import { GridMediaCards } from '@/components/media/grids/grid-media';

import { Paginations } from '@/components/pagination';

import { genresMovieList } from '@/data/genres-media';
import { tmdbService } from '@/services/tmdb-service';
interface Props {
  searchParams: Promise<{
    page?: string;
    with_genres?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const { page, with_genres } = await searchParams;
  const currentPage = page ? page : undefined;
  const selectedGenres = with_genres || undefined;

  const {
    movie: {
      discover: { results: movies, total_pages },
    },
  } = await tmdbService.getMoviesPageData({
    page: currentPage,
    genre: selectedGenres,
  });
  return (
    <>
      <section className="space-y-10">
        <BadgeInteractiveList
          items={genresMovieList}
          title=""
          badgeContainerClassName="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto"
        />

        <GridMediaCards
          title_section="Movies"
          mediaType="movie"
          items={movies}
        />

        <Paginations totalPages={total_pages} />
      </section>
    </>
  );
}
