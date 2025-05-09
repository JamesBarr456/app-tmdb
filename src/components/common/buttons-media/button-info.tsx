import { Info } from 'lucide-react';

import Link from 'next/link';

interface Props {
  id: number;
  media_type: 'movie' | 'tv';
}
export const InfoButton = ({ id, media_type }: Props) => {
  const media = media_type === 'movie' ? 'movies' : 'tv';
  return (
    <div className="absolute w-full h-full flex items-center justify-center bg-black/50 gap-5">
      <Link
        href={`/${media}/${id}`}
        className="bg-black w-10 h-10 rounded-full cursor-pointer flex items-center justify-center"
      >
        <Info className="w-5 h-5" />
      </Link>
    </div>
  );
};
