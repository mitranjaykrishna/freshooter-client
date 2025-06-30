import React, { useEffect, useState } from "react";
import { services } from "../utils/services";
import { StaticApi } from "../utils/StaticApi";
import { toast } from "react-toastify";
import dairydumm from "../assets/dairy-dum.png";
import { useNavigate } from "react-router";

export default function Orders() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([
        {
            orderId: "ORD123456",
            orderDate: "28 May 2025",
            status: "Delivered",
            deliveryDate: "3 June",
            returnWindow: "13 June 2025",
            total: 1804,
            items: [
                {
                    productCode: 11,
                    productName: "OnePlus Nord Buds 2r True Wireless in Ear Earbuds with Mic, 12.4mm Drivers",
                    imageUrl: null,
                    quantity: 1,
                    totalPrice: 1804,
                },
            ],
        },
        {
            orderId: "ORD123457",
            orderDate: "27 May 2025",
            status: "Cancelled",
            items: [ {
                    productCode: 11,
                    productName: "OnePlus Nord Buds 2r True Wireless in Ear Earbuds with Mic, 12.4mm Drivers",
                    imageUrl: null,
                    quantity: 1,
                    totalPrice: 1804,
                },],
        },
    ]);
    const [loading, setLoading] = useState(false);
    const userID = localStorage.getItem("userID");

    const getOrders = async () => {
        if (!userID) return toast.error("User not logged in.");
        setLoading(true);
        try {
            const res = await services.post(`${StaticApi.getUserOrders}?userId=${userID}`);
            // setOrders(res?.data?.data || []);
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

            {loading ? (
                <p className="text-center text-gray-500 py-10">Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="text-center text-gray-600 py-10">No orders found.</p>
            ) : (
                <div className="flex flex-col gap-6">
                  {orders.map((order) => (
    <div key={order.orderId} className="border rounded-lg p-4 bg-white shadow-sm">
        {/* Top Summary Bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 text-sm text-gray-600">
            <div className="flex gap-4 flex-wrap mb-2 md:mb-0">
                <span><strong>ORDER PLACED</strong>: {order.orderDate}</span>
                <span><strong>TOTAL</strong>: ₹{order.total || 0}</span>
                <span><strong>SHIP TO</strong>: Vaishnavi</span>
            </div>
            <div className="text-sm text-right">
                <span className="block"><strong>ORDER #</strong> {order.orderId}</span>
                <div className="text-blue-600 underline cursor-pointer mt-1">View order details</div>
            </div>
        </div>

        {/* Delivery Status or Cancelled */}
        <div className="mt-4 text-sm">
            {order.status === "Delivered" && (
                <>
                    <p className="text-green-600 font-semibold">Delivered {order.deliveryDate}</p>
                    <p className="text-gray-600">Package was handed to resident</p>
                </>
            )}
            {order.status === "Cancelled" && (
                <>
                    <p className="text-red-600 font-bold text-lg">Cancelled</p>
                    <p className="text-sm text-gray-700 mt-1">
                        If you have been charged, a refund will be processed and will be available to you in the next 3–5 business days
                    </p>
                </>
            )}
        </div>

        {/* Product Info (always show even if cancelled) */}
        {order.items.map((item) => (
            <div key={item.productCode} className="flex gap-4 py-4 border-b last:border-none">
                <img
                    src={item.imageUrl || dairydumm}
                    alt={item.productName}
                    className="w-[100px] h-[100px] object-contain rounded"
                />
                <div className="flex-1">
                    <p className="font-medium text-sm text-primary">{item.productName}</p>
                    <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                    {order.status === "Delivered" && (
                        <p className="text-xs text-gray-400 mt-1">
                            Return window closed on {order.returnWindow}
                        </p>
                    )}
                </div>
                <div className="text-sm font-semibold text-green-700">₹{item.totalPrice}</div>
            </div>
        ))}

        {/* Action Buttons */}
        {order.status === "Delivered" && (
            <div className="flex flex-wrap gap-3 mt-4">
                 <button onClick={()=>navigate('/checkout')} className="bg-[#4296879a] text-black font-medium px-4 py-1.5 rounded-md text-sm hover:bg-yellow-300">
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
