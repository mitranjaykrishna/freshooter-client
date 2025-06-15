import React, { useRef } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

export default function FeatureCarousel({ heading }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250; // smaller amount for mobile friendliness
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="border border-quaternary p-4 sm:p-6 rounded-lg relative">
      <span className="text-xl sm:text-2xl font-semibold text-center block mb-4">
        {heading}
      </span>

      {/* Scroll Buttons (hide on very small screens if needed) */}
      <button
        onClick={() => scroll("left")}
        className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-2 shadow-lg z-10 cursor-pointer"
      >
        <IoMdArrowBack className="text-2xl" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-2 shadow-lg z-10 cursor-pointer"
      >
        <IoMdArrowForward className="text-2xl" />
      </button>

      {/* Scrollable products */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 scrollbar-hide p-1"
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-36 sm:w-40 md:w-48 p-3 bg-white shadow-md rounded-lg hover:bg-gradient-to-r from-tertiary from-2% to-primary hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="w-full h-28 sm:h-32 md:h-36 bg-gray-200 rounded-lg mb-2"></div>
            <span className="text-xs sm:text-sm font-semibold">
              Product {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
