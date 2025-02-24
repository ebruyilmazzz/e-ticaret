"use client";

import React from "react";
import { ProductType } from "@/utils/Products";
import Image from "next/image";
import { Rating } from "@mui/material";
import textClip from "@/utils/TextClip";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  // Ürün puan ortalamasını hesapla (eğer yorum yoksa 0 olarak ayarla)
  const productRating =
    product?.reviews?.length > 0
      ? product.reviews.reduce((acc, item) => acc + item.rating, 0) /
        product.reviews.length
      : 0;

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="w-[240px] cursor-pointer flex flex-col flex-1 shadow-lg p-3 rounded-md 
                 transition-transform transform hover:scale-105 bg-white"
    >
      {/* Ürün Görseli */}
      <div className="relative h-[200px] w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 240px"
          className="object-contain p-4"
          loading="lazy"
        />
      </div>

      {/* Ürün Bilgileri */}
      <div className="text-center mt-2 space-y-1">
        <div className="font-medium text-gray-700">{textClip(product.name)}</div>
        <Rating name="read-only" value={productRating || 0} readOnly />
        <div className="text-purple-950 font-semibold text-lg md:text-xl">
          {product.price}₺
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
