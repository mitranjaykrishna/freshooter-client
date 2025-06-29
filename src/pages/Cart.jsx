import React, { useEffect, useState } from "react";
import { services } from "../utils/services";
import { StaticApi } from "../utils/StaticApi";
import { toast } from "react-toastify";
import dairydumm from "../assets/dairy-dum.png";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([{
    id: 3,
    productId: 11,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }, {
    id: 1,
    productId: 12,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }, {
    id: 4,
    productId: 31,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }, {
    id: 3,
    productId: 11,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }, {
    id: 1,
    productId: 12,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }, {
    id: 4,
    productId: 31,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }]);
  const [loading, setLoading] = useState(false);

  const userID = localStorage.getItem("userID");

  const getCartItems = () => {
    setLoading(true);
    services
      .post(`${StaticApi.getUserCart}?userId=${userID}`)
      .then((res) => {
        setCartItems(res?.data?.data || []);
      })
      .catch(() => toast.error("Failed to fetch cart items"))
      .finally(() => setLoading(false));
  };

  const handleQuantityChange = (productId, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
    // toast.info("Quantity updated (you can implement API here)");
  };

  const handleRemove = (productId) => {
    services
      .delete(`${StaticApi.removeFromCart}?userId=${userID}&productId=${productId}`)
      .then(() => {
        toast.success("Item removed");
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
      })
      .catch(() => toast.error("Failed to remove item"));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0
  );

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-20 2xl:px-[220px] py-5 flex flex-col lg:flex-row gap-6 bg-[oklch(0.9_0_0)]">
      {/* Cart Items */}
      <div className="flex-1 flex flex-col gap-5">
        <div className="p-5 bg-white rounded-sm">
          <h1 className="text-2xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-sm text-gray-600 mb-4">Select items to buy or remove.</p>

          {loading ? (
            <p className="text-center py-10 text-gray-500">Loading...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center py-10 text-primary font-semibold text-lg">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row items-center gap-4 border-b py-4"
              >
                <input type="checkbox" className="h-5 w-5" />
                <div className="w-[100px] h-[100px] flex-shrink-0">
                  <img
                    src={item.imageUrl || dairydumm}
                    alt={item.productName}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold">{item.productName}</h2>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-xs text-gray-500 mt-1">Return eligible</p>
                    </div>
                    <div className="text-right">
                      <span className="text-primary font-bold text-lg">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId, -1)}
                        className="px-2 py-1 bg-quaternary rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, 1)}
                        className="px-2 py-1 bg-quaternary rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <span>|</span>
                    <button
                      className="text-red-500 flex items-center gap-1 hover:underline"
                      onClick={() => handleRemove(item.productId)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                    <span>|</span>
                    <button className="hover:underline">Save for later</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Fixed Overview Panel */}
      {cartItems.length > 0 && (
        <div className="lg:w-[300px] xl:w-[340px] flex-shrink-0 sticky top-[100px] h-fit">
          <div className="bg-white border p-5 rounded-2xl flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="flex justify-between text-sm">
              <span>Total Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Total Price:</span>
              <span className="text-primary font-semibold">₹{totalAmount.toFixed(2)}</span>
            </div>
            <button
              className="mt-4 bg-primary hover:bg-secondary text-white py-2 rounded-md text-sm transition"
              onClick={() => toast.success("Proceeding to checkout...")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
