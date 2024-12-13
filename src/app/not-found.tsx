import { Navbar } from '@/components/navbar';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';

import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="font-outfit bg-dark-blue">
      <div className="flex flex-col lg:flex-row min-h-screen md:p-6">
        <div className="lg:w-24 lg:flex-shrink-0">
          <Navbar />
        </div>
        <div className="flex-grow lg:p-9 ">
          <div className="px-4 py-6 md:px-0 md:py-8 lg:py-0 ">
            <SearchInput />
          </div>
          <main className="p-4 md:p-6 h-full flex items-center justify-center">
            <div className="max-w-md w-full px-6 py-12 text-center space-y-5">
              <picture>
                <Image
                  alt="pacman-not-found-page"
                  src={'/images/error-not-found.png'}
                  className="w-24 mx-auto"
                  width={512}
                  height={512}
                />
              </picture>
              <h1 className="text-9xl text-bright-red font-bold tracking-widest mb-4">
                404
              </h1>
              <h2 className="text-3xl w-font-semibold text-white mb-4 ">
                Not Found
              </h2>
              <p className="text-lg  text-justify text-gray-600 mt-4">
                Sorry, we couldn&apos;t find what you&apos;re looking for. This
                could have happened for one of the following reasons:
              </p>
              <ul className="list-disc text-gray-600 mt-4 text-justify max-w-md ">
                <li>The URL you entered is incorrect or contains a typo.</li>
                <li>
                  The page you are trying to access has been moved or no longer
                  exists.
                </li>
                <li>
                  The movie or TV series you are looking for is not available in
                  our database.
                </li>
              </ul>
              <p className="text-gray-600 mt-4">
                We recommend checking the URL or returning to the homepage.
              </p>
              <Button
                asChild
                variant={'outline'}
                className="hover:text-white hover:bg-bright-red hover:border-bright-red"
              >
                <Link href={'/home'}>
                  <MoveLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
