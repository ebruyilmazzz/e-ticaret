"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="hidden md:flex flex-1">
      <input
        className="py-2 px-3 border-none outline-none flex flex-1"
        type="text"
        placeholder="Arama Yap..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        suppressHydrationWarning
      />
      <button
        type="submit"
        className="p-2 bg-violet-400 text-sm border border-transparent hover:bg-violet-500 transition"
      >
        Ara
      </button>
    </form>
  );
};

export default Search;