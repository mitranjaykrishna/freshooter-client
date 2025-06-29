import  { useEffect, useState } from 'react';
import logo from "../assets/logo.png";

const Checkout = () => {
  const [userData, setUserData] = useState({
    phone: { value: "", errorStatus: false, errorMessage: "" },
    firstName: { value: "", errorStatus: false, errorMessage: "" },
    lastName: { value: "", errorStatus: false, errorMessage: "" },
    email: { value: "", errorStatus: false, errorMessage: "" },
    addressLine1: { value: "", errorStatus: false, errorMessage: "" },
    addressLine2: { value: "", errorStatus: false, errorMessage: "" },
    nearLandMark: { value: "", errorStatus: false, errorMessage: "" },
    city: { value: "", errorStatus: false, errorMessage: "" },
    state: { value: "", errorStatus: false, errorMessage: "" },
    pincode: { value: "", errorStatus: false, errorMessage: "" },
    country: { value: "", errorStatus: false, errorMessage: "" },
  });

  const handleInput = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        errorStatus: false,
        errorMessage: ""
      }
    }));
  };

  const proceed = () => {
    const requiredFields = ["firstName","lastName", "email", "phone", "addressLine1", "city", "state", "pincode", "country"];
    for (let field of requiredFields) {
      if (!userData[field].value) {
        setUserData((prev) => ({
          ...prev,
          [field]: {
            ...prev[field],
            errorStatus: true,
            errorMessage: `Enter valid ${field}`,
          },
        }));
        return;
      }
    }

    const paymentOptions = {
      key: "rzp_test_YourTestKey", 
      amount: 205000, // ₹2050 in paise
      currency: "INR",
      name: "Kalakaaar Store",
      description: "Checkout Payment",
      image: logo,
      handler: function (response) {
        alert("Payment successful!");
        console.log("Payment success:", response);
      },
      prefill: {
        name: `${userData.firstName.value} ${userData.lastName.value}`,
        email: userData.email.value,
        contact: userData.phone.value,
      },
      notes: {
        address: `${userData.addressLine1.value}, ${userData.city.value}`,
      },
      theme: {
        color: "#429686",
      },
    };

    const rzp = new window.Razorpay(paymentOptions);
    rzp.open();

    rzp.on("payment.failed", function (response) {
      console.error("Payment failed", response.error);
      alert("Payment Failed. Please try again.");
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="pt-[20px] px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2 bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["firstName", "First Name", "text"],
              ["lastName", "Last Name", "text"],
              ["email", "Email", "email"],
              ["phone", "Phone", "tel"],
              ["addressLine1", "Address Line 1", "text"],
              ["addressLine2", "Address Line 2", "text"],
              ["nearLandMark", "Near Landmark", "text"],
              ["city", "City", "text"],
              ["state", "State", "text"],
              ["pincode", "Pincode", "text"],
              ["country", "Country", "text"],
            ].map(([key, label, type], i) => (
              <div key={key} className={`${i >= 2 && i <= 4 ? "md:col-span-2" : ""}`}>
                <label className="block mb-1 font-medium">{label}</label>
                <input
                  type={type}
                  className={`w-full border rounded p-2 ${userData[key].errorStatus ? "border-red-500" : ""}`}
                  value={userData[key].value}
                  onChange={(e) => handleInput(key, e.target.value)}
                  placeholder={label}
                />
                {userData[key].errorStatus && (
                  <p className="text-sm text-red-600 mt-1">{userData[key].errorMessage}</p>
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Product 1</span>
              <span>₹1,200</span>
            </div>
            <div className="flex justify-between">
              <span>Product 2</span>
              <span>₹800</span>
            </div>
            <hr />
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>₹2,000</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹50</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹2,050</span>
            </div>
          </div>

          <button
            onClick={proceed}
            className="mt-6 w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg transition duration-200"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
