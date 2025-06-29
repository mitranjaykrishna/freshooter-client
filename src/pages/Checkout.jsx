import React from 'react';

const Checkout = () => {
  return (
    <div className="pt-[100px] px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing/Shipping Form */}
        <div className="lg:col-span-2 bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">First Name</label>
              <input type="text" className="w-full border rounded p-2" placeholder="John" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Last Name</label>
              <input type="text" className="w-full border rounded p-2" placeholder="Doe" />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" className="w-full border rounded p-2" placeholder="john@example.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Address</label>
              <input type="text" className="w-full border rounded p-2" placeholder="123 Green Ave" />
            </div>
            <div>
              <label className="block mb-1 font-medium">City</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Postal Code</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">State</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Country</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
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

          <button className="mt-6 w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg transition duration-200">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
