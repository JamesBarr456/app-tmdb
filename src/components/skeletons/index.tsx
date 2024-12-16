import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import clsx from 'clsx';
export const SearchInputSkeleton = () => {
  return (
    <div className="relative w-full">
      <Skeleton className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 transform rounded-full md:left-0 md:h-8 md:w-8" />
      <Skeleton className="w-full h-10 md:h-12" />
    </div>
  );
};

export function PaginationSkeleton() {
  return (
    <div className="py-12">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">
              <Skeleton className="h-8 w-8" />
            </PaginationLink>
          </PaginationItem>

          {[...Array(5)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink href="#">
                <Skeleton className="h-8 w-8" />
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink href="#">
              <Skeleton className="h-8 w-8" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

interface BadgeListSkeletonProps {
  badgeContainerClassName?: string;
  showTitle?: boolean;
  badgeCount?: number;
}

export function BadgeListSkeleton({
  badgeContainerClassName,
  badgeCount = 5,
}: BadgeListSkeletonProps) {
  return (
    <div className="mb-6">
      <div className={clsx('flex flex-wrap gap-2', badgeContainerClassName)}>
        {[...Array(badgeCount)].map((_, index) => (
          <Skeleton key={index} className="h-8 w-24 rounded-full" />
        ))}
      </div>
    </div>
  );
}
