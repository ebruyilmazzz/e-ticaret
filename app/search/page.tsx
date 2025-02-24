"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { products } from "@/utils/Products";
import Products from "@/app/components/home/Products";
import PageContainer from "@/app/components/containers/PageContainer";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams ? searchParams.get("q") : null; // null kontrolü ekledik
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (query) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [query]);

  return (
    <PageContainer>
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-4">
          {query ? `"${query}" için arama sonuçları` : "Tüm Ürünler"}
        </h1>
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">Aradığınız kriterlere uygun ürün bulunamadı.</p>
        ) : (
          <Products products={filteredProducts} />
        )}
      </div>
    </PageContainer>
  );
}
