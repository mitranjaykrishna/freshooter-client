import React, { useEffect, useState } from "react";
import { services } from "../utils/services";
import { StaticApi } from "../utils/StaticApi";
import { toast } from "react-toastify";
import dairydumm from "../assets/dairy-dum.png";
import empty from "../assets/emptyOrders.webp";
import { useNavigate } from "react-router";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import login from "../assets/login1.png";
import { StaticRoutes } from "../utils/StaticRoutes";

export default function Orders() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await services.get(`${StaticApi.getMyOrders}`);
      console.log(res);
      setOrders(res?.data || []);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-primary">Your Orders</h1>

      {!isLoggedIn ? (
        <div className="text-center  text-primary text-lg font-medium">
          Please log in to view your cart.
          <div className="w-max flex self-center justify-self-center mt-4">
            {" "}
            <ButtonPrimary
              label="Login "
              handleOnClick={() => navigate(StaticRoutes.signin)}
            />{" "}
          </div>{" "}
          <img src={login} alt="login" className="w-full object-cover" />
        </div>
      ) : loading ? (
        <p className="text-center py-10 text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 text-gray-500 flex flex-col justify-center items-center">
          {" "}
          <div className="w-max gap-[20px] flex flex-col justify-center items-center">
            {" "}
            <p className="text-centers text-primary font-semibold text-lg">
              No Orders Found
            </p>{" "}
            <ButtonPrimary
              label="Explore Products"
              handleOnClick={() => navigate("/")}
            />{" "}
          </div>{" "}
          <img src={empty} alt="empty" className="w-full object-cover" />{" "}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              {/* Top Summary Bar */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 text-sm text-gray-600">
                <div className="flex gap-4 flex-wrap mb-2 md:mb-0">
                  <span>
                    <strong>ORDER PLACED</strong>: {order.orderDate}
                  </span>
                  <span>
                    <strong>TOTAL</strong>: ₹{order.total || 0}
                  </span>
                  <span>
                    <strong>SHIP TO</strong>: Vaishnavi
                  </span>
                </div>
                <div className="text-sm text-right">
                  <span className="block">
                    <strong>ORDER #</strong> {order.orderId}
                  </span>
                  <div className="text-blue-600 underline cursor-pointer mt-1">
                    View order details
                  </div>
                </div>
              </div>

              {/* Delivery Status or Cancelled */}
              <div className="mt-4 text-sm">
                {order.status === "Delivered" && (
                  <>
                    <p className="text-green-600 font-semibold">
                      Delivered {order.deliveryDate}
                    </p>
                    <p className="text-gray-600">
                      Package was handed to resident
                    </p>
                  </>
                )}
                {order.status === "Cancelled" && (
                  <>
                    <p className="text-red-600 font-bold text-lg">Cancelled</p>
                    <p className="text-sm text-gray-700 mt-1">
                      If you have been charged, a refund will be processed and
                      will be available to you in the next 3–5 business days
                    </p>
                  </>
                )}
              </div>

              {/* Product Info (always show even if cancelled) */}
              {order.items.map((item) => (
                <div
                  key={item.productCode}
                  className="flex gap-4 py-4 border-b last:border-none"
                >
                  <img
                    src={item.imageUrl || dairydumm}
                    alt={item.productName}
                    className="w-[100px] h-[100px] object-contain rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-primary">
                      {item.productName}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>
                    {order.status === "Delivered" && (
                      <p className="text-xs text-gray-400 mt-1">
                        Return window closed on {order.returnWindow}
                      </p>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-green-700">
                    ₹{item.totalPrice}
                  </div>
                </div>
              ))}

              {/* Action Buttons */}
              {order.status === "Delivered" && (
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="bg-[#4296879a] text-black font-medium px-4 py-1.5 rounded-md text-sm hover:bg-yellow-300"
                  >
                    Buy Again
                  </button>
                  <button className="bg-[#ff9933] text-black font-medium px-4 py-1.5 rounded-md text-sm hover:bg-yellow-300">
                    Get product support
                  </button>
                  <button className="border px-4 py-1.5 rounded-md text-sm hover:bg-gray-100">
                    Track package
                  </button>
                  <button className="border px-4 py-1.5 rounded-md text-sm hover:bg-gray-100">
                    Leave seller feedback
                  </button>
                  <button className="border px-4 py-1.5 rounded-md text-sm hover:bg-gray-100">
                    Write a product review
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
