"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/layout/common";
import Link from "next/link";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const mouseStartX = useRef<number>(0);
  const mouseEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

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

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  // Handle touch end - detect swipe direction
  const handleTouchEnd = () => {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next slide
        nextSlide();
      } else {
        // Swiped right - go to previous slide
        prevSlide();
      }
    }
  };

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
  };

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      mouseEndX.current = e.clientX;
    }
  };

  // Handle mouse up - detect drag direction
  const handleMouseUp = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    const swipeThreshold = 100;
    const diff = mouseStartX.current - mouseEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Dragged left - go to next slide
        nextSlide();
      } else {
        // Dragged right - go to previous slide
        prevSlide();
      }
    }
  };

  // Handle mouse leave - reset dragging
  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  // Handle wheel event for trackpad horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    // Check if it's a horizontal scroll (trackpad two-finger swipe)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      const threshold = 30;

      if (e.deltaX > threshold) {
        // Swiped left - go to next slide
        nextSlide();
      } else if (e.deltaX < -threshold) {
        // Swiped right - go to previous slide
        prevSlide();
      }
    }
  };

  return (
    <section
      className="relative h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] flex items-center justify-center overflow-hidden border-b border-b-dimGray_01 select-none cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    >
      {/* Carousel Images */}
      {slides.map((_, index) => (
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
            className="object-cover lg:object-contain block lg:hidden"
            priority={index === 0}
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/70 to-green-700/60"></div> */}
        </div>
      ))}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-10 pointer-events-none">
        <div className="absolute top-8 sm:top-10 right-8 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 border border-white/20 rounded-full"></div>
        <div className="absolute top-16 sm:top-20 right-16 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-8 sm:bottom-10 right-12 sm:right-16 md:right-24 lg:right-32 w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 border border-white/20 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center h-full">
          {/* Left Content */}
          <div className="h-full flex items-stretch flex-col">
            <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-left">
              <h1 className="font-[Google Sans] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[52px] leading-[100%] tracking-[0] text-white transition-all duration-500">
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

              <p className="font-[Plus Jakarta Sans] font-semibold text-sm sm:text-base md:text-lg lg:text-xl leading-[1.6] tracking-[1%] text-green-100 max-w-sm sm:max-w-md md:max-w-lg lg:mx-0 transition-all duration-500">
                {slides[currentSlide].subtitle}
              </p>
            </div>
            <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32">
              <Button className="bg-secondary w-[140px] h-[42px] sm:w-[150px] sm:h-[45px] md:w-[160px] md:h-[48px] lg:w-[175px] lg:h-[50px] rotate-0 opacity-100 rounded-[12px] gap-[4px] !p-0 hover:bg-yellow-500 text-primary font-semibold transition-colors lg:mx-0 text-xs sm:text-sm md:text-base">
                <Link
                  href={"/shop"}
                  className="w-full h-full flex items-center justify-center px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-3.5 md:py-4"
                >
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
