import { Badge } from "../ui/badge";
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

export function BadgeList({
  items,
  title,
  badgeContainerClassName = "flex flex-wrap gap-2",
}: BadgeListProps) {
  return (
    <div className="mb-6">
      {title && <h3 className="mb-2 md:text-2xl font-bold ">{title}</h3>}
      <div className={clsx("", badgeContainerClassName)}>
        {items.map(({ id, name }) => (
          <Badge
            key={id}
            className="text-base bg-greyish-blue hover:bg-bright-red cursor-pointer"
            variant="default"
            aria-label={`Toggle ${name}`}
          >
            {name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
