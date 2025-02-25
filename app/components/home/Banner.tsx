"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Banner = () => {
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
      </div>
    </div>
  );
};

export default Banner;
