'use client';

import { addFavoriteAction, removeFavoriteAction } from '@/actions/favorites';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useAuth } from '@/context/auth-context';
import { useUser } from '@/context/user-context';
import { Button } from '@/components/ui/button';
import { SpinnerLoading } from '@/components/loading';

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
  const { isAuthenticated } = useAuth();
  const { favorites, setFavorites } = useUser();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!favorites) return;

    const isAlreadyFavorited = favorites.some((fav) => fav.id === id_media);

    setIsBookmarked(isAlreadyFavorited);
  }, [favorites, id_media]);

  const toggleBookmark = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isBookmarked) {
        await removeFavoriteAction(id_media);
        setIsBookmarked(false);
        setFavorites((prev) => prev?.filter((fav) => fav.id !== id_media));
      } else {
        await addFavoriteAction({
          id: id_media,
          title,
          backdrop_path: backdropPath || '',
          release_year: releaseYear,
          media_type: mediaType,
        });
        setIsBookmarked(true);
        setFavorites((prev) => {
          if (!prev) return [];
          const exists = prev.some((fav) => fav.id === id_media);
          if (exists) return prev;
          return [
            ...prev,
            {
              id: id_media,
              title,
              backdrop_path: backdropPath || '',
              release_year: releaseYear,
              media_type: mediaType,
            },
          ];
        });
      }
    } catch (error) {
      console.error('Error al guardar/eliminar favorito:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || favorites?.length === 0) return null;

  return (
    <Button
      size={'icon'}
      onClick={toggleBookmark}
      className="absolute z-20 rounded-full bg-black/50 top-2 right-2"
      aria-label="Toggle Bookmark"
      disabled={isLoading}
    >
      {isLoading ? (
        <SpinnerLoading />
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
