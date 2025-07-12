import React, { useEffect, useState } from "react";
import dairydumm from "../assets/dairy-dum.png";
import login from "../assets/login1.png";
import empty from "../assets/emptyWishlist.jpg";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import { services } from "../utils/services";
import { StaticApi } from "../utils/StaticApi";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { StaticRoutes } from "../utils/StaticRoutes";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartproductCodes, setCartproductCodes] = useState([]);

  const userID = localStorage.getItem("userID");
  const isLoggedIn = !!localStorage.getItem("token");

  const getAllWishlist = async () => {
    setLoading(true);

    try {
      const res = await services.get(`${StaticApi.getUserWishlist}`);
      const wishlist = res?.data || [];

      const enrichedData = await Promise.all(
        wishlist.map(async (item) => {
          try {
            const response = await services.get(`${StaticApi.getProductByProductCode}/${item.productCode}`);
            return { ...item, ...response.data.data };
          } catch {
            return { ...item };
          }
        })
      );

      setWishlistItems(enrichedData);
    } catch {
      toast.error("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  const getUserCart = async () => {

    try {
      const res = await services.get(`${StaticApi.getUserCart}`);
      const cartItems = res?.data || [];
      setCartproductCodes(cartItems.map((item) => item.productCode));
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Failed to fetch cart");
    }
  };

  const handleAddToCart = (productCode, quantity = 1) => {
    services
      .post(`${StaticApi.addToCart}?userId=${userID}&productCode=${productCode}&quantity=${quantity}`)
      .then(() => {
        toast.success("Added to cart");
        setCartproductCodes((prev) => [...prev, productCode]);
      })
      .catch(() => toast.error("Failed to add to cart"));
  };

  const handleRemoveFromCart = (productCode) => {
    services
      .delete(`${StaticApi.removeFromCart}?productCode=${productCode}&quantity=1`)
      .then(() => {
        toast.success("Removed from cart");
        setCartproductCodes((prev) => prev.filter((code) => code !== productCode));
      })
      .catch(() => toast.error("Failed to remove from cart"));
  };

  const handleBuyNow = (item) => {
      const updatedItems = [item];

  localStorage.setItem("selectedCheckoutItems", JSON.stringify(updatedItems));
    navigate("/checkout");
  };

  const handleRemoveFromWishlist = (productCode) => {
    services
      .delete(`${StaticApi.removeFromWishlist}?userId=${userID}&productCode=${productCode}`)
      .then(() => {
        toast.success("Removed from wishlist");
        setWishlistItems((prev) => prev.filter((item) => item.productCode !== productCode));
      })
      .catch(() => toast.error("Failed to remove item"));
  };

  const totalSummary = wishlistItems.reduce((sum, item) => sum + (item.price || 0), 0);

  useEffect(() => {
    if (isLoggedIn) {
      getAllWishlist();
      getUserCart();
    }
  }, []);

  return (
    <div className="py-5  sm:px-6 lg:px-10 xl:px-20 2xl:px-[220px]">
      <div className="w-full h-full p-5 flex flex-col gap-6 rounded-2xl bg-white">
        {!isLoggedIn ? (
          <div className="text-center  text-primary text-lg font-medium">
         Please log in to view your wishlist. <div className="w-max flex self-center justify-self-center mt-4"> <ButtonPrimary
                              label="Login " 
                              handleOnClick={() => navigate(StaticRoutes.signin)}
                            /> </div>  <img
                          src={login}
                          alt="login"
                          className="w-full object-cover"
                        />  
          </div>
        ) : (
          <>
            <span className="text-xl font-semibold text-primary">Your Wishlist</span>

            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading...</div>
            ) : wishlistItems.length === 0 ? (
              <div className="text-center py-10 text-gray-500 flex flex-col justify-center items-center"> <img
                          src={empty}
                          alt="empty"
                          className="w-full object-cover"
                        /> <div className="w-max gap-[20px] flex flex-col justify-center items-center"> Your wishlist is empty. <ButtonPrimary
                              label="Explore Products"
                              handleOnClick={() => navigate("/")}
                            /> </div>   </div>
            ) : (
              <>
                <div className="w-full flex flex-col gap-4">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.productCode}
                      className="flex flex-col sm:flex-row items-stretch border border-quaternary rounded-lg overflow-hidden"
                    >
                      {/* Image */}
                      <div className="sm:w-[160px] bg-quaternary flex-shrink-0">
                        <img
                          src={item.imageUrl || dairydumm}
                          alt={item.name}
                          className="w-full h-[200px] sm:h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col justify-between p-4 gap-3 flex-1">
                        <div>
                          <h3 className="text-primary font-semibold text-base sm:text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.category || "Unknown Category"}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-primary text-lg font-semibold">₹{item.price?.toFixed(2)}</span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="line-through text-sm text-gray-400">
                                ₹{item.originalPrice?.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Added on: {item.addedDate || "N/A"}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex sm:max-w-[50%] w-full gap-2 mt-2">
                          {cartproductCodes.includes(item.productCode) ? (
                            <ButtonPrimary
                              label="Remove from Cart"
                              handleOnClick={() => handleRemoveFromCart(item.productCode)}
                            />
                          ) : (
                            <ButtonPrimary
                              label="Add to Cart"
                              handleOnClick={() => handleAddToCart(item.productCode)}
                            />
                          )}

                          <ButtonPrimary
                            label="Buy Now"
                            handleOnClick={() => handleBuyNow(item)}
                          />

                          <button
                            onClick={() => handleRemoveFromWishlist(item.productCode)}
                            className="p-2 border rounded-md hover:bg-red-50 text-red-500 transition-colors"
                            title="Remove from Wishlist"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Wishlist Summary */}
                <div className="mt-6 border-t pt-4 text-right">
                  <span className="text-base sm:text-lg font-medium text-gray-700">
                    Total ({wishlistItems.length} items):{" "}
                    <span className="text-primary font-semibold">₹{totalSummary.toFixed(2)}</span>
                  </span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
