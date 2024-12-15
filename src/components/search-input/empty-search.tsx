import Image from 'next/image';

export function EmptySearch() {
  return (
    <section className="h-[75vh] w-full flex items-center justify-center">
      <div className="mx-auto max-w-md w-full px-6 py-12 text-center space-y-5">
        <picture>
          <Image
            alt="logo-entertaiment"
            src={'/icon/logo.svg'}
            className="w-16 mx-auto"
            width={33}
            height={27}
          />
        </picture>

        <p className="text-xl  text-center  text-gray-600 mt-4">
          You haven&apos;t searched for anything yet. Start by typing a title
          into the search bar!
        </p>
      </div>
    </section>
  );
}
