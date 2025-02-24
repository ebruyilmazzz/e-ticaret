
import DetailClient from "@/app/components/detail/DetailClient";
import { products } from "@/utils/Products";
import React from "react";

type DetailProps = {
  productId?: string;
};

const Detail = ({ params }: { params: DetailProps }) => {
  const { productId } = params;

  
  const product = products.find((product) => product.id === productId);

  
  if (!product) {
    return <p className="text-center text-red-500">Ürün bulunamadı.</p>;
  }

  return (
    <div>
      <DetailClient product={product} />
    </div>
  );
};

export default Detail;
