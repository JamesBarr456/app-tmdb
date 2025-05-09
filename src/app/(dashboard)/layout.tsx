import { Navbar } from '../../components/navbar/index';
import { RootProvider } from '@/context/root-provider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SearchInput } from '@/components/search-input';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootProvider>
      <div className="flex flex-col lg:flex-row min-h-screen md:p-6">
        <div className="lg:w-24 lg:flex-shrink-0">
          <Navbar />
        </div>
        <div className="flex-grow lg:p-9 ">
          <div className="px-4 py-6 md:px-0 md:py-8 lg:py-0 ">
            <SearchInput />
          </div>
          <main className="p-4 md:p-6 ">
            <ScrollArea className="w-full h-[740px]">{children}</ScrollArea>
          </main>
        </div>
      </div>
    </RootProvider>
  );
}
