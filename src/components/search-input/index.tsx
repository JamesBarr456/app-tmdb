'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Suspense } from 'react';

function SearchInputComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const nameParam = searchParams.get('name');
    if (nameParam) {
      setSearchQuery(nameParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery) {
      router.push(`/search?name=${encodeURIComponent(trimmedQuery)}`);
    } else {
      router.push('/search');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      router.push('/search');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 transform text-muted-foreground text-white md:left-0 md:h-8 md:w-8" />
      <Input
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search for movies or TV series"
        className="w-full pl-12 placeholder:font-light text-white border-0  md:placeholder:text-2xl md:text-2xl focus-visible:ring-0"
      />
    </form>
  );
}

export const SearchInput = () => {
  return (
    <Suspense fallback={<div>Cargando búsqueda...</div>}>
      <SearchInputComponent />
    </Suspense>
  );
};
