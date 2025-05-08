import { Film, ImageIcon, Tv } from 'lucide-react';
import Image from 'next/image';
import { InfoButton } from '../buttons-media/button-info';
import { cn } from '@/lib/utils';
import { BookmarkButton } from '../buttons-media/button-favorite';
import { MediaCardComponentProps } from '@/types/components/media-card';

const MEDIA_TYPE_LABELS = {
  movie: 'Movie',
  tv: 'TV Series',
} as const;

export const MediaCard = ({
  id,
  title,
  backdrop_path,
  release_year,
  media_type,
  title_position = 'outside',
}: MediaCardComponentProps) => {
  const MediaIcon = media_type === 'movie' ? Film : Tv;

  const image_url = backdrop_path
    ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
    : null;

  const info_media = (
    <>
      <div className="flex items-center gap-2 text-xs text-gray-300">
        <span>{release_year}</span>
        <span className="inline-block w-1 h-1 bg-gray-400 rounded-full" />
        <span className="flex items-center gap-1.5">
          <MediaIcon
            size={12}
            className={cn(
              'transition-colors duration-200',
              media_type === 'movie' ? 'text-blue-400' : 'text-purple-400'
            )}
          />
          <span className="text-gray-200">{MEDIA_TYPE_LABELS[media_type]}</span>
        </span>
      </div>
      <h2 className="text-lg lg:text-2xl font-medium leading-tight line-clamp-1">
        {title}
      </h2>
    </>
  );

  return (
    <article className="text-white space-y-2 font-outfit">
      <div
        className={cn(
          'relative w-full bg-gray-800 rounded-xl overflow-hidden group',
          title_position === 'inside' ? 'h-56' : 'h-40'
        )}
      >
        {image_url ? (
          <Image
            alt={title}
            src={image_url}
            className={cn(
              'rounded-xl object-cover transition-transform duration-300 ease-in-out',
              title_position === 'inside'
                ? 'brightness-75 group-hover:scale-125'
                : 'group-hover:scale-125'
            )}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 280px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <BookmarkButton
          media={{
            id_media: id,
            title,
            backdropPath: image_url,
            releaseYear: release_year,
            mediaType: media_type,
          }}
        />
        <div className="absolute inset-0 translate-y-1/2 group">
          <div className="flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/50">
            <InfoButton id={id} media_type={media_type} />
          </div>
        </div>

        {title_position === 'inside' && (
          <div className="absolute bottom-4 left-4">{info_media}</div>
        )}
      </div>

      {title_position === 'outside' && info_media}
    </article>
  );
};
