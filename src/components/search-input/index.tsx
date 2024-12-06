import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchInput = () => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 transform text-muted-foreground text-white md:left-0 md:h-8 md:w-8" />
      <Input
        type="search"
        placeholder="Search for movies or TV series"
        className="w-full pl-12 placeholder:font-light text-white border-0 focus-visible:ring-0 md:placeholder:text-lg"
      />
    </div>
  );
};
