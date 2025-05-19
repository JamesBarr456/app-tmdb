import Image from 'next/image';

export default function EmptyFavorites() {
  return (
    <div className="flex flex-col mt-20 items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-gray-800 p-4">
        <Image
          alt="Favorite Media"
          src={'/icon/icon-bookmark-empty.svg'}
          width={12}
          height={14}
          sizes="(max-width: 768px) 100vw, 12px"
        />
      </div>
      <h3 className="mb-2 text-xl font-medium text-white">No hay favoritos</h3>
      <p className="text-gray-400">
        No se pudo cargar la información o aún no has agregado ninguna película
        o serie a favoritos.
      </p>
    </div>
  );
}
