"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";

interface BookmarkButtonProps {
  right?: string;
  top?: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  right = "3",
  top = "3",
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Button
      size={"icon"}
      onClick={toggleBookmark}
      className={`absolute rounded-full bg-black/50 p-2 right-${right} top-${top}`}
      aria-label="Toggle Bookmark"
    >
      <Image
        alt="Favorite Media"
        src={
          isBookmarked
            ? "/icon/icon-bookmark-full.svg"
            : "/icon/icon-bookmark-empty.svg"
        }
        width={12}
        height={14}
        sizes="(max-width: 768px) 100vw, 12px"
      />
    </Button>
  );
};
