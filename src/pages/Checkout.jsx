import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import { StaticApi } from "../utils/StaticApi";
import { services } from "../utils/services";
import { toast } from "react-toastify";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("card");
const [showAddAddress, setShowAddAddress] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [editIndex, setEditIndex] = useState(null);
const [addressList, setAddressList] = useState([]);
const [selectedAddress, setSelectedAddress] = useState(null);
const [newAddress, setNewAddress] = useState({
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  phone: "",
  name: "",
  default: false,
});

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    error: {},
  });

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
      key: "rzp_test_YourTestKey",
      amount: 138100,
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

const handleAddAddress = () => {
  // const requiredFields = ["name", "phone", "addressLine1", "city", "state", "postalCode", "country"];
  const requiredFields = [ "addressLine1", "city", "state", "postalCode", "country"];
  let isValid = true;
  let newError = {};

  requiredFields.forEach((field) => {
    if (!newAddress[field]?.trim()) {
      newError[field] = `Enter valid ${field}`;
      isValid = false;
    }
  });

  if (!isValid) {
    // setNewAddress((prev) => ({ ...prev, error: newError }));
    return;
  }

  const apiCall = editIndex !== null
    ? services.put(`${StaticApi.updateAddress}/${newAddress.addressId}`, newAddress)
    : services.post(StaticApi.createAddress, newAddress);

  apiCall
    .then(() => {
      toast.success(`Address ${editIndex !== null ? "updated" : "added"} successfully`);
      setShowAddAddress(false);
      setIsEditing(false);
      setEditIndex(null);
      setNewAddress({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phone: "",
        name: "",
        default: false,
      });
      getAllAddress(); // Refresh address list
    })
    .catch(() => {
      toast.error(`Failed to ${editIndex !== null ? "update" : "add"} address`);
    });
};


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const getAllAddress =() =>{
 services
    .get(`${StaticApi.getAllAddressesOfUser}`)
    .then((res) => {
      const data = res?.data || [];

      // Filter out any address where state, city, or postalCode is an empty string
      const filteredAddresses = data.filter(
        (address) =>
          address.state?.trim() !== "" &&
          address.city?.trim() !== "" &&
          address.postalCode?.trim() !== ""
      );

      setAddressList(filteredAddresses);
      setSelectedAddress(null);
    })
    .catch(() => toast.error("Failed to fetch addresses"));
  }


useEffect(() => {
 getAllAddress()
}, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {/* Address Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
        
          <div className="grid gap-4">
            {addressList.map((addr, index) => (
               <AddressCard
    key={index}
    address={addr}
    selected={selectedAddress === index}
    onChange={() => setSelectedAddress(index)}
    onEdit={(addr) => {
      setIsEditing(true);
      setEditIndex(index);
      setNewAddress(addr); // prefill
      setShowAddAddress(true);
    }}
  />
            ))}
             <div
            onClick={() => setShowAddAddress(true)}
            className="cursor-pointer w-max inline-flex items-center gap-2 text-primary font-semibold border p-3 rounded hover:bg-gray-50"
          >
            <span className="text-2xl">➕</span> Add Address
          </div>
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
          <ButtonPrimary label="Use this payment method" onClick={handlePayment} />
        </div>
      </div>

      {/* Modal for Adding Address */}
 {showAddAddress && (
  <div className="fixed inset-0 z-50 backdrop-blur-sm  bg-opacity-40 flex items-center justify-center">
    <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-lg h-[64vh] overflow-hidden">
      <button
        onClick={() => {
          setShowAddAddress(false);
          setIsEditing(false);
          setEditIndex(null);
        }}
        className="absolute top-2 right-4 text-gray-600 hover:text-black text-xl"
      >
        ✕
      </button>
      <h3 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Address" : "Add New Address"}
      </h3>

      <div className="grid grid-cols-1 gap-3 overflow-y-auto h-[calc(60vh-4rem)] pr-2">
        {[
          ["Name", "name"],
          ["Phone", "phone"],
          ["Address Line 1", "addressLine1"],
          ["Address Line 2", "addressLine2"],
          ["City", "city"],
          ["State", "state"],
          ["Postal Code", "postalCode"],
          ["Country", "country"],
        ].map(([label, key]) => (
          <InputField
            key={key}
            label={label}
            value={newAddress[key]}
            onChange={(e) =>
              setNewAddress((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}

        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={newAddress.default}
            onChange={() =>
              setNewAddress((prev) => ({ ...prev, default: !prev.default }))
            }
          />
          Set as default
        </label>

        <ButtonPrimary
          label={isEditing ? "Update Address" : "Save Address"}
          handleOnClick={handleAddAddress}
        />
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Checkout;

// Reusable components
const AddressCard = ({ address, selected, onChange, onEdit }) => {
  return (
    <label className="block border flex justify-between items-start rounded-lg p-4 hover:border-primary transition cursor-pointer">
      <div className="flex items-start">
        <input
          type="radio"
          name="address"
          checked={selected}
          onChange={onChange}
          className="mr-3 mt-1"
        />
        <div>
          <p className="font-semibold">{address.name}</p>
          <p>{address.addressLine1}</p>
          <p>{address.city}, {address.state} - {address.postalCode}</p>
          <p className="text-sm text-gray-600">{address.phone}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(address);
        }}
        className="text-gray-500 hover:text-primary transition text-sm"
        title="Edit address"
      >
        ✏️
      </button>
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
