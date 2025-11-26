import Image from "next/image";
import Link from "next/link";

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
    <section className="py-8 sm:py-12 md:py-14 lg:py-16 bg-gray-50 border-b border-b-dimGray_01">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-10 md:mb-12">
          Explore Categories
        </h2>

        <div className="w-max mx-auto grid grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-4 justify-items-center">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/shop?category=${category.name}`}
              className="w-[86px] h-[112px] sm:w-[100px] sm:h-[130px] md:w-[120px] md:h-[150px] lg:w-[140px] lg:h-[170px] xl:w-40 xl:h-48 group flex flex-col items-center justify-center bg-offWhite rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div
                className={`rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4 lg:mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                <Image
                  height={100}
                  width={100}
                  src={category.image}
                  alt={category.name}
                  className="w-[54px] h-[54px] sm:w-[64px] sm:h-[64px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px] xl:w-[100px] xl:h-[100px] rounded-[12px] object-contain"
                  unoptimized
                />
              </div>
              <span className="font-[Google Sans] font-medium text-[18px] leading-[100%] tracking-[0] text-xs sm:text-sm md:text-base lg:text-base xl:text-sm text-primary text-center px-1">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
