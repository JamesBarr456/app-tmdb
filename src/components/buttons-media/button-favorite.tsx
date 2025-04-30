'use client';

import { Button } from '../ui/button';
import Image from 'next/image';
import { useState } from 'react';

export const BookmarkButton = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Button
      size={'icon'}
      onClick={toggleBookmark}
      className={`absolute z-20 rounded-full bg-black/50 top-2 right-2`}
      aria-label="Toggle Bookmark"
    >
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
    </Button>
  );
};
