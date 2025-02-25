"use client";
import { useState } from "react";

type CategoryProps = {
  categories?: { name: string }[];
  onSelectCategory: (category: string | null) => void; // Seçilen kategoriyi üst bileşene ilet
};

const Category = ({ categories, onSelectCategory }: CategoryProps) => {
  const defaultCategories = [
    { name: "Ayakkabı" },
    { name: "Telefon" },
    { name: "Bilgisayar" },
    { name: "Mouse" },
  ];

  const categoryList = categories || defaultCategories;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    onSelectCategory(newCategory); // Üst bileşene bildir
  };

  return (
    <div className="flex items-center justify-center px-3 md:px-10 gap-3 md:gap-10 py-10 my-5 md:py-8 overflow-x-auto">
      {categoryList.map((category) => (
        <div
          key={category.name}
          onClick={() => handleCategoryClick(category.name)}
          className={`border text-slate-500 rounded-full min-w-[120px] flex items-center justify-center cursor-pointer px-3 py-2 text-center
            ${selectedCategory === category.name ? "bg-blue-500 text-white" : "hover:bg-gray-200"}
          `}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Category;
