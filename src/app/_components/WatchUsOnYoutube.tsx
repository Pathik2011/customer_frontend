"use client";

import { useState, useEffect, useRef } from "react";
import { useHomepageStore } from "@/store/useHomepageStore";
import { YouTubeVideoItem } from "@/types/homepage";
import LeftArrowIcon from "@/icons/LeftArrowIcon";
import RightArrowIcon from "@/icons/RightArrowIcon";

export default function WatchUsOnYoutube() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const mouseStartX = useRef<number>(0);
  const mouseEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const { youtubeVideos, loadingStates, errorStates, fetchYouTubeVideos } =
    useHomepageStore();

  useEffect(() => {
    fetchYouTubeVideos();
  }, [fetchYouTubeVideos]);

  const isLoading = loadingStates.youtubeVideos;
  const error = errorStates.youtubeVideos;
  const apiItems: YouTubeVideoItem[] = youtubeVideos?.items || [];

  // Convert API data to display format
  const apiVideos = apiItems.map((item) => {
    // Extract YouTube video ID from URL
    const videoId = item.youtube_url.includes("watch?v=")
      ? item.youtube_url.split("watch?v=")[1].split("&")[0]
      : "dQw4w9WgXcQ";

    return {
      id: item.video_id,
      title: item.video_title,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoId: videoId,
      youtubeUrl: item.youtube_url,
    };
  });

  // Use API data if available, otherwise use fallback
  const videos = apiVideos.length > 0 ? apiVideos : [];

  // For desktop, we show 4 videos per slide
  const videosPerSlide = 4;
  const totalSlides = Math.ceil(videos.length / videosPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // For mobile, we use individual video navigation
  const nextVideoMobile = () => {
    setCurrentSlide((prev) => (prev + 1) % videos.length);
  };

  const prevVideoMobile = () => {
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToVideoMobile = (index: number) => {
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

  // Handle touch end - detect swipe direction (mobile)
  const handleTouchEndMobile = () => {
    const swipeThreshold = 100;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextVideoMobile();
      } else {
        prevVideoMobile();
      }
    }
  };

  // Handle touch end - detect swipe direction (desktop)
  const handleTouchEndDesktop = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
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

  // Handle mouse up - detect drag direction (mobile)
  const handleMouseUpMobile = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    const swipeThreshold = 50;
    const diff = mouseStartX.current - mouseEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextVideoMobile();
      } else {
        prevVideoMobile();
      }
    }
  };

  // Handle mouse up - detect drag direction (desktop)
  const handleMouseUpDesktop = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    const swipeThreshold = 50;
    const diff = mouseStartX.current - mouseEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Handle mouse leave - reset dragging
  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  // Handle wheel event for trackpad horizontal scroll (mobile)
  const handleWheelMobile = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      const threshold = 30;

      if (e.deltaX > threshold) {
        nextVideoMobile();
      } else if (e.deltaX < -threshold) {
        prevVideoMobile();
      }
    }
  };

  // Handle wheel event for trackpad horizontal scroll (desktop)
  const handleWheelDesktop = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      const threshold = 30;

      if (e.deltaX > threshold) {
        nextSlide();
      } else if (e.deltaX < -threshold) {
        prevSlide();
      }
    }
  };

  return (
    <section
      className="py-12 sm:py-16 lg:py-20 relative border-b border-b-dimGray_01 bg-no-repeat"
      style={{ backgroundImage: "url(/images/youtube_bg_image.png)" }}
    >
      {/* Background overlay for better content readability */}
      <div className="absolute inset-0 bg-transparent bg-opacity-90"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="font-[Google Sans] font-medium text-[28px] text-gray-900 mb-4 sm:mb-6">
            {youtubeVideos?.display_title || "Watch Us On Youtube"}
          </h2>
          <p className="font-[Plus Jakarta Sans] font-semibold text-[15px] text-dimGray max-w-2xl mx-auto leading-relaxed">
            Discover expert farming tips, product demonstrations, and success
            stories from fellow farmers on our YouTube channel.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div>
            <span className="ml-3 text-gray-600">Loading videos...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchYouTubeVideos()}
              className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Mobile Layout - Single Video with Navigation */}
            <div className="block lg:hidden">
              <div
                className="relative select-none cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEndMobile}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpMobile}
                onMouseLeave={handleMouseLeave}
                onWheel={handleWheelMobile}
              >
                {/* Video Container */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-sm mx-auto">
                  {/* Video Thumbnail */}
                  <div className="relative mb-4 rounded-xl overflow-hidden">
                    <a
                      href={videos[currentSlide]?.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="aspect-video relative">
                        {videos[currentSlide]?.thumbnail ? (
                          <img
                            src={videos[currentSlide]?.thumbnail}
                            alt={videos[currentSlide]?.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600"></div>
                        )}
                        {/* YouTube Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-lg">
                            <svg
                              className="w-4 h-4 text-white ml-0.5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Video Title */}
                  <h3 className="text-lg font-semibold text-gray-900 text-center">
                    {videos[currentSlide]?.title}
                  </h3>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center mt-6 gap-4">
                  {/* Previous Button */}
                  <button
                    onClick={prevVideoMobile}
                    className="w-6 h-6 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center"
                  >
                    <LeftArrowIcon />
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex gap-2">
                    {videos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToVideoMobile(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide
                          ? "bg-green-600"
                          : "bg-gray-300 hover:bg-gray-400"
                          }`}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={nextVideoMobile}
                    className="w-6 h-6 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center"
                  >
                    <RightArrowIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Sliding 4 Videos */}
            <div className="hidden lg:block">
              <div
                className="relative overflow-hidden mb-8 select-none cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEndDesktop}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpDesktop}
                onMouseLeave={handleMouseLeave}
                onWheel={handleWheelDesktop}
              >
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {Array.from({ length: totalSlides }, (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-4 gap-6 xl:gap-8">
                        {videos
                          .slice(
                            slideIndex * videosPerSlide,
                            slideIndex * videosPerSlide + videosPerSlide
                          )
                          .map((video) => (
                            <div
                              key={video.id}
                              className="group cursor-pointer"
                            >
                              {/* Video Card */}
                              <div className="bg-white rounded-2xl p-4 ">
                                {/* Video Thumbnail */}
                                <div className="relative mb-4 rounded-xl overflow-hidden">
                                  <a
                                    href={video.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                  >
                                    <div className="aspect-video relative">
                                      {video.thumbnail &&
                                        !video.thumbnail.includes(
                                          "placeholder"
                                        ) ? (
                                        <img
                                          src={video.thumbnail}
                                          alt={video.title}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600"></div>
                                      )}
                                      {/* YouTube Play Button Overlay */}
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-lg">
                                          <svg
                                            className="w-4 h-4 text-white ml-0.5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path d="M8 5v14l11-7z" />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                </div>

                                {/* Video Title */}
                                <h3 className="text-base font-semibold text-gray-900 text-center">
                                  {video.title}
                                </h3>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="flex items-center justify-center gap-4 text-primary">
                {/* Previous Button */}
                <button
                  onClick={prevSlide}
                  disabled={totalSlides <= 1}
                  className="w-6 h-6 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LeftArrowIcon />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {Array.from({ length: totalSlides }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide
                        ? "bg-primary"
                        : "bg-gray-300 hover:bg-gray-400"
                        }`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  disabled={totalSlides <= 1}
                  className="w-6 h-6 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RightArrowIcon />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
