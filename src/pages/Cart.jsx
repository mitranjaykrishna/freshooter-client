import React, { useState } from "react";
import dummy from "../assets/dairy-dum.png";

export default function Cart() {
  const [isEmpty, setIsEmpty] = useState(false);
  return (
    <div className="px-[220px] py-5 flex flex-col gap-5 ">
      <div className="flex flex-col gap-4 p-3 border border-quaternary rounded-2xl bg-white">
        <div className="flex flex-col gap-3 border-b border-quaternary pb-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <p className="text-gray-600">
              This is where your shopping cart items will be displayed.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-900">Select all Items</span>
            <span>Price</span>
          </div>
        </div>

        {isEmpty ? (
          <div className="p-5 ">
            <p className="text-lg font-semibold text-primary">
              Your Cart is Empty
            </p>
            <p className="text-gray-600">
              Add items to your cart to see them here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* items map*/}
            <div className="flex items-center p-3 border-b border-quaternary">
              {/* select button */}
              <input
                type="checkbox"
                className=" h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="w-42 h-42 flex-shrink-0">
                <img
                  src={dummy}
                  alt="Product"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex w-full justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">Product Name</h2>
                    <p className="text-gray-600">Brand Name</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span>Sold By</span>
                      <span className=" text-primary font-semibold">
                        {" "}
                        XYZ Store
                      </span>
                    </div>

                    <span className="text-xs">10 days Returnable</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 mt-1">
                    <span className="line-through text-gray-500">₹599.00</span>
                    <span className="text-primary font-bold">₹499.00</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-3">
                    <button className="px-3 py-1 bg-quaternary text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                      -
                    </button>
                    <span className="text-lg font-semibold">1</span>
                    <button className="px-3 py-1 bg-quaternary text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                      +
                    </button>
                  </div>
                  <span>|</span>
                  <span>Delete</span>
                  <span>|</span>
                  <span>Save for Later </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={() => console.log("Continue Shopping")}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
