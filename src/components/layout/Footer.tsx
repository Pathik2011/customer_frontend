import Image from "next/image";
import RightArrowIcon from "@/icons/RightArrowIcon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-green-800 text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          {/* Logo and Description */}
          <div className="text-center mb-8">
            <div className="flex items-center mb-6">
              <Image
                src="/images/Logo_white.png"
                alt="Logo"
                height={100}
                width={100}
                unoptimized
              />
            </div>
            <p className="text-green-100 text-sm leading-relaxed mb-6 px-4">
              Winter-wise Farming. Curated for Crops, Carefully Chosen for You.
              Winter-wise Farming. Curated for Crops, Carefully Chosen for You.
            </p>

            {/* Newsletter Signup */}
            <div className="flex items-center bg-white rounded-full p-1 mx-4 mb-8">
              <input
                type="email"
                placeholder="Enter phone number for daily updates"
                className="flex-1 px-4 py-3 text-gray-800 text-sm focus:outline-none bg-transparent placeholder:text-gray-500"
              />
              <button className="min-h-[38px] min-w-[38px] bg-secondary hover:bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors ml-1">
                <RightArrowIcon className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Quick Links */}
            <div className="text-left">
              <h4 className="font-semibold text-lg mb-4 text-white">
                Quick Links
              </h4>
              <ul className="space-y-3 text-green-100">
                <li>
                  <Link
                    href="/shop"
                    className="hover:text-white text-sm transition-colors"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <button className="hover:text-white text-sm transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button className="hover:text-white text-sm transition-colors">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="text-left">
              <h4 className="font-semibold text-lg mb-4 text-white">
                Categories
              </h4>
              <ul className="space-y-3 text-green-100">
                <li>
                  <button className="hover:text-white text-sm transition-colors">
                    Fungicide
                  </button>
                </li>
                <li>
                  <button className="hover:text-white text-sm transition-colors">
                    Herbicide
                  </button>
                </li>
                <li>
                  <button className="hover:text-white text-sm transition-colors">
                    Insecticide
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-green-800 text-lg">
                call
              </span>
            </div>
            <div>
              <p className="font-semibold text-white text-base">
                +91 70431 12918
              </p>
              <p className="text-sm text-green-200">Phone Number</p>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="flex items-center flex-shrink-0">
                <Image
                  src="/images/Logo_white.png"
                  alt="Logo"
                  height={100}
                  width={100}
                  unoptimized
                />
              </div>
            </div>
            <p className="text-green-100 text-sm leading-relaxed mb-6">
              Winter-wise Farming. Curated for Crops.
              <br />
              Carefully Chosen for You. Winter-wise Farming:
              <br />
              Curated for Crops. Carefully Chosen for You.
            </p>

            {/* Newsletter Signup */}
            <div className="w-max flex items-center bg-white rounded-full p-1">
              <input
                name="email"
                type="email"
                placeholder="Enter phone number for daily updates"
                className="flex-1 px-4 py-3 text-gray-800 text-sm focus:outline-none bg-transparent placeholder:text-gray-500"
              />
              <button className="w-11 h-11 flex justify-center items-center bg-secondary hover:bg-[#f4dd4a] rounded-full text-black transition-colors ml-1">
                <RightArrowIcon className="w-[40px] h-[40px]" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-green-100">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-white text-sm transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <button className="hover:text-white text-sm transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button className="hover:text-white text-sm transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2 text-green-100">
              <li>
                <button className="hover:text-white text-sm transition-colors">
                  Fungicide
                </button>
              </li>
              <li>
                <button className="hover:text-white text-sm transition-colors">
                  Herbicide
                </button>
              </li>
              <li>
                <button className="hover:text-white text-sm transition-colors">
                  Insecticide
                </button>
              </li>
              <li>
                <button className="hover:text-white text-sm transition-colors">
                  Fertilizer
                </button>
              </li>
              <li>
                <button className="hover:text-white text-sm transition-colors">
                  Rodenticide
                </button>
              </li>
              <li>
                <button className="hover:text-white text-sm transition-colors">
                  Seeds
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Details</h4>
            <div className="flex items-center gap-3 text-green-100">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-green-800 text-sm">
                  call
                </span>
              </div>
              <div>
                <p className="font-semibold text-white text-base">
                  +91 70431 12918
                </p>
                <p className="text-xs text-green-200">Phone Number</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-orange-500 rounded-full transform translate-x-12 sm:translate-x-16 translate-y-12 sm:translate-y-16"></div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-green-700 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-start text-green-200 text-xs sm:text-sm">
            ©2024 Sapana Fertilizers Pvt Ltd
          </p>
        </div>
      </div>
      <Image
        width={100}
        height={100}
        alt="bottom leaf"
        src="/images/bottom_leaf.png"
        className="h-[300px] w-[300px] lg:h-[350px] lg:w-[350px] absolute bottom-0 -right-6 -z-0"
      />
    </footer>
  );
}
