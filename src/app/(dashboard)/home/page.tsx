"use client";

import { Movie, TVShow } from "@/types/media";
import { useEffect, useState } from "react";

import { GridMediaCards } from "@/components/grid-cards-media/grid-cards-media";
import { GridMediaCarouselCards } from "@/components/grid-cards-media/grid-cards-media-carousel";
import { tmdbService } from "@/services/tmdb";

export default function Page() {
  const [homeData, setHomeData] = useState<{
    movies: {
      topRated: Movie[];
      popular: Movie[];
      trending: Movie[];
    };
    tvShows: {
      topRated: TVShow[];
      popular: TVShow[];
      trending: TVShow[];
    };
  } | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      try {
        const data = await tmdbService.getHomePageData();
        setHomeData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load home data:", error);
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  if (loading) return <p className="text-white">Cargando....</p>;

  if (!homeData) return null;
  return (
    <div className="space-y-8">
      {/* Movies */}
      <GridMediaCarouselCards
        title_section="Top Rated Movies"
        mediaType="movie"
        items={homeData.movies.topRated}
      />
      <GridMediaCards
        title_section="The Most Popular Movies"
        mediaType="movie"
        items={homeData.movies.popular}
      />
      <GridMediaCards
        title_section="Trending Movies of the Week"
        mediaType="movie"
        items={homeData.movies.trending}
      />

      {/* TV Series */}
      <GridMediaCarouselCards
        title_section="Top Rated TV Series"
        mediaType="tv"
        items={homeData.tvShows.topRated}
      />
      <GridMediaCards
        title_section="The Most Popular TV Series"
        mediaType="tv"
        items={homeData.tvShows.popular}
      />
      <GridMediaCards
        title_section="Trending TV Series of the Week"
        mediaType="tv"
        items={homeData.tvShows.trending}
      />
    </div>
  );
}
