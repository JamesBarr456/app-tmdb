import { BadgeList } from "@/components/badges/badge-list";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { tmdbService } from "@/services/tmdb";

interface Props {
  params: {
    id: string;
  };
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const {
    movie: { credits, details },
  } = await tmdbService.getMoviePageData(+id);

  const imageUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/w500/${details.poster_path}`
    : null;

  const creditsWithNames = credits.map((credit) => ({
    id: credit.id,
    name: credit.original_name,
  }));
  return (
    <section className="flex flex-col items-center text-white sm:mx-8 md:mx-0 md:flex-row md:items-start lg:justify-center">
      <picture className="px-20 text-center md:pl-0 md:pr-8 lg:w-2/5">
        {imageUrl ? (
          <Image
            alt={details.title}
            src={imageUrl}
            className="rounded-xl"
            width={500}
            height={250}
            priority
            sizes="(max-width: 768px) 100vw, 500px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </picture>
      <div className="md:w-3/5">
        <div className="mb-2 mt-6 text-center md:mb-4 md:mt-0 md:text-left">
          <h1 className="mb-1 text-3xl font-light md:mb-3 md:text-5xl">
            {details.title}
          </h1>
          <h2 className="text-app-placeholder text-xs font-light sm:text-sm md:text-lg">
            {details.tagline}
          </h2>
        </div>

        <MovieInfo
          runtime={details.runtime}
          language={details.original_language}
          releaseDate={details.release_date}
          status={details.status}
        />

        <BadgeList items={details.genres} title="Genres" />

        <div className="mb-6">
          <h2 className="mb-1 md:text-2xl">Synopsis</h2>
          <p className="font-light md:text-lg">{details.overview}</p>
        </div>

        <BadgeList items={creditsWithNames} />
      </div>
    </section>
  );
}

interface MovieInfoProps {
  runtime: number;
  language: string;
  releaseDate: string;
  status: string;
}

export function MovieInfo({
  runtime,
  language,
  releaseDate,
  status,
}: MovieInfoProps) {
  const infoItems = [
    { label: "Length", value: `${runtime} min` },
    { label: "Language", value: language, className: "capitalize" },
    { label: "Year", value: releaseDate },
    { label: "Status", value: status },
  ];

  return (
    <div className="mb-6 flex items-center justify-between text-center text-sm lg:w-10/12 lg:text-lg">
      {infoItems.map(({ label, value, className = "" }) => (
        <div key={label}>
          <p className="text-app-placeholder mb-1">{label}</p>
          <p className={`text-app-pure-white ${className}`}>{value}</p>
        </div>
      ))}
    </div>
  );
}
