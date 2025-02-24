"use client";

const Category = () => {
  const categorylist = [
    { name: "Ayakkabı" },
    { name: "Çanta" },
    { name: "Saat" },
    { name: "Kemer" },
    { name: "Gözlük" },
    { name: "Şapka" },
    { name: "Cüzdan" },
  ];

  return (
    <div className="flex items-center justify-center px:3 md:px-10 gap-3 md:gap-10 py-10 my-5 md:py-8 overflow-x-auto">
      {categorylist.map((category, index) => (
        <div className="border text-slate-500 rounded-full min-w-[120px] flex items-center flex-1 justify-center cursor-pointer px-3 py-2 text-center"key={index}>{category.name}</div>
      ))}
    </div>
  );
};

export default Category;
