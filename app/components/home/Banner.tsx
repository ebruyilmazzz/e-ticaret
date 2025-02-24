"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative h-[160px] flex items-center justify-center mb-40 z-0">
      <div className="relative w-full max-w-[1900px] h-[160px]">
        <Image 
          src="/1.png" 
          width={2000} 
          height={500} 
          alt="Büyük İndirim Banner" 
          className="object-cover" 
        />
        
        {/* Search Bar */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl px-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün ara..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 bg-white/90"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition"
            >
              Ara
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
