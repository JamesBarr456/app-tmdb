import { Film, ImageIcon, Tv } from "lucide-react";

import { BookmarkButton } from "../buttons-media/button-favorite";
import Image from "next/image";
import { PlayInfoButton } from "../buttons-media/button-play-info";
import { cn } from "@/lib/utils";

interface MediaListCardProps {
  id_media: number;
  title: string;
  backdropPath: string | null;
  releaseYear: string;
  mediaType: "movie" | "tv";
}

const MEDIA_TYPE_LABELS = {
  movie: "Movie",
  tv: "TV Series",
} as const;

export const MediaListCard = ({
  id_media,
  title,
  backdropPath,
  releaseYear,
  mediaType,
}: MediaListCardProps) => {
  const MediaIcon = mediaType === "movie" ? Film : Tv;

  const imageUrl = backdropPath
    ? `https://image.tmdb.org/t/p/w500/${backdropPath}`
    : null;

  return (
    <article className="text-white space-y-2 font-outfit">
      <div className="relative w-full h-40 bg-gray-800 rounded-xl overflow-hidden  group">
        {imageUrl ? (
          <Image
            alt={title}
            src={imageUrl}
            className="rounded-xl object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 280px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <BookmarkButton top="4" />
        <div className="opacity-0 -z-10 transition-opacity duration-300  group-hover:opacity-100  group-hover:z-10">
          <PlayInfoButton id={id_media} media_type={mediaType} />
        </div>
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

      <h2 className="text-lg lg:text-2xl font-medium leading-tight line-clamp-1">
        {title}
      </h2>
    </article>
  );
};
