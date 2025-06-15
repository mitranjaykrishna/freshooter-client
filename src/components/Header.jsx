import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router";
import { StaticRoutes } from "../utils/StaticRoutes";

export default function Header() {
  const navigate = useNavigate();
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
    <div className="w-full h-16 bg-gradient-to-r from-tertiary from-2% to-primary text-white flex items-center justify-between px-[220px] relative">
      {/* Logo & Brand */}
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="w-10 h-10" />
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
          Freshooter
        </span>
      </div>

      {/* Search bar - hidden on small screens */}
      <div className="hidden sm:flex flex-1 max-w-md mx-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-3 py-1 rounded-md text-black border border-transparent ring-1 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Desktop nav + icons */}
      <div className="hidden md:flex items-center space-x-3 relative">
        <button
          onClick={() => navigate(StaticRoutes.home)}
          className="hover:underline text-sm"
        >
          Home
        </button>
        <button
          onClick={() => navigate(StaticRoutes.aboutUs)}
          className="hover:underline text-sm"
        >
          About
        </button>
        <button
          onClick={() => navigate(StaticRoutes.contactUs)}
          className="hover:underline text-sm"
        >
          Contact
        </button>
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

        {/* Profile icon with onClick menu */}
        <div className="relative">
          <button className="text-white text-2xl" onClick={handleProfileToggle}>
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

      {/* Mobile menu toggle */}
      <div className="flex md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <AiOutlineClose className="text-2xl" />
          ) : (
            <AiOutlineMenu className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile menu content */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-primary text-white flex flex-col space-y-2 p-4 md:hidden z-50">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-3 py-1 rounded-md text-black border border-transparent ring-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={() => {
              navigate(StaticRoutes.home);
              setIsMobileMenuOpen(false);
            }}
            className="hover:underline text-sm text-left"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate(StaticRoutes.aboutUs);
              setIsMobileMenuOpen(false);
            }}
            className="hover:underline text-sm text-left"
          >
            About
          </button>
          <button
            onClick={() => {
              navigate(StaticRoutes.contactUs);
              setIsMobileMenuOpen(false);
            }}
            className="hover:underline text-sm text-left"
          >
            Contact
          </button>
          <button
            onClick={() => {
              navigate(StaticRoutes.wishlist);
              setIsMobileMenuOpen(false);
            }}
            className="text-2xl text-left"
          >
            <AiOutlineHeart />
          </button>
          <button
            onClick={() => {
              navigate(StaticRoutes.cart);
              setIsMobileMenuOpen(false);
            }}
            className="text-2xl text-left"
          >
            <AiOutlineShoppingCart />
          </button>
          <button
            onClick={() => {
              navigate(StaticRoutes.profile);
              setIsMobileMenuOpen(false);
            }}
            className="hover:underline text-sm text-left"
          >
            Profile
          </button>
          <button
            onClick={() => {
              navigate(StaticRoutes.orders);
              setIsMobileMenuOpen(false);
            }}
            className="hover:underline text-sm text-left"
          >
            Orders
          </button>
          <button
            onClick={() => {
              navigate("/logout");
              setIsMobileMenuOpen(false);
            }}
            className="hover:underline text-sm text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
