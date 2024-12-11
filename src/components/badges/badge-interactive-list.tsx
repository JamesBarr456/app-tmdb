"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { Badge } from "../ui/badge";
import { SpinnerLoading } from "../loading/custom-loading";
import { X } from "lucide-react";
import clsx from "clsx";

interface BadgeItem {
  id: number;
  name: string;
}

interface BadgeListProps {
  items: BadgeItem[];
  title?: string;
  badgeContainerClassName?: string;
}

export function BadgeInteractiveList({
  items,
  title,
  badgeContainerClassName = "flex flex-wrap gap-2",
}: BadgeListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<number | null>(null);

  const toggleGenre = (id: number) => {
    setPendingId(id);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      const currentGenre = params.get("with_genres");

      if (currentGenre === id.toString()) {
        params.delete("with_genres");
      } else {
        params.set("with_genres", id.toString());
      }

      router.push(`?${params.toString()}`);
      setPendingId(null);
    });
  };

  const removeGenre = () => {
    setPendingId(selectedGenre);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("with_genres");
      router.push(`?${params.toString()}`);
      setPendingId(null);
    });
  };

  const selectedGenre = Number(searchParams.get("with_genres")) || null;

  return (
    <div className="mb-6">
      {title && <h3 className="mb-2 md:text-2xl">{title}</h3>}
      <div className={clsx("", badgeContainerClassName)}>
        {items.map(({ id, name }) => {
          const isLoading = isPending && id === pendingId;

          return (
            <Badge
              key={id}
              className={clsx(
                "text-base cursor-pointer relative pr-8",
                selectedGenre === id
                  ? "bg-bright-red hover:bg-bright-red/60"
                  : "bg-green-500 hover:bg-green-500/60",
                isLoading && "opacity-70"
              )}
              variant="default"
              aria-label={`Select ${name}`}
              onClick={() => toggleGenre(id)}
            >
              <span className="flex items-center gap-2">
                {name}
                {isLoading && (
                  <SpinnerLoading color="text-white" height={20} width={20} />
                )}
              </span>
              {selectedGenre === id && !isLoading && (
                <X
                  className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeGenre();
                  }}
                />
              )}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
