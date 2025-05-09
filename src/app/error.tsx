'use client';

import { Navbar } from '@/components/layout/navbar';
import { SearchInput } from '@/components/search/searh-input';
import { Button } from '@/components/ui/button';
import { MoveLeft, RefreshCcw } from 'lucide-react';
import Image from 'next/image';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
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
                  src={'/images/error-no-signal.jpg'}
                  className="w-24 mx-auto rounded-full"
                  width={512}
                  height={512}
                />
              </picture>
              <h1 className="text-9xl text-bright-red font-bold tracking-widest mb-4">
                500
              </h1>
              <h2 className="text-3xl w-font-semibold text-white mb-4 ">
                Something went wrong!.
              </h2>
              <p className="text-lg  text-justify text-gray-600 mt-4">
                We apologize for the inconvenience. An unexpected error has
                occurred. This could be due to:
              </p>
              <ul className="list-disc text-gray-600 mt-4 text-justify max-w-md ">
                <li>A temporary server issue</li>
                <li>Network connectivity problems</li>
                <li>An internal application error</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You can try refreshing the page or return to the homepage.
              </p>
              <div className="flex gap-4 justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={reset}
                  className="hover:text-white hover:bg-bright-red hover:border-bright-red"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
