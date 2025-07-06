import  { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import ButtonPrimary from '../components/Buttons/ButtonPrimary';

const Checkout = () => {
   const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("card");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    error: {},
  });

  const addressList = [
    {
      name: "Vaishnavi",
      line1: "House number 13, Kamla nagar",
      city: "Mehoni",
      state: "Madhya Pradesh",
      pincode: "453441",
      phone: "7971869455",
    },
    // Add more addresses here
  ];

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const required = ["firstName", "lastName", "email", "phone"];
    let isValid = true;
    let newError = {};
    required.forEach((field) => {
      if (!userData[field]) {
        newError[field] = `Enter valid ${field}`;
        isValid = false;
      }
    });
    setUserData((prev) => ({ ...prev, error: newError }));
    return isValid;
  };

  const handlePayment = () => {
    if (!validate()) return;

    const options = {
      key: "rzp_test_YourTestKey", // Replace with your test key
      amount: 138100, // ₹1381 * 100 in paise
      currency: "INR",
      name: "Kalakaaar Store",
      description: "Order Payment",
      image: logo,
      handler: (response) => {
        alert("Payment Successful!");
        console.log("Payment response", response);
      },
      prefill: {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        contact: userData.phone,
      },
      theme: {
        color: "#429686",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {/* Address Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Select a delivery address</h2>
        <div className="grid gap-4">
          {addressList.map((addr, index) => (
            <AddressCard
              key={index}
              address={addr}
              selected={selectedAddress === index}
              onChange={() => setSelectedAddress(index)}
            />
          ))}
        </div>
      </div>

      {/* Payment Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment method</h2>
        <div className="grid gap-4">
          <PaymentMethodCard
            label="Credit or Debit Card"
            selected={selectedPayment === "card"}
            onChange={() => setSelectedPayment("card")}
          />
          <PaymentMethodCard
            label="UPI"
            selected={selectedPayment === "upi"}
            onChange={() => setSelectedPayment("upi")}
          />
          <PaymentMethodCard
            label="Cash on Delivery"
            selected={selectedPayment === "cod"}
            onChange={() => setSelectedPayment("cod")}
          />
        </div>
      </div>

      {/* User Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            value={userData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            error={userData.error.firstName}
          />
          <InputField
            label="Last Name"
            value={userData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            error={userData.error.lastName}
          />
          <InputField
            label="Email"
            value={userData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={userData.error.email}
          />
          <InputField
            label="Phone"
            value={userData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            error={userData.error.phone}
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <OrderItem name="OnePlus Nord Buds" price={1381} />
        <PriceSummary subtotal={1381} shipping={0} />

        <div className="mt-6">
          <ButtonPrimary label='Use this payment method' onClick={handlePayment}></ButtonPrimary>
        </div>
      </div>
    </div>
  );
};


export default Checkout;
const AddressCard = ({ address, selected, onChange }) => {
  return (
    <label className="block border rounded-lg p-4 hover:border-primary transition cursor-pointer">
      <input
        type="radio"
        name="address"
        checked={selected}
        onChange={onChange}
        className="mr-3"
      />
      <div>
        <p className="font-semibold">{address.name}</p>
        <p>{address.line1}</p>
        <p>{address.city}, {address.state} - {address.pincode}</p>
        <p className="text-sm text-gray-600">{address.phone}</p>
      </div>
    </label>
  );
};

const PaymentMethodCard = ({ label, selected, onChange, children }) => {
  return (
    <label className="block border rounded-lg p-4 cursor-pointer hover:border-primary transition">
      <input type="radio" name="payment" checked={selected} onChange={onChange} className="mr-3" />
      <span className="font-medium">{label}</span>
      {children && <div className="mt-2">{children}</div>}
    </label>
  );
};

const OrderItem = ({ name, price }) => (
  <div className="flex justify-between">
    <span>{name}</span>
    <span>₹{price}</span>
  </div>
);

const PriceSummary = ({ subtotal, shipping }) => {
  const total = subtotal + shipping;
  return (
    <div className="space-y-3 mt-4">
      <div className="flex justify-between font-medium">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>₹{shipping}</span>
      </div>
      <hr />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
};

const InputField = ({ label, type = "text", value, onChange, error }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full border rounded p-2 ${error ? "border-red-500" : ""}`}
      placeholder={label}
    />
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

