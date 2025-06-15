import React, { useRef, useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";

export default function FeatureCarousel({ heading }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [productsDetails, setProductsDetails] = useState([
    // Example product details, can be replaced with actual data
    { id: 1, name: "Product 1", image: "image1.jpg", link: "123336" },
    { id: 2, name: "Product 2", image: "image2.jpg", link: "123336" },
    { id: 3, name: "Product 3", image: "image3.jpg", link: "123336" },
    { id: 4, name: "Product 4", image: "image4.jpg", link: "123336" },
    { id: 5, name: "Product 5", image: "image5.jpg", link: "123336" },
    { id: 6, name: "Product 6", image: "image6.jpg", link: "123336" },
    { id: 7, name: "Product 7", image: "image7.jpg", link: "123336" },
    { id: 8, name: "Product 8", image: "image8.jpg", link: "123336" },
    { id: 9, name: "Product 9", image: "image9.jpg", link: "123336" },
    { id: 10, name: "Product 10", image: "image10.jpg", link: "123336" },
    { id: 11, name: "Product 11", image: "image11.jpg", link: "123336" },
    { id: 12, name: "Product 12", image: "image12.jpg", link: "123336" },
  ]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250; // smaller amount for mobile friendliness
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleNavigate = (link) => {
    // Navigate to the product details page
    navigate(`/product/${link}`);
  };

  return (
    <div className="w-full border border-quaternary p-4 sm:p-6 rounded-lg relative">
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
        {productsDetails.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-36 sm:w-40 md:w-48 p-3 bg-white shadow-md rounded-lg hover:bg-gradient-to-r from-tertiary from-2% to-primary hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleNavigate(item.link)}
          >
            <div className="w-full h-28 sm:h-32 md:h-36 bg-gray-200 rounded-lg mb-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="text-xs sm:text-sm font-semibold">
              Product {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
