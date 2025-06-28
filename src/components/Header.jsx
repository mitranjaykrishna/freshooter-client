import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
} from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";
import { StaticRoutes } from "../utils/StaticRoutes";

export default function Header() {
  const navigate = useNavigate();
   const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleProfileToggle = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleProfileNavigate = (path) => {
    navigate(path);
    setIsProfileMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-tertiary from-2% to-primary text-white shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-[220px]">
          {/* Logo */}
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              Freshooter
            </span>
          </div>

          {/* Buttons + Search aligned right in desktop */}
          <div className="hidden md:flex items-center space-x-4 ml-auto relative">
            {/* Search Bar */}
            <div className="w-[26rem]">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-3 py-1 rounded-md text-black border border-transparent ring-1 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Wishlist + Cart */}
            <button
              onClick={() => navigate(StaticRoutes.wishlist)}
              className="text-white text-2xl hover:text-secondary"
            >
              <AiOutlineHeart />
            </button>
            <button
              onClick={() => navigate(StaticRoutes.cart)}
              className="text-white text-2xl hover:text-secondary"
            >
              <AiOutlineShoppingCart />
            </button>

            {/* Profile */}
            <div className="relative">
              <button className="text-white text-2xl hover:text-secondary" onClick={handleProfileToggle}>
                <AiOutlineUser />
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleProfileNavigate(StaticRoutes.profile)}
                  >
                    Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleProfileNavigate(StaticRoutes.orders)}
                  >
                    Orders
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleProfileNavigate("/logout")}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <AiOutlineClose className="text-2xl" />
              ) : (
                <AiOutlineMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search bar on mobile - placed below header */}
      {location.pathname === "/" && (
        <div className="block md:hidden px-4 pt-2 bg-white shadow-sm">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-3 py-2 rounded-md text-black border ring-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary text-white px-4 py-4 space-y-2">
          <button
            onClick={() => {
              navigate(StaticRoutes.wishlist);
              setIsMobileMenuOpen(false);
            }}
            className="text-2xl block"
          >
            <AiOutlineHeart />
          </button>
          <button
            onClick={() => {
              navigate(StaticRoutes.cart);
              setIsMobileMenuOpen(false);
            }}
            className="text-2xl block"
          >
            <AiOutlineShoppingCart />
          </button>
          <button
            onClick={() => {
              navigate(StaticRoutes.profile);
              setIsMobileMenuOpen(false);
            }}
            className="text-2xl block"
          >
            <AiOutlineUser />
          </button>
          <button
            onClick={() => {
              navigate(StaticRoutes.orders);
              setIsMobileMenuOpen(false);
            }}
            className="hover:underline text-sm block"
          >
            Orders
          </button>
          <button
            onClick={() => {
              navigate("/logout");
              setIsMobileMenuOpen(false);
            }}
            className="hover:underline text-sm block"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
