"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/layout/common";
import Link from "next/link";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/Rectangle.png",
      title: "Find the Best Solution for Your Crops Instantly!",
      subtitle:
        "Get top-quality agriculture products delivered to your farm fast! Save time, skip the hassle, and ensure a healthy, thriving harvest with quick, reliable delivery.",
      buttonText: "Shop Now",
    },
    {
      image: "/images/Rectangle.png",
      title: "Premium Quality Seeds & Fertilizers",
      subtitle:
        "Boost your crop yield with our scientifically tested seeds and fertilizers. Trusted by thousands of farmers across the country for exceptional results.",
      buttonText: "Shop Now",
    },
    {
      image: "/images/Rectangle.png",
      title: "Expert Agricultural Solutions",
      subtitle:
        "From pest control to soil nutrition, we provide comprehensive farming solutions. Get expert advice and premium products for sustainable agriculture.",
      buttonText: "Shop Now",
    },
  ];

  // Auto-change slides every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[70vh] sm:h-[80vh] lg:h-[85vh] flex items-center justify-center overflow-hidden border-b border-b-dimGray_01">
      {/* Carousel Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/images/Rectangle.png"
            alt={`Agriculture slide ${index + 1}`}
            fill
            className="object-cover hidden lg:block"
            priority={index === 0}
          />
          <Image
            src="/images/Rectangle_mobile.png"
            alt={`Agriculture slide ${index + 1}`}
            fill
            className="object-contain block lg:hidden"
            priority={index === 0}
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/70 to-green-700/60"></div> */}
        </div>
      ))}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute top-10 right-10 w-32 h-32 md:w-64 md:h-64 border border-white/20 rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 md:w-32 md:h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-16 md:right-32 w-24 h-24 md:w-48 md:h-48 border border-white/20 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
          {/* Left Content */}
          <div className="h-full flex items-stretch flex-col">
            <div className="space-y-4 md:space-y-6 text-left">
              <h1 className="font-[Google Sans] font-medium text-3xl lg:text-[52px] leading-[100%] tracking-[0] sm:text-4xl md:text-5xl lg:text-6xl text-white transition-all duration-500">
                {slides[currentSlide].title.split(" ").map((word, index) => (
                  <span key={index}>
                    {word === "Best" ||
                    word === "Premium" ||
                    word === "Expert" ? (
                      <span className="text-yellow-400">{word}</span>
                    ) : (
                      word
                    )}
                    {index < slides[currentSlide].title.split(" ").length - 1 &&
                      " "}
                  </span>
                ))}
              </h1>

              <p className="font-[Plus Jakarta Sans] font-semibold text-15 leading-[26px] tracking-[1%] text-base sm:text-lg md:text-xl text-green-100 max-w-md mx-auto lg:mx-0 transition-all duration-500">
                {slides[currentSlide].subtitle}
              </p>
            </div>
            <div className="pt-32">
              <Button className="bg-secondary w-[130px] h-[40px] lg:w-[175px] lg:h-[50px] rotate-0 opacity-100 rounded-[12px] gap-[4px] !p-0 hover:bg-yellow-500 text-primary font-semibold transition-colors lg:mx-0 text-xs lg:text-sm sm:text-base">
                <Link
                  href={"/shop"}
                  className="w-full h-full flex items-center justify-center pt-[13px] pr-[20px] lg:pr-[34px] pb-[15px] pl-[20px] lg:pl-[34px] px-6 sm:px-8 py-3 sm:py-4 "
                >
                  {" "}
                  {slides[currentSlide].buttonText} →
                </Link>
              </Button>
            </div>
          </div>
          {/* Right Content - Empty space for desktop */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* Bottom Navigation Dots */}
      <div className="absolute flex items-center justify-center gap-3 bottom-32 right-11 lg:bottom-24 lg:right-28 z-20">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="z-20 w-10 h-10 flex items-center justify-center text-white text-lg sm:text-xl"
          aria-label="Previous slide"
        >
          ←
        </button>
        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-10 h-10 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="z-20 w-10 h-10 flex items-center justify-center text-white text-lg sm:text-xl"
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Slide Progress Indicator */}
      <div className="hidden absolute bottom-6 sm:bottom-8 right-4 sm:right-8 z-20">
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
          <span className="text-white text-xs font-medium">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>
    </section>
  );
}
