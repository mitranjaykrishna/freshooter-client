import React, { useEffect, useState } from "react";
import { services } from "../utils/services";
import { StaticApi } from "../utils/StaticApi";
import { toast } from "react-toastify";
import dairydumm from "../assets/dairy-dum.png";

export default function Orders() {
    const [orders, setOrders] = useState([{
        orderId: "ORD123456",
        orderDate: "28 June 2025",
        status: "Delivered", // or "Shipped", "Pending"
        items: [
            {
                productId: 11,
                productName: "Electric Iron",
                imageUrl: null,
                quantity: 1,
                totalPrice: 780
            },
            {
                productId: 12,
                productName: "Water Bottle",
                imageUrl: null,
                quantity: 2,
                totalPrice: 200
            }
        ]
    }]);
    const [loading, setLoading] = useState(false);
    const userID = localStorage.getItem("userID");

    const getOrders = async () => {
        if (!userID) return toast.error("User not logged in.");
        setLoading(true);
        try {
            const res = await services.post(`${StaticApi.getUserOrders}?userId=${userID}`);
            setOrders(res?.data?.data || []);
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
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20 2xl:px-[220px] py-6">
            <div className="bg-white rounded-xl p-5 border">
                <h1 className="text-2xl font-bold mb-4 text-primary">Your Orders</h1>

                {loading ? (
                    <p className="text-center text-gray-500 py-10">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-center text-gray-600 py-10">No orders found.</p>
                ) : (
                    <div className="flex flex-col gap-6">
                        {orders.map((order) => (
                            <div
                                key={order.orderId}
                                className="border rounded-lg p-4 flex flex-col gap-4 shadow-sm"
                            >
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Order ID: <span className="text-gray-800 font-medium">{order.orderId}</span></span>
                                    <span>Placed on: {order.orderDate}</span>
                                </div>

                                {/* Products */}
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.productId}
                                            className="flex gap-4 border rounded-md p-3"
                                        >
                                            <img
                                                src={item.imageUrl || dairydumm}
                                                alt={item.productName}
                                                className="w-[80px] h-[80px] object-cover rounded"
                                            />
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <h2 className="font-semibold text-sm text-primary">{item.productName}</h2>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <span className="text-sm font-medium text-green-600">
                                                    ₹{item.totalPrice}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Summary */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 gap-2">
                                    <span className="text-sm">
                                        Status:{" "}
                                        <span className={`font-semibold ${order.status === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>
                                            {order.status}
                                        </span>
                                    </span>
                                    <div className="flex gap-3">
                                        <button className="px-4 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-secondary transition">
                                            Track Order
                                        </button>
                                        <button className="px-4 py-1.5 border text-sm rounded-md hover:bg-gray-100 transition">
                                            Invoice
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
