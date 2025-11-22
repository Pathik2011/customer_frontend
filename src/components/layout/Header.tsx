"use client";

import PhoneIcon from "@/icons/PhoneIcon";
import SearchIcon from "@/icons/SearchIcon";
import ShoppingBagIcon from "@/icons/ShoppingBagIcon";
import UserProfileIcon from "@/icons/UserProfileIcon";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button } from "./common";
import { useCategoryStore } from "@/store/useCategoryStore";
import "@/styles/header.css";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<
    number | null
  >(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isSticky, setIsSticky] = useState(false);
  const buttonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const { categories, fetchCategories, isLoading } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate dropdown position
  const calculateDropdownPosition = (categoryId: number) => {
    const button = buttonRefs.current[categoryId];
    if (button) {
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: categoryId === -1 ? rect.right - 256 : rect.left, // Right-align for "More" button
      });
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary text-white text-xs sm:text-sm px-0 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="py-2 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span className="text-xs flex items-center gap-1 sm:gap-2">
              Get <span className="text-[#FFEB6D]">30% Off</span> on your first
              order ✨
            </span>
            <span className="flex items-center gap-1 sm:gap-2">
              Order now and get it within
              <span className="text-[#FFEB6D]"> 20 minutes</span>
            </span>
          </div>
          <div className="hidden  w-full lg:w-max py-2 lg:flex flex-row items-center gap-2 sm:gap-4 bg-[#FD820B]">
            <button className=" px-3 sm:px-4 py-1 rounded text-white font-medium text-xs sm:text-sm">
              Call for Order
            </button>
            <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <PhoneIcon /> +91 7043 11 9999
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`bg-white shadow-sm border-b border-b-dimGray_01 transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 right-0 shadow-lg" : ""
        }`}
        style={{ zIndex: isSticky ? 1000 : 100 }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={"/"}>
              <Image
                src="/images/Logo.png"
                alt="Logo"
                height={100}
                width={100}
                unoptimized
              />
            </Link>
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-lg mx-4 lg:mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search you product, category or brands"
                  className="w-full px-4 py-2 lg:py-3 pl-10 lg:pl-12 border border-gray-300 rounded-[40px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-sm"
                />
                <button className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Desktop Actions */}
              <div className="hidden sm:flex items-center gap-2 lg:gap-3 text-primary text-sm font-semibold">
                <Button
                  disabled
                  className="h-full w-full flex items-center gap-1 px-3 py-2 border border-primary rounded-xl hover:bg-gray-50 text-xs text-primary font-medium"
                >
                  English{" "}
                  <span className="material-symbols-outlined text-sm">
                    keyboard_arrow_down
                  </span>
                </Button>
                <Button
                  disabled
                  className="h-max flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1 lg:py-2 hover:bg-gray-50 rounded-full text-xs lg:text-sm"
                >
                  <UserProfileIcon /> Login
                </Button>
                <Button
                  disabled
                  className="flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1 lg:py-2 hover:bg-gray-50 rounded-full text-xs lg:text-sm"
                >
                  <ShoppingBagIcon /> Bag
                </Button>
              </div>

              {/* Mobile Actions */}
              <div className="sm:hidden flex items-center gap-[10px]">
                <Button
                  className="h-full w-full flex items-center gap-1 px-3 py-2 border border-primary rounded-xl hover:bg-gray-50 text-xs text-primary font-medium"
                  disabled
                >
                  English
                  <span className="material-symbols-outlined text-sm">
                    keyboard_arrow_down
                  </span>
                </Button>

                <Button disabled>
                  <UserProfileIcon className="min-w-5 min-h-5" />
                </Button>

                <Button disabled>
                  <ShoppingBagIcon className="min-w-5 min-h-5" />
                </Button>

                <Button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="enabled:hover:bg-gray-200"
                >
                  <svg
                    className="min-w-6 min-h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-sm"
              />
              <button className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon className="w-full h-9" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              {/* Navigation Items */}
              <div className="flex flex-col space-y-2 mb-4">
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  categories.map((category) => (
                    <div key={category.category_id} className="relative">
                      <button
                        className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 rounded-lg text-sm text-primary transition-colors"
                        onMouseEnter={() =>
                          setMobileExpandedCategory(
                            mobileExpandedCategory === category.category_id
                              ? null
                              : category.category_id
                          )
                        }
                      >
                        <span className="font-medium">
                          {category.category_name}
                        </span>
                        {category.sub_categories.length > 0 && (
                          <span
                            className={`material-symbols-outlined text-sm transition-transform duration-200 ${
                              mobileExpandedCategory === category.category_id
                                ? "rotate-180"
                                : ""
                            }`}
                          >
                            keyboard_arrow_down
                          </span>
                        )}
                      </button>

                      {/* Mobile Subcategories */}
                      {mobileExpandedCategory === category.category_id &&
                        category.sub_categories.length > 0 && (
                          <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                            {category.sub_categories.map((subCategory) => (
                              <button
                                key={subCategory.category_id}
                                className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors"
                              >
                                {subCategory.category_name}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  ))
                )}
              </div>

              {/* User Actions */}
              <div className="flex flex-col space-y-3 border-t border-gray-200 pt-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 text-sm">
                  English{" "}
                  <span className="material-symbols-outlined text-sm">
                    keyboard_arrow_down
                  </span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-full text-sm">
                  <UserProfileIcon /> Login
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-full text-sm">
                  <ShoppingBagIcon /> Bag
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu - Desktop Only */}
        <nav
          className="header-nav bg-white border-t border-gray-200 relative"
          style={{ overflow: "visible", zIndex: 100 }}
        >
          <div
            className=" mx-auto px-2 sm:px-4"
            style={{ overflow: "visible" }}
          >
            {/* Desktop Navigation */}
            <div
              onMouseLeave={() => setOpenDropdown(null)}
              className="hidden md:block relative"
              style={{ overflow: "visible", zIndex: 100 }}
            >
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 md:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-1">
                  {categories.slice(0, 6).map((category) => (
                    <div key={category.category_id} className="relative ">
                      <button
                        ref={(el) => {
                          buttonRefs.current[category.category_id] = el;
                        }}
                        className={`flex items-center gap-1 font-medium text-sm transition-all duration-200 whitespace-nowrap px-3 py-2 rounded-md min-w-fit ${
                          openDropdown === category.category_id
                            ? "text-green-600 bg-green-50"
                            : "text-primary hover:text-green-600 hover:bg-gray-50"
                        }`}
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          calculateDropdownPosition(category.category_id);
                          setOpenDropdown(
                            openDropdown === category.category_id
                              ? null
                              : category.category_id
                          );
                        }}
                      >
                        {category.category_name}
                        {category.sub_categories.length > 0 && (
                          <span
                            className={`material-symbols-outlined text-base transition-transform duration-200 ${
                              openDropdown === category.category_id
                                ? "rotate-180"
                                : ""
                            }`}
                          >
                            keyboard_arrow_down
                          </span>
                        )}
                      </button>

                      {/* Desktop Dropdown */}
                      {openDropdown === category.category_id &&
                        category.sub_categories.length > 0 && (
                          <div
                            className="dropdown-menu"
                            style={{
                              top: dropdownPosition.top,
                              left: dropdownPosition.left,
                              zIndex: 999999,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="py-2 max-h-80 overflow-y-auto">
                              {category.sub_categories.map((subCategory) => (
                                <button
                                  key={subCategory.category_id}
                                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenDropdown(null);
                                    // Handle subcategory selection here
                                  }}
                                >
                                  {subCategory.category_name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}

                  {/* Show more categories if there are more than 6 */}
                  {categories.length > 6 && (
                    <div className="dropdown-container flex-shrink-0">
                      <button
                        ref={(el) => {
                          buttonRefs.current[-1] = el;
                        }}
                        className={`flex items-center gap-1 font-medium text-sm transition-all duration-200 whitespace-nowrap px-3 py-2 rounded-md min-w-fit ${
                          openDropdown === -1
                            ? "text-green-600 bg-green-50"
                            : "text-primary hover:text-green-600 hover:bg-gray-50"
                        }`}
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          calculateDropdownPosition(-1);
                          setOpenDropdown(openDropdown === -1 ? null : -1);
                        }}
                      >
                        More
                        <span
                          className={`material-symbols-outlined text-base transition-transform duration-200 ${
                            openDropdown === -1 ? "rotate-180" : ""
                          }`}
                        >
                          keyboard_arrow_down
                        </span>
                      </button>

                      {/* More Categories Dropdown */}
                      {openDropdown === -1 && (
                        <div
                          className="dropdown-menu"
                          style={{
                            top: dropdownPosition.top,
                            left: dropdownPosition.left,
                            zIndex: 999999,
                            width: "256px",
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="py-2 max-h-80 overflow-y-auto">
                            {categories.slice(6).map((category) => (
                              <div key={category.category_id}>
                                {category.sub_categories.length > 0 ? (
                                  // Category with subcategories - show as expandable
                                  <div className="border-b border-gray-100 last:border-b-0">
                                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                      {category.category_name}
                                    </div>
                                    {category.sub_categories.map(
                                      (subCategory) => (
                                        <button
                                          key={subCategory.category_id}
                                          className="block w-full text-left px-6 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenDropdown(null);
                                          }}
                                        >
                                          {subCategory.category_name}
                                        </button>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  // Category without subcategories - show as direct link
                                  <button
                                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenDropdown(null);
                                    }}
                                  >
                                    {category.category_name}
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
