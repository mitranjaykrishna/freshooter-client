import React, { useEffect, useState } from "react";
import { services } from "../utils/services";
import { StaticApi } from "../utils/StaticApi";
import { toast } from "react-toastify";
import dairydumm from "../assets/dairy-dum.png";
import { Trash2, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router";

export default function Cart() {
  const [cartItems, setCartItems] = useState([{
    id: 3,
    productCode: 11,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }, {
    id: 1,
    productCode: 12,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }, {
    id: 4,
    productCode: 31,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }, {
    id: 3,
    productCode: 11,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }, {
    id: 1,
    productCode: 12,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }, {
    id: 4,
    productCode: 31,
    productName: "Electric Iron",
    imageUrl: null,
    quantity: 1,
    totalPrice: 780
  }]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate()
  const userID = localStorage.getItem("userID");

  const getCartItems = () => {
    setLoading(true);
    services
      .post(`${StaticApi.getUserCart}?userId=${userID}`)
      .then((res) => {
        const data = res?.data?.data || [];
        setCartItems(data);
        setSelectedItems(data.map((item) => item.productCode)); // initially select all
      })
      .catch(() => toast.error("Failed to fetch cart items"))
      .finally(() => setLoading(false));
  };

  const handleQuantityChange = (productCode, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productCode === productCode
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemove = (productCode) => {
    services
      .delete(`${StaticApi.removeFromCart}?userId=${userID}&productCode=${productCode}`)
      .then(() => {
        toast.success("Item removed");
        setCartItems((prev) => prev.filter((item) => item.productCode !== productCode));
        setSelectedItems((prev) => prev.filter((id) => id !== productCode));
      })
      .catch(() => toast.error("Failed to remove item"));
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.productCode));
    }
  };

  const toggleItemSelect = (productCode) => {
    if (selectedItems.includes(productCode)) {
      setSelectedItems((prev) => prev.filter((id) => id !== productCode));
    } else {
      setSelectedItems((prev) => [...prev, productCode]);
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      selectedItems.includes(item.productCode)
        ? sum + item.totalPrice * item.quantity
        : sum,
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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold  text-primary">Shopping Cart</h1>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedItems.length === cartItems.length}
                onChange={toggleSelectAll}
                className="w-5 h-5"
              />
              Select All
            </label>
          </div>

          {loading ? (
            <p className="text-center py-10 text-gray-500">Loading...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center py-10 text-primary font-semibold text-lg">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.productCode}
                className="flex flex-col sm:flex-row items-center gap-4 border-b py-4"
              >
                <div className="relative w-full flex-shrink-0 sm:hidden">
                  <input
                    type="checkbox"
                    className="absolute top-1 left-1 w-4 h-4"
                    checked={selectedItems.includes(item.productCode)}
                    onChange={() => toggleItemSelect(item.productCode)}
                  />
                  <img
                    src={item.imageUrl || dairydumm}
                    alt={item.productName}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={selectedItems.includes(item.productCode)}
                    onChange={() => toggleItemSelect(item.productCode)}
                  />
                  <div className="w-[100px] h-[100px] flex-shrink-0">
                    <img
                      src={item.imageUrl || dairydumm}
                      alt={item.productName}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
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

                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 flex-wrap">
                    <div className="flex items-center gap-2 bg-quaternary px-2 py-1 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.productCode, -1)}
                        disabled={item.quantity === 1}
                        className={`p-1 rounded-md ${item.quantity === 1
                          ? "cursor-not-allowed text-gray-400"
                          : "hover:bg-gray-300"
                          }`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productCode, 1)}
                        className="p-1 rounded-md hover:bg-gray-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <span>|</span>
                    <button
                      className="text-red-500 flex items-center gap-1 hover:underline"
                      onClick={() => handleRemove(item.productCode)}
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
          <div className="bg-white border p-5 rounded-2xl flex flex-col gap-4 max-h-[500px] overflow-y-auto">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="flex justify-between text-sm">
              <span>Total Selected:</span>
              <span>{selectedItems.length}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Total Price:</span>
              <span className="text-primary font-semibold">₹{totalAmount.toFixed(2)}</span>
            </div>
            <button
              className="mt-4 bg-primary hover:bg-secondary text-white py-2 rounded-md text-sm transition"
              onClick={() => navigate("/checkout")}
              disabled={selectedItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
