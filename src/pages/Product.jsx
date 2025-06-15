import React from "react";
import { FaHeart } from "react-icons/fa";
import FeatureCarousel from "../components/HomeHelper/FeatureCarousel";
export default function Product() {
  return (
    <div className="px-[220px] py-5 flex flex-col gap-5">
      <div className="relative flex flex-col md:flex-row gap-5 rounded-2xl p-5 border border-quaternary bg-white">
        <div className="w-full md:w-2/3">
          {/* Sticky container */}
          <div className="sticky top-[80px] flex gap-5">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              <div className="w-[50px] h-[80px]">
                <img
                  src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                  alt="Product"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-[50px] h-[80px]">
                <img
                  src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                  alt="Product"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Main image */}
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                alt="Product"
                className="w-full max-h-[600px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full ">
          <h1 className="text-2xl font-bold">Product Name</h1>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
            <span className="text-sm text-gray-600">(100 reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-primary">₹49.99</span>
            <span className="line-through text-gray-500">₹59.99</span>
          </div>

          {/* quantity increase and decrease*/}
          <div className="flex items-center gap-3">
            <button className=" bg-quaternary text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
              -
            </button>
            <span className="text-lg font-semibold">1</span>
            <button className=" bg-quaternary text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
              +
            </button>
          </div>
          {/* total price */}
          <div className="text-lg font-semibold text-primary">
            Total: ₹49.99
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
              Buy Now
            </button>
            <button className=" bg-quaternary text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
              Add to Cart
            </button>
            <div className="text-red-500 cursor-pointer ">
              <FaHeart />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-600">Description:</span>
            <p className="text-gray-700">
              This is a great product that you will love. It has many features
              and benefits that make it stand out from the competition.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full border border-quaternary rounded-2xl bg-white">
        <div className="flex-grow w-full h-full px-5 py-6 flex flex-col gap-5 max-w-[250px] ">
          {/* Top Selling */}
          <h2 className="text-xl font-semibold ">Top Selling Products</h2>
          <div className="grid  gap-4">
            {/* Example Product Card */}
            <div className="bg-white border border-quaternary rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                alt="Product"
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold">Product Name</h3>
              <p className="text-sm text-gray-600">₹49.99</p>
            </div>
            {/* Repeat for more products */}
          </div>
        </div>
        <div className="flex-grow w-[1px] bg-quaternary "></div>
        <div className="w-full h-full px-5 pb-6 flex flex-col gap-3 overflow-x-hidden">
          <FeatureCarousel heading={"Related Products"} />

          <div className="w-full h-full flex flex-col gap-5 ">
            {/* review */}
            <h2 className="text-xl font-semibold">Customer Reviews</h2>
            <div className="flex flex-col gap-3 mt-3">
              <div className="p-4 border border-quaternary rounded-lg bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <span className="text-sm text-gray-600">John Doe</span>
                </div>
                <p className="text-gray-700 mt-2">
                  This product is amazing! I loved it and will buy again.
                </p>
              </div>
              <div className="p-4 border border-quaternary rounded-lg bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐</span>
                  <span className="text-sm text-gray-600">Jane Smith</span>
                </div>
                <p className="text-gray-700 mt-2">
                  Good quality, but the delivery was a bit slow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
