import { Calendar, ImageIcon, Play, Timer } from 'lucide-react';

import { BadgeList } from '@/components/common/badges/badge-list';
import Image from 'next/image';
import { tmdbService } from '@/services/tmdb-service';

interface Props {
  params: Promise<{
    id: string;
  }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const {
    movie: { credits, details, videos },
  } = await tmdbService.getMoviePageData(+id);

  const imageUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/w500/${details.poster_path}`
    : null;

  const creditsWithNames = credits.map((credit) => ({
    id: credit.id,
    name: credit.original_name,
  }));
  return (
    <section className="relative min-h-screen  text-white">
      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}

          <picture>
            {imageUrl ? (
              <Image
                alt={details.title}
                src={imageUrl}
                width={500}
                height={750}
                priority
                className="rounded-2xl"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </picture>

          {/* Movie Info */}
          <article className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {details.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-3 py-1 bg-white/10 rounded-full flex items-center gap-2">
                <Calendar size={16} />
                {details.release_date}
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full flex items-center gap-2">
                <Timer size={16} />
                {details.runtime} min
              </span>
              <span className="px-3 py-1 bg-yellow-500/90 rounded-full flex items-center gap-1">
                ★ {details.vote_average} / 10
              </span>
            </div>

            {/* Genders Section */}
            <BadgeList items={details.genres} title="Genres" />
            <h3 className="mb-2 md:text-2xl font-bold ">Synopsis</h3>
            <p className="text-lg mb-6 text-gray-300 ">{details.overview}</p>

            {/* Cast Section */}
            <BadgeList items={creditsWithNames} title="Cast" />

            {/* Trailer Section */}
            <div className="py-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Play className="w-6 h-6" />
                Official Trailer
              </h2>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videos}`}
                  title="Movie Trailer"
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
