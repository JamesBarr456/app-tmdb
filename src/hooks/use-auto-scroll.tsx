"use client";
import { useCallback, useEffect, useRef } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

export function useAutoScroll(api: CarouselApi | null, interval = 3000) {
  const intervalRef = useRef<number>();

  const scrollNext = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  useEffect(() => {
    if (!api) return;

    intervalRef.current = window.setInterval(scrollNext, interval);

    // Pause auto-scroll when user interacts with the carousel
    api.on("pointerDown", () => {
      clearInterval(intervalRef.current);
    });

    api.on("pointerUp", () => {
      intervalRef.current = window.setInterval(scrollNext, interval);
    });

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [api, interval, scrollNext]);
}
