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
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await services.get(`${StaticApi.getMyOrders}`);
      const formattedOrders = (res?.data || [])
        .map((order) => ({
          ...order,
          orderDateObj: new Date(order.orderDate),
          orderDate: new Date(order.orderDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          deliveryDate: order.deliveryDate
            ? new Date(order.deliveryDate).toLocaleDateString("en-IN")
            : null,
        }))
        .sort((a, b) => b.orderDateObj - a.orderDateObj);

      setOrders(formattedOrders);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const openCancelModal = (order) => {
    setSelectedOrder(order);
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setCancelReason("");
    setSelectedOrder(null);
  };

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please enter a cancellation reason");
      return;
    }

    setIsCancelling(true);
    try {
      const payload = {
        orderId: selectedOrder.orderId,
        cancellationReason: cancelReason,
      };

      await services.post(`${StaticApi.cancelOrder}`, payload);
      toast.success("Order cancelled successfully");
      closeCancelModal();
      getOrders(); // Refresh orders list
    } catch (error) {
      toast.error("Failed to cancel order");
    } finally {
      setIsCancelling(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("₹", "₹");
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      Confirmed: { color: "bg-blue-100 text-blue-800", text: "Confirmed" },
      Processing: {
        color: "bg-purple-100 text-purple-800",
        text: "Processing",
      },
      Shipped: { color: "bg-yellow-100 text-yellow-800", text: "Shipped" },
      "Out for Delivery": {
        color: "bg-orange-100 text-orange-800",
        text: "Out for Delivery",
      },
      Delivered: { color: "bg-green-100 text-green-800", text: "Delivered" },
      Cancelled: { color: "bg-red-100 text-red-800", text: "Cancelled" },
    };

    const statusInfo = statusMap[status] || {
      color: "bg-gray-100 text-gray-800",
      text: status,
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
      >
        {statusInfo.text}
      </span>
    );
  };

  const buyNow = async (orderItems) => {
    if (!orderItems || orderItems.length === 0) return;

    try {
      // Add all items to the cart
      await Promise.all(
        orderItems.map((item) =>
          services.post(
            `${StaticApi.addToCart}?productCode=${item.productCode}&quantity=${
              item.quantity || 1
            }`
          )
        )
      );

      toast.success("All items added to cart");

      // Set selected items for checkout (if needed)
      const updatedItems = orderItems.map((item) => ({
        productId: item.productId,
        productCode: item.productCode,
        name: item.name,
        imageUrl: item.imageUrl,
        price: item.price,
        quantity: item.quantity || 1,
        totalPrice: item.price * (item.quantity || 1),
      }));

      localStorage.setItem(
        "selectedCheckoutItems",
        JSON.stringify(updatedItems)
      );

      // Navigate to checkout
      navigate("/checkout");
    } catch (error) {
      toast.error("Failed to add items to cart");
      console.error("Error during buy again:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getOrders();
    }
  }, [isLoggedIn]);

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-primary">Your Orders</h1>

      {!isLoggedIn ? (
        <div className="text-center text-primary text-lg font-medium">
          Please log in to view your orders.
          <div className="w-max flex self-center justify-self-center mt-4">
            <ButtonPrimary
              label="Login"
              handleOnClick={() => navigate(StaticRoutes.signin)}
            />
          </div>
          <img src={login} alt="login" className="w-full object-cover" />
        </div>
      ) : loading ? (
        <p className="text-center py-10 text-gray-500">Loading...</p>
      ) : orders?.length === 0 ? (
        <div className="text-center py-10 text-gray-500 flex flex-col justify-center items-center">
          <div className="w-max gap-[20px] flex flex-col justify-center items-center">
            <p className="text-centers text-primary font-semibold text-lg">
              No Orders Found
            </p>
            <ButtonPrimary
              label="Explore Products"
              handleOnClick={() => navigate("/")}
            />
          </div>
          <img src={empty} alt="empty" className="w-full object-cover" />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders?.map((order) => (
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
                    <strong>TOTAL</strong>:{" "}
                    {formatCurrency(order.afterDiscountAmount)}
                  </span>
                  {order.shippingAddress && (
                    <span>
                      <strong>SHIP TO</strong>: {order.shippingAddress.name}
                    </span>
                  )}
                </div>
                <div className="text-sm text-right">
                  <span className="block">
                    <strong>ORDER #</strong> {order.orderId}
                  </span>
                  <div className="mt-1">
                    {getStatusBadge(order.orderStatus)}
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="mt-4 text-sm">
                {order.orderStatus === "Delivered" && (
                  <>
                    <p className="text-green-600 font-semibold">
                      Delivered on {order.deliveryDate}
                    </p>
                    <p className="text-gray-600">
                      Your item has been delivered
                    </p>
                  </>
                )}
                {order.orderStatus === "Cancelled" && (
                  <p className="text-red-600 font-semibold">
                    Order was cancelled
                  </p>
                )}
                {["Processing", "Shipped", "Out for Delivery"].includes(
                  order.orderStatus
                ) && (
                  <p className="text-blue-600 font-semibold">
                    {order.orderStatus === "Processing" &&
                      "Your order is being prepared"}
                    {order.orderStatus === "Shipped" &&
                      "Your order has been shipped"}
                    {order.orderStatus === "Out for Delivery" &&
                      "Your order is out for delivery"}
                  </p>
                )}
              </div>

              {/* Product Info */}
              {order?.orderItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 border-b last:border-none"
                >
                  <img
                    src={dairydumm}
                    alt="Product"
                    className="w-[100px] h-[100px] object-contain rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-primary">
                      Product #{item.productId}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Price:{" "}
                      {formatCurrency(item.afterDiscountAmount / item.quantity)}{" "}
                      each
                    </p>
                    {order.orderStatus === "Delivered" && (
                      <p className="text-xs text-gray-400 mt-1">
                        Return window closes on{" "}
                        {order.deliveryDate
                          ? new Date(order.deliveryDate)
                              .setDate(
                                new Date(order.deliveryDate).getDate() + 7
                              )
                              .toLocaleDateString()
                          : "N/A"}
                      </p>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-green-700">
                    {formatCurrency(item.afterDiscountAmount)}
                  </div>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                {/* {order.orderStatus === "Delivered" && ( */}
                <>
                  <div
                    onClick={() => buyNow(order.orderItems)}
                    className="bg-[#4296879a] text-black font-medium py-[10px] px-[10px] cursor-pointer flex items-center justify-center rounded-md text-sm hover:bg-yellow-300 max-h"
                  >
                    Buy Again
                  </div>
                  <div
                    onClick={() => navigate(StaticRoutes.terms)}
                    className="bg-[#ff9933] text-black font-medium px-[10px] py-[10px] cursor-pointer rounded-md text-sm hover:bg-yellow-300 flex items-center justify-center max-h"
                  >
                    Get product support
                  </div>
                  <div
                    onClick={() => returnOrder(order)}
                    className="bg-blue-500 text-white font-medium px-[10px] py-[10px] cursor-pointer rounded-md text-sm hover:bg-blue-600 flex items-center justify-center max-h"
                  >
                    Return
                  </div>
                  <div
                    onClick={() => exchangeOrder(order)}
                    className="bg-purple-500 text-white font-medium px-[10px] py-[10px] cursor-pointer rounded-md text-sm hover:bg-purple-600 flex items-center justify-center max-h"
                  >
                    Exchange
                  </div>
                </>
                {/* )} */}
                {!["Delivered", "Cancelled"].includes(order.orderStatus) && (
                  <button
                    onClick={() => openCancelModal(order)}
                    className="border border-red-500 text-red-500 font-medium p-[5px] rounded-md text-sm hover:bg-red-50"
                  >
                    Cancel Order
                  </button>
                )}
                <button className="border px-4 py-1.5 rounded-md text-sm hover:bg-gray-100">
                  View Invoice
                </button>
                {order.orderStatus === "Shipped" && (
                  <button className="border px-4 py-1.5 rounded-md text-sm hover:bg-gray-100">
                    Track Package
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Order Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-gray-800/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Cancel Order #{selectedOrder?.orderId}
              </h3>
              <button
                onClick={closeCancelModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="mb-2">Items in this order:</p>
              <ul className="max-h-40 overflow-y-auto border rounded p-2">
                {selectedOrder?.orderItems?.map((item) => (
                  <li key={item.id} className="py-1 border-b last:border-b-0">
                    Product #{item.productId} (Qty: {item.quantity})
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cancellation Reason *
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full border rounded-md p-2 h-24"
                placeholder="Please specify why you're cancelling this order..."
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeCancelModal}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                disabled={isCancelling}
              >
                Back
              </button>
              <button
                onClick={handleCancelOrder}
                className={`px-4 py-2 rounded-md text-white ${
                  isCancelling ? "bg-red-400" : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={isCancelling}
              >
                {isCancelling ? "Cancelling..." : "Confirm Cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
