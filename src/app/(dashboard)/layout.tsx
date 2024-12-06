import { Navbar } from "../../components/navbar/index";
import { SearchInput } from "@/components/search-input";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-outfit bg-dark-blue">
      <div className="flex flex-col lg:flex-row min-h-screen md:p-6">
        <div className="lg:w-24 lg:flex-shrink-0">
          <Navbar />
        </div>
        <div className="flex-grow ">
          <div className="px-4 py-6 md:px-0 md:py-8">
            <SearchInput />
          </div>
          <main className="p-4 md:p-6 ">{children}</main>
        </div>
      </div>
    </div>
  );
}
