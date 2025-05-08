'use client';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

import { useAutoScroll } from '@/hooks/use-auto-scroll';
import { MediaCard } from '../cards-media';
import { Movie, TVShow } from '@/types/tmdb/media';

interface MediaCarouselProps {
  title_section: string;
  items: (Movie | TVShow)[];
  mediaType: 'movie' | 'tv';
}

export const GridMediaCarouselCards = ({
  title_section,
  items,
  mediaType,
}: MediaCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  useAutoScroll(api);

  return (
    <section className="space-y-5 px-4 py-6">
      <h1 className="text-2xl font-semibold text-white lg:text-3xl">
        {title_section}
      </h1>
      <div className="relative">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-full sm:basis-1/2  lg:basis-1/3 xl:basis-1/4"
              >
                <MediaCard
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
                  title_position="inside"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-12 hidden lg:flex" />
          <CarouselNext className="absolute -right-12 hidden lg:flex" />
        </Carousel>
      </div>
    </section>
  );
};
