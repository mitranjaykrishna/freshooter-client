import React from "react";
import { useNavigate } from "react-router-dom";
import { StaticRoutes } from "../utils/StaticRoutes";
import Lottie from "lottie-react";
import successAnimation from "../assets/successAnimation.json"; // Replace with your Lottie file

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="max-w-md w-full  text-center">
        {/* Lottie Animation */}
        <div className="w-64 h-64 mx-auto mb-6">
          <Lottie
            animationData={successAnimation}
            loop={false}
            autoplay={true}
          />
        </div>

        {/* Thank You Message */}
        <h1 className="text-3xl font-bold text-green-600 mb-3">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. We've sent a confirmation to
          your email.
        </p>

        {/* Order Details
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
          <p className="font-medium mb-2">Order Summary:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Order #: 123456789</li>
            <li>• Estimated Delivery: 2-3 business days</li>
            <li>• Payment Method: Credit Card</li>
          </ul>
        </div> */}

        {/* CTA Buttons */}
        <div className="flex sm:flex-row gap-4 justify-center items-center w-full">
          <button
            onClick={() => navigate(StaticRoutes.home)}
            className="bg-green-600 border-2 border-green-600 whitespace-nowrap w-max hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 sm:w-auto"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate(StaticRoutes.orders)}
            className="border-2 whitespace-nowrap w-max border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200 sm:w-auto"
          >
            View My Orders
          </button>
        </div>

        {/* Support Info */}
        <p className="text-sm text-gray-500 mt-8">
          Need help?{" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => navigate(StaticRoutes.contact)}
          >
            Contact our support
          </span>
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
