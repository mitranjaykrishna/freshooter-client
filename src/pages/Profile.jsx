'use client';

import { useState, useEffect } from 'react';
import { LogOut, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from '../components/Buttons/ButtonPrimary';

export default function Profile() {
    const [user, setUser] = useState({
        name: 'Vaishnavi Dwivedi',
        email: 'vaishnavi@example.com',
        avatar: 'https://i.pravatar.cc/150?img=32',
        address: '123, Green Avenue, Indore, India',
    });

    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logged out');
    };

    const goToOrders = () => {
        navigate('/orders');
    };

    return (
        <div className="mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-primary">My Profile</h1>

            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white shadow rounded-2xl p-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-[#429686] flex items-center justify-center text-3xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Address Section */}
                <div className="bg-white shadow rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                    <p className="text-gray-600">{user.address}</p>
                </div>

                {/* Recent Orders Section */}
                <div className="bg-white shadow rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
                    <ul className="text-gray-700 list-disc ml-5">
                        <li>#123456 - Delivered</li>
                        <li>#123457 - Shipped</li>
                        <li>#123458 - Processing</li>
                    </ul>
                </div>
            </div>

            {/* My Orders Card - Redirect */}
            <div className="mt-10">
                <div
                    onClick={goToOrders}
                    className="flex items-center gap-4 bg-white shadow hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out rounded-2xl p-6 cursor-pointer"
                >
                    <div className="bg-primary/10 p-3 rounded-full">
                        <Package className="text-primary w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-primary">My Orders</h3>
                        <p className="text-sm text-gray-600">View all your past and current orders</p>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="mt-8 text-center">
                <div
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white flex items-center p-3 w-max rounded gap-2"
                >
                    <LogOut size={16} /> Logout
                </div>
            </div>
        </div>
    );
}
