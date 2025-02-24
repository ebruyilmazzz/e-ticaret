"use client";

import { products as defaultProducts } from "@/utils/Products";
import Heading from "../general/Headaing";
import ProductCard from "./ProductCard";

interface ProductsProps {
  products?: typeof defaultProducts;
  title?: string;
}

const Products = ({ products = defaultProducts, title = "Tüm Ürünler" }: ProductsProps) => {
  console.log("Ürünler:", products); // Buraya ekle

  return (
    <div className="max-w-[1200px] mx-auto mt-10">
      <Heading text={title}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-3">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product}/>
          ))
        ) : (
          <p>Ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
