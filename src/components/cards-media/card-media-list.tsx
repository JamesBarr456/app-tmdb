import { Film, Tv } from "lucide-react";

import { BookmarkButton } from "../buttons-media/button-favorite";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaListCardProps {
  title: string;
  backdropPath: string;
  releaseYear: string;
  mediaType: "movie" | "tv";
}

const MEDIA_TYPE_LABELS = {
  movie: "Movie",
  tv: "TV Series",
} as const;

export const MediaListCard = ({
  title,
  backdropPath,
  releaseYear,
  mediaType,
}: MediaListCardProps) => {
  const MediaIcon = mediaType === "movie" ? Film : Tv;

  return (
    <article className="text-white space-y-2 font-outfit">
      <div className="relative w-[280px] h-[174px]">
        <Image
          alt={title}
          src={`https://image.tmdb.org/t/p/w500/${backdropPath}`}
          className="rounded-xl object-cover"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 280px"
        />
        <BookmarkButton top="4" />
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-300">
        <span>{releaseYear}</span>
        <span className="inline-block w-1 h-1 bg-gray-400 rounded-full" />
        <div className="flex items-center gap-1.5">
          <MediaIcon
            size={12}
            className={cn(
              "transition-colors duration-200",
              mediaType === "movie" ? "text-blue-400" : "text-purple-400"
            )}
          />
          <span className="text-gray-200">{MEDIA_TYPE_LABELS[mediaType]}</span>
        </div>
      </div>

      <h2 className="text-2xl font-medium leading-tight line-clamp-1">
        {title}
      </h2>
    </article>
  );
};
