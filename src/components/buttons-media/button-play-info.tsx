import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  media_type: "movie" | "tv";
}
export const PlayInfoButton = ({ id, media_type }: Props) => {
  const media = media_type === "movie" ? "movies" : "tv";
  return (
    <div className="absolute w-full h-full flex items-center justify-center bg-black/50 gap-5">
      <Button
        size="lg"
        className="rounded-full w-[60px] h-[60px] p-0 flex items-center justify-center"
        asChild
      >
        <Link href={`/${media}/${id}`}>
          <Image
            alt="Play-Media"
            src="/icon/icon-eye.ico"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Link>
      </Button>
    </div>
  );
};
