import { Movie, TVShow } from "@/types/media";

import { MediaListCard } from "../cards-media/card-media-list";

interface Props {
  title_section: string;
  items: (Movie | TVShow)[];
  mediaType: "movie" | "tv";
}
export const GridMediaCards = ({ mediaType, items, title_section }: Props) => {
  return (
    <section className="space-y-5">
      <h1 className="lg:text-3xl text-white">{title_section}</h1>
      <div className="grid lg:grid-cols-5 gap-5">
        {items.map((item) => (
          <MediaListCard
            key={item.id}
            title={
              mediaType === "movie"
                ? (item as Movie).title
                : (item as TVShow).name
            }
            backdropPath={item.backdrop_path}
            releaseYear={
              mediaType === "movie"
                ? (item as Movie).release_date.split("-")[0]
                : (item as TVShow).first_air_date.split("-")[0]
            }
            mediaType={mediaType}
          />
        ))}
      </div>
    </section>
  );
};
