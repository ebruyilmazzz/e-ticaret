"use client";
import Image from "next/image";
import PageContainer from "../containers/PageContainer";
import { useEffect, useState } from "react";
import Counter from "../general/Counter";
import { Rating } from "@mui/material";
import Comment from "../detail/Comment";
import UseCart from "@/hooks/useCard";

export type CardProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
  reviews?: { id: string; rating: number; comment?: string }[];

};

const DetailClient = ({ product }: { product: CardProductProps }) => {
  const { addToBasket, cartPrdcts } = UseCart();
  const [displayButton, setDisplayButton] = useState(false);

  const [cardProduct, setCardProduct] = useState<CardProductProps>({
    ...product,
    quantity: product.quantity || 1, // Eğer quantity gelmediyse 1 olarak ayarla
  });

  useEffect(() => {
    setDisplayButton(false);

    // Eğer cartPrdcts boş veya undefined ise findIndex çağrılmasın
    if (cartPrdcts && cartPrdcts.length > 0) {
      const controlDisplay = cartPrdcts.findIndex(cart => cart.id === product.id);
      if (controlDisplay > -1) {
        setDisplayButton(true);
      }
    }
  }, [cartPrdcts, product.id]);

  const increaseFunc = () => {
    // Stokta mevcut ürün sayısına göre miktar arttırılacak
    if (cardProduct.quantity < 10 && cardProduct.quantity < product.quantity) { 
      setCardProduct(prev => ({ ...prev, quantity: prev.quantity + 1 }));
    }
  };
  
  const decreaseFunc = () => {
    if (cardProduct.quantity > 1) {
      setCardProduct(prev => ({ ...prev, quantity: prev.quantity - 1 }));
    }
  };

  const productRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length
      : 0;

  return (
    <div className="my-10">
      <PageContainer>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center bg-white p-6 rounded-lg shadow-lg">
          
          {/* Ürün Resmi */}
          <div className="block md:flex gap-10 justify-center">
            <div className="relative h-[200px] md:h-[200px] w-[200px] md:w-[200px] mb-3 md:mb-0">
              <Image src={product.image} fill alt={product.name} />
            </div>
          </div>

          {/* Ürün Detayları */}
          <div className="w-full md:w-1/3 space-y-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>

            {/* Yıldız Puanlaması */}
            <div className="flex items-center gap-2">
              <Rating name="read-only" value={productRating} readOnly />
              <span className="text-gray-500 text-sm">({product.reviews?.length || 0} yorum)</span>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Stok Durumu */}
            <div className="flex items-center gap-2">
              <span className="font-semibold">Stok Durumu:</span>
              {product.inStock ? (
                <span className="text-green-600 font-medium">Stokta Mevcut</span>
              ) : (
                <span className="text-red-600 font-medium">Stokta Yok</span>
              )}
            </div>

            {/* Miktar Seçimi */}
            <Counter increaseFunc={increaseFunc} decreaseFunc={decreaseFunc} cardProduct={cardProduct} />

            {/* Ürün Fiyatı */}
            <div className="text-xl font-semibold text-gray-950">{product.price} TL</div>

            {/* Sepete Ekle Butonu */}
            {displayButton ? (
              <button className="w-full py-3 bg-gray-500 text-white rounded-lg">
                Ürün Sepete Ekli
              </button>
            ) : (
              <button onClick={() => addToBasket(cardProduct)} className="w-full py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-900 transition">
                Sepete Ekle
              </button>
            )}
          </div>

          {/* Yorumlar */}
          {product.reviews?.map((review, index) => (
            <Comment key={`${review.id}-${index}`} prd={review} />
          ))}
        </div>
      </PageContainer>
    </div>
  );
};

export default DetailClient;
