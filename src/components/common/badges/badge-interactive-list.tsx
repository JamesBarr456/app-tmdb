'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, useTransition } from 'react';

import { Badge } from '../../ui/badge';
import { SpinnerLoading } from '../../loading/spinner';
import clsx from 'clsx';

interface BadgeItem {
  id: number;
  name: string;
}

interface BadgeListProps {
  items: BadgeItem[];
  title?: string;
  badgeContainerClassName?: string;
}

function BadgeList({ items, title, badgeContainerClassName }: BadgeListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<number | null>(null);

  const toggleGenre = (id: number) => {
    setPendingId(id);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      const currentGenre = params.get('with_genres');

      if (currentGenre === id.toString()) {
        params.delete('with_genres'); // Eliminar género si está seleccionado
      } else {
        params.set('with_genres', id.toString()); // Seleccionar género
      }

      router.push(`?${params.toString()}`);
      setPendingId(null);
    });
  };

  const selectedGenre = Number(searchParams.get('with_genres')) || null;

  return (
    <div className="mb-6">
      {title && <h3 className="mb-2 md:text-2xl">{title}</h3>}
      <div className={clsx('', badgeContainerClassName)}>
        {items.map(({ id, name }) => {
          const isLoading = isPending && id === pendingId;

          return (
            <Badge
              key={id}
              className={clsx(
                'text-base cursor-pointer relative',
                selectedGenre === id
                  ? 'bg-bright-red hover:bg-greyish-blue'
                  : 'bg-greyish-blue hover:bg-bright-red',
                isLoading && 'opacity-70'
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
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

export function BadgeInteractiveList({
  items,
  title,
  badgeContainerClassName = 'flex flex-wrap gap-2',
}: BadgeListProps) {
  return (
    <Suspense>
      <BadgeList
        items={items}
        title={title}
        badgeContainerClassName={badgeContainerClassName}
      />
    </Suspense>
  );
}
