import { GridMediaCards } from '@/components/media/grids/grid-media';
import GridMediaCarouselCards from '@/components/media/grids/grid-media-carousel';

import { tmdbService } from '@/services/service-tmdb';

export default async function Page() {
  const { movies, tvShows } = await tmdbService.getHomePageData();
  return (
    <div className="space-y-8">
      {/* Movies */}
      <GridMediaCarouselCards
        title_section="Top Rated Movies"
        mediaType="movie"
        items={movies.topRated}
      />
      <GridMediaCards
        title_section="The Most Popular Movies"
        mediaType="movie"
        items={movies.popular}
      />
      <GridMediaCards
        title_section="Trending Movies of the Week"
        mediaType="movie"
        items={movies.trending}
      />

      {/* TV Series */}
      <GridMediaCarouselCards
        title_section="Top Rated TV Series"
        mediaType="tv"
        items={tvShows.topRated}
      />
      <GridMediaCards
        title_section="The Most Popular TV Series"
        mediaType="tv"
        items={tvShows.popular}
      />
      <GridMediaCards
        title_section="Trending TV Series of the Week"
        mediaType="tv"
        items={tvShows.trending}
      />
    </div>
  );
}
