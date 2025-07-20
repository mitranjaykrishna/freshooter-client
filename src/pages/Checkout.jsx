// --- Imports ---
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import amex from "../assets/amex.png";
import mastercard from "../assets/mastercard.png";
import rupay from "../assets/rupay.png";
import visa from "../assets/visa.png";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import { StaticApi } from "../utils/StaticApi";
import { services } from "../utils/services";
import { StaticRoutes } from "../utils/StaticRoutes";
import { useNavigate } from "react-router";
// --- Checkout Component ---
const Checkout = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [wasLastItemDeleted, setWasLastItemDeleted] = useState(false);
  const [upiId, setUpiId] = useState("");
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

  const subtotal = checkoutProducts?.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  const handlePayment = () => {
    if (selectedAddress === null) {
      toast.error("Please select a delivery address");
      return;
    }

    services
      .post(StaticApi.placeOrder, {
        address: addressList[selectedAddress],
        // paymentMethod: selectedPayment,
        selectProductCodes: checkoutProducts.map((p) => p.productCode), // send selected products here
      })
      .then(() => {
        toast.success("Order placed successfully");
        localStorage.removeItem("selectedCheckoutItems"); // Clear after placing order
        // Optionally redirect to thank-you page
      })
      .catch(() => {
        toast.error("Failed to place order");
      });
  };

  const handleAddAddress = () => {
    const requiredFields = [
      "addressLine1",
      "city",
      "state",
      "postalCode",
      "country",
    ];
    let isValid = true;
    let newError = {};

    requiredFields.forEach((field) => {
      if (!newAddress[field]?.trim()) {
        newError[field] = `Enter valid ${field}`;
        isValid = false;
      }
    });

    if (!isValid) return;

    const apiCall =
      editIndex !== null
        ? services.put(
            `${StaticApi.updateAddress}/${newAddress.addressId}`,
            newAddress
          )
        : services.post(StaticApi.createAddress, newAddress);

    apiCall
      .then(() => {
        toast.success(
          `Address ${editIndex !== null ? "updated" : "added"} successfully`
        );
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
        getAllAddress();
      })
      .catch(() => {
        toast.error(
          `Failed to ${editIndex !== null ? "update" : "add"} address`
        );
      });
  };

  const handleDeleteAddress = (addressId) => {
    services
      .delete(`${StaticApi.deleteAddress}/${addressId}`)
      .then(() => {
        toast.success("Address deleted successfully");
        getAllAddress();
      })
      .catch(() => {});
  };

  const handleSetDefaultAddress = (addressId) => {
    services
      .post(`${StaticApi.setDefaultAddress}/${addressId}`)
      .then(() => {
        toast.success("Address updated successfully");
        getAllAddress();
      })
      .catch(() => {});
  };

  const getAllAddress = () => {
    services
      .get(`${StaticApi.getAllAddressesOfUser}`)
      .then((res) => {
        const data = res?.data || [];
        const filteredAddresses = data.filter(
          (address) =>
            address.state?.trim() !== "" &&
            address.city?.trim() !== "" &&
            address.postalCode?.trim() !== ""
        );

        setAddressList(filteredAddresses);

        const defaultIndex = filteredAddresses.findIndex(
          (addr) => addr.default
        );
        setSelectedAddress(
          defaultIndex !== -1
            ? defaultIndex
            : filteredAddresses.length > 0
            ? 0
            : null
        );
      })
      .catch(() => toast.error("Failed to fetch addresses"));
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    getAllAddress();
    const stored = localStorage.getItem("selectedCheckoutItems");
    if (stored) {
      setCheckoutProducts(JSON.parse(stored));
    }
  }, []);

  const handleDeleteCheckoutItem = (productId) => {
    const updatedItems = checkoutProducts.filter(
      (item) => item.productId !== productId
    );
    setCheckoutProducts(updatedItems);

    // If only one item was left before deletion, set flag to true
    if (checkoutProducts.length === 1) {
      setWasLastItemDeleted(true);
    }
  };
  useEffect(() => {
    if (checkoutProducts.length === 0 && wasLastItemDeleted) {
      navigate(StaticRoutes.home);
      localStorage.setItem("selectedCheckoutItems", JSON.stringify([]));
    }
  }, [checkoutProducts, wasLastItemDeleted]);
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {/* Address Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
        <div className="grid gap-4">
          {(showMore ? addressList : addressList.slice(0, 2)).map(
            (addr, index) => (
              <AddressCard
                key={index}
                address={addr}
                selected={selectedAddress === index}
                onChange={() => setSelectedAddress(index)}
                onEdit={(addr) => {
                  setIsEditing(true);
                  setEditIndex(index);
                  setNewAddress(addr);
                  setShowAddAddress(true);
                }}
                onDelete={() => handleDeleteAddress(addr.addressId)}
                onSetDefault={() => handleSetDefaultAddress(addr.addressId)}
              />
            )
          )}

          {addressList.length > 2 && (
            <button
              className="mt-2 text-primary underline text-sm text-left"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}

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
          <CardPaymentOption
            setShowCardModal={setShowCardModal}
            selected={selectedPayment === "card"}
            onChange={() => setSelectedPayment("card")}
          />
          <UpiInputCard
            selected={selectedPayment === "upi"}
            onChange={() => setSelectedPayment("upi")}
            upiId={upiId}
            setUpiId={setUpiId}
            onVerify={() => console.log("Verifying", upiId)}
          />
          <PaymentMethodCard
            label="Cash on Delivery"
            selected={selectedPayment === "cod"}
            onChange={() => setSelectedPayment("cod")}
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {checkoutProducts.map((item, idx) => (
          <OrderItem
            key={idx}
            item={item}
            onQuantityChange={(item, newQty) => {
              if (newQty < 1) return;

              // Update frontend immediately
              const updated = checkoutProducts.map((i) =>
                i.productId === item.productId ? { ...i, quantity: newQty } : i
              );
              setCheckoutProducts(updated);
              localStorage.setItem(
                "selectedCheckoutItems",
                JSON.stringify(updated)
              );

              // Determine quantity change (+1 or -1)
              const change = newQty - item.quantity;

              if (change > 0) {
                // Add quantity
                services
                  .post(
                    `${StaticApi.addToCart}?productCode=${item.productCode}&quantity=${change}`
                  )
                  .then(() => toast.success(`${change} item(s) added to cart`))
                  .catch(() => toast.error("Failed to update cart"));
              } else {
                // Remove quantity
                services
                  .delete(
                    `${StaticApi.removeSingleItemCart}?productCode=${
                      item.productCode
                    }&quantity=${-change}`
                  )
                  .then(() =>
                    toast.success(`${-change} item(s) removed from cart`)
                  )
                  .catch(() => toast.error("Failed to update cart"));
              }
            }}
            onRemove={(item) => handleDeleteCheckoutItem(item.productId)}
          />
        ))}{" "}
        <PriceSummary subtotal={subtotal} shipping={0} />
        <div className="mt-6 w-max">
          <ButtonPrimary label="Place Order" handleOnClick={handlePayment} />
        </div>
      </div>

      {/* Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-gray-400/50 bg-opacity-40 flex items-center justify-center">
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
                ["Name", "userName"],
                ["Phone", "userNumber"],
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
                    setNewAddress((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                />
              ))}

              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={newAddress.default}
                  onChange={() =>
                    setNewAddress((prev) => ({
                      ...prev,
                      default: !prev.default,
                    }))
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

      {showCardModal && (
        <AddCardModal
          onClose={() => setShowCardModal(false)}
          onSubmit={(cardData) => {
            console.log("New Card:", cardData);
            setShowCardModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Checkout;

// --- Reusable Components ---
const AddressCard = ({
  address,
  selected,
  onChange,
  onEdit,
  onDelete,
  onSetDefault,
}) => (
  <label
    className={`block border flex justify-between items-start rounded-lg p-4 transition cursor-pointer ${
      selected ? "border-primary bg-green-50" : "hover:border-primary"
    }`}
  >
    <div className="flex items-start gap-3">
      <input
        type="radio"
        name="address"
        checked={selected}
        onChange={onChange}
        className="mt-1"
      />
      <div>
        <p className="font-semibold">
          {address.userName ? address.userName : "N/A"} - {address.userNumber}
        </p>
        <p>{address.addressLine1}</p>
        <p>
          {address.city}, {address.state} - {address.postalCode}
        </p>
        <p className="text-sm text-gray-600">{address.phone}</p>

        {address.default ? (
          <span className="text-sm font-semibold text-green-600 mt-2 inline-block">
            ★ Default Address
          </span>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSetDefault(address);
            }}
            className="text-sm text-blue-600 hover:underline mt-2"
          >
            Set as Default
          </button>
        )}
      </div>
    </div>

    <div className="flex items-end gap-2">
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
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(address);
        }}
        className="text-red-500 hover:text-red-700 transition text-sm"
        title="Delete address"
      >
        🗑️
      </button>
    </div>
  </label>
);

const PaymentMethodCard = ({ label, selected, onChange }) => (
  <label
    className={`block border rounded-lg p-4 cursor-pointer transition ${
      selected ? "bg-green-50 border-green-400" : ""
    }`}
  >
    <div className="flex items-center">
      <input
        type="radio"
        name="payment"
        checked={selected}
        onChange={onChange}
        className="mr-3"
      />
      <span className="font-medium">{label}</span>
    </div>
  </label>
);

const OrderItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex gap-4 border rounded p-4 mb-4 shadow-sm max-w-[50%]">
      {/* Image */}
      <img
        src={item.imageUrl}
        alt={item.productName}
        className="w-28 h-28 object-contain rounded"
      />

      {/* Details */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold">
            {item.name || item?.productName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Size: {item.size || "N/A"}
          </p>

          <p className="text-xl font-bold mt-2">
            ₹{item.price || item.totalPrice}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4">
          {/* Quantity controls */}

          <div className="inline-flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm w-max">
            <button
              className={`px-4 py-1 text-lg font-semibold transition-all ${
                item.quantity <= 1
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-primary hover:bg-gray-200"
              }`}
              onClick={() => onQuantityChange(item, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              –
            </button>

            <span className="px-5 py-1 text-base font-medium text-gray-700 bg-white select-none">
              {item.quantity}
            </span>

            <button
              className={`px-4 py-1 text-lg font-semibold transition-all ${
                item.quantity >= item?.stockQuantity
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-primary hover:bg-gray-200"
              }`}
              onClick={() => onQuantityChange(item, item.quantity + 1)}
            >
              +
            </button>
          </div>

          {/* Delete */}
          <button
            onClick={() => onRemove(item)}
            className="ml-4 text-red-600 text-xl hover:text-red-800"
            title="Remove item"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};

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

const CardPaymentOption = ({ selected, onChange, setShowCardModal }) => {
  return (
    <label
      className={`block border rounded-lg p-4 w-full cursor-pointer transition ${
        selected ? "bg-green-50 border-green-400" : ""
      }`}
    >
      <div className="flex items-center mb-1">
        <input
          type="radio"
          name="payment"
          checked={selected}
          // onChange={onChange}
          className="mr-2"
          readOnly
          disabled
        />
        <span className="font-medium text-lg">Credit or debit card</span>
      </div>

      {selected && (
        <>
          <div className="flex flex-wrap gap-2 mt-3 mb-3">
            {[visa, mastercard, amex, rupay].map((img, i) => (
              <img key={i} src={img} alt="Card" className="w-10 h-auto" />
            ))}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-blue-600 font-medium hover:underline cursor-pointer"
              onClick={() => setShowCardModal(true)}
            >
              Add a new credit or debit card
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-1">
            We accept all major credit & debit cards
          </p>
        </>
      )}
    </label>
  );
};

const AddCardModal = ({ onClose, onSubmit }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    nickname: "",
    expiryMonth: "01",
    expiryYear: "2025",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!/^\d{16}$/.test(cardDetails.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!cardDetails.nickname.trim()) {
      newErrors.nickname = "Nickname is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(cardDetails);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/55 bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-2">
      <div className="bg-white w-full max-w-3xl rounded shadow-lg p-6 relative flex flex-col sm:flex-row gap-6">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-xl text-gray-700 hover:text-black border border-gray-300 rounded-lg px-2"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Left Form */}
        <div className="flex-1">
          <h2 className="font-bold text-lg mb-4">
            Add a new credit or debit card
          </h2>
          <div className="space-y-4">
            {/* Card number */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="font-medium col-span-1">Card number</label>
              <div className="col-span-3">
                <input
                  type="text"
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                  placeholder="Enter card number"
                  className="border w-full p-2 rounded"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Nickname */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="font-medium col-span-1">Nickname</label>
              <div className="col-span-3">
                <input
                  type="text"
                  value={cardDetails.nickname}
                  onChange={(e) => handleChange("nickname", e.target.value)}
                  placeholder="Eg. Vaishnavi"
                  className="border w-full p-2 rounded"
                />
                {errors.nickname && (
                  <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>
                )}
              </div>
            </div>

            {/* Expiry */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="font-medium col-span-1">Expiry date</label>
              <div className="col-span-3 flex gap-3">
                <select
                  value={cardDetails.expiryMonth}
                  onChange={(e) => handleChange("expiryMonth", e.target.value)}
                  className="border rounded p-2 w-24"
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = (i + 1).toString().padStart(2, "0");
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
                <select
                  value={cardDetails.expiryYear}
                  onChange={(e) => handleChange("expiryYear", e.target.value)}
                  className="border rounded p-2 w-28"
                >
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = (new Date().getFullYear() + i).toString();
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-start gap-3 mt-4">
              <button
                className="border rounded px-4 py-2 text-gray-700"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded hover:bg-yellow-500"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* Right Info */}
        <div className="w-full sm:w-1/3 border-t sm:border-t-0 sm:border-l sm:pl-6 pt-4 sm:pt-0 flex flex-col items-center justify-start">
          <p className="text-sm mb-4">
            Please ensure that you enable your card for online payments from
            your bank’s app.
          </p>
          <div className="flex flex-wrap gap-2">
            {[visa, mastercard, amex, rupay].map((img, i) => (
              <img key={i} src={img} alt="Card" className="w-10 h-auto" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const UpiInputCard = ({ selected, onChange, upiId, setUpiId, onVerify }) => {
  return (
    <label
      className={`block border rounded-lg p-4 transition ${
        selected ? "bg-green-50 border-green-400" : ""
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <input
          type="radio"
          name="payment"
          checked={selected}
          // onChange={onChange}
          className="accent-primary"
          readOnly
          disabled
        />
        <span className="font-semibold text-lg">Other UPI Apps</span>
      </div>

      {selected && (
        <>
          <p className="mb-2 text-sm font-medium">Please enter your UPI ID</p>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="border rounded px-3 py-2 w-60"
            />
            <button
              onClick={onVerify}
              className="bg-yellow-100 text-yellow-700 font-medium px-4 py-2 rounded border border-yellow-300 hover:bg-yellow-200"
            >
              Verify
            </button>
          </div>
          <p className="text-sm text-gray-700">
            The UPI ID is in the format of{" "}
            <span className="font-medium">name/phone@bank</span>
          </p>
        </>
      )}
    </label>
  );
};
