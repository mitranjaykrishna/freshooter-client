import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-primary text-black text-sm">
      {/* Top policies row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-b border-gray-300 py-4">
        <a href="/terms" className="flex flex-col items-center ">
          <span className="text-orange-600 text-2xl">📄</span>
          <span> Terms & Conditions</span>
        </a>
        <a href="/returns" className="flex flex-col items-center ">
          <span className="text-orange-600 text-2xl">↩️</span>
          Return Policy
        </a>
        <a href="/support" className="flex flex-col items-center ">
          <span className="text-orange-600 text-2xl">🛟</span>
          Support Policy
        </a>
        <a href="/privacy" className="flex flex-col items-center ">
          <span className="text-orange-600 text-2xl">❗</span>
          Privacy Policy
        </a>
      </div>

      {/* Middle content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-6 px-4">
        {/* Logo + Subscribe + App buttons */}
        <div>
          <h2 className="text-xl font-bold mb-2">Freshooter</h2>
          <div className="flex mb-3">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full p-2 rounded-l border border-gray-300"
            />
            <button className="bg-orange-600 text-white px-4 rounded-r">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Info</h2>
          <p>Phone: [+91] 985463215</p>
          <p>Email: info@freshooter.com</p>
        </div>

        {/* Our Stores + Payments */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Our Stores</h2>
          <ul className="mb-3">
            <li>Addanki</li>
            <li>Eluru</li>
            <li>Guntur</li>
            <li>Hyderabad</li>
            <li>Vijayawada</li>
          </ul>
          <div className="flex flex-wrap gap-2">
            <img
              src="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://seeklogo.com/images/M/mastercard-logo-5E5CD2E1E0-seeklogo.com.png"
              alt="Mastercard"
              className="h-6"
            />
            <img
              src="https://seeklogo.com/images/R/rupay-logo-0F0C69B4D6-seeklogo.com.png"
              alt="RuPay"
              className="h-6"
            />
            <img
              src="https://seeklogo.com/images/A/american-express-logo-B131554071-seeklogo.com.png"
              alt="Amex"
              className="h-6"
            />
            {/* Add more logos as needed */}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-primary py-3 text-center border-t border-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Freshooter. All Rights Reserved.
          </p>
          <div className="flex space-x-3 mt-2 md:mt-0 text-lg">
            <a href="#" className="hover:text-orange-600">
              <AiOutlineFacebook />
            </a>
            <a href="#" className="hover:text-orange-600">
              <AiOutlineTwitter />
            </a>
            <a href="#" className="hover:text-orange-600">
              <AiOutlineInstagram />
            </a>
            <a href="#" className="hover:text-orange-600">
              <AiOutlineYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
