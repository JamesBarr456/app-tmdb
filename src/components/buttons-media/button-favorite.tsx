'use client';

import { addFavoriteAction, removeFavoriteAction } from '@/actions/favorites';

import { Button } from '../ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { useUser } from '@/context/context-user';

interface MediaSaveProps {
  media: {
    id_media: number;
    title: string;
    backdropPath: string | null;
    releaseYear: string;
    mediaType: 'movie' | 'tv';
  };
}

export const BookmarkButton = ({
  media: { id_media, title, backdropPath, releaseYear, mediaType },
}: MediaSaveProps) => {
  const { isAuthenticated } = useUser();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleBookmark = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isBookmarked) {
        await removeFavoriteAction(id_media);
        setIsBookmarked(false);
      } else {
        await addFavoriteAction({
          id: id_media,
          title,
          backdrop_path: backdropPath,
          release_date: releaseYear,
          media_type: mediaType,
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error al guardar/eliminar favorito:', error);
    } finally {
      setIsLoading(false);
    }
  };
  if (!isAuthenticated) return null; // No renderizar el botón si no está autenticado
  return (
    <Button
      size={'icon'}
      onClick={toggleBookmark}
      className="absolute z-20 rounded-full bg-black/50 top-2 right-2"
      aria-label="Toggle Bookmark"
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <Image
          alt="Favorite Media"
          src={
            isBookmarked
              ? '/icon/icon-bookmark-full.svg'
              : '/icon/icon-bookmark-empty.svg'
          }
          width={12}
          height={14}
          sizes="(max-width: 768px) 100vw, 12px"
        />
      )}
    </Button>
  );
};
