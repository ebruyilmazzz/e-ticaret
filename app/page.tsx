"use client"; // Bunu eklemelisin
import Banner from "./components/home/Banner";
import Category from "./components/home/Category";
import Products from "./components/home/Products";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Category />
      <Banner />
      <Products />
    </div>
  );
}
