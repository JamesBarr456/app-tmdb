"use client";

import React, { useEffect, useState } from "react";

import { YouTubeEmbed } from "@next/third-parties/google";

interface YouTubeTrailerProps {
  trailer_key: string | null;
  width?: number;
  height?: number;
}

export default function YouTubeTrailer({
  trailer_key,
  width,
  height,
}: YouTubeTrailerProps) {
  const [dynamicWidth, setDynamicWidth] = useState(width || 500);
  const [dynamicHeight, setDynamicHeight] = useState(height || 360);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;

      const newWidth = screenWidth > 1024 ? 600 : screenWidth > 768 ? 400 : 300;

      setDynamicWidth(newWidth);
      setDynamicHeight(newWidth * 0.5625);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!trailer_key) {
    return <div>No trailer available</div>;
  }

  return (
    <div className="aspect-video">
      <YouTubeEmbed
        videoid={trailer_key}
        height={dynamicHeight}
        width={dynamicWidth}
        params="rel=0"
      />
    </div>
  );
}
