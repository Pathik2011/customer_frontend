import Image from "next/image";

export default function CategoriesSection() {
  const categories = [
    { name: "Fungicide", image: "/images/Fungicide.png" },
    { name: "Herbicide", image: "/images/Herbicide.png" },
    { name: "Insecticide", image: "/images/Insecticide.png" },
    { name: "Fertilizer", image: "/images/Fertilizer.png" },
    { name: "Rodenticide", image: "/images/Rodenticide.png" },
    { name: "Seeds", image: "/images/Seeds.png" },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 border-b border-b-dimGray_01">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
          Explore Categories
        </h2>

        <div className="mx-auto grid grid-cols-2 place-items-center sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <button
              key={index}
              className="w-40 h-48 group flex flex-col items-center justify-center bg-offWhite rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-green-200"
            >
              <div
                className={`rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                <Image
                  height={100}
                  width={100}
                  src={category.image}
                  alt={category.name}
                  className="w-[100px] h-[100px] rounded-[12px] object-contain"
                  unoptimized
                />
              </div>
              <span className="font-[Google Sans] font-medium text-[18px] leading-[100%] tracking-[0] text-xs sm:text-sm text-primary text-center">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
