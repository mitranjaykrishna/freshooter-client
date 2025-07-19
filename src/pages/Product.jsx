import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FeatureCarousel from "../components/HomeHelper/FeatureCarousel";
import { useNavigate, useParams } from "react-router-dom"; // For getting product code from URL
import { services } from "../utils/services";
import { StaticApi } from "../utils/StaticApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { toast } from "react-toastify";
import LoginModal from "../components/Login/LoginModal";

export default function Product() {
  const { id } = useParams(); // Get product code from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [wishlistAnimation, setWishlistAnimation] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const getProductDetails = () => {
    setLoading(true);
    setError(null);

    services
      .get(`${StaticApi.getProductByProductCode}/${id}`) // Use GET with URL parameter
      .then((response) => {
        setProduct(response?.data?.data);
      })
      .catch((err) => {
        setError("Failed to load product. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= (product?.stockQuantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const handleCart = () => {
    if (!isAuthenticated()) {
      setShowLoginModal(true);
      return;
    }

    if (!isInCart) {
      services
        .post(`${StaticApi.addToCart}?productCode=${id}&quantity=${quantity}`)
        .then(() => {
          setIsInCart(true);
          toast.success("Added to Cart");
        })
        .catch(() => toast.error("Failed to add to cart"))
        .finally(() => setLoading(false));
    } else {
      services
        .put(
          `${StaticApi.removeFromCart}?productCode=${id}&quantity=${quantity}`
        )
        .then(() => {
          setIsInCart(false);
          toast.info("Removed from Cart");
        })
        .catch(() => toast.error("Failed to remove from cart"))
        .finally(() => setLoading(false));
    }
  };

  const toggleWishlist = () => {
    if (!isAuthenticated()) {
      setShowLoginModal(true);
      return;
    }

    setWishlistAnimation(true);
    setTimeout(() => setWishlistAnimation(false), 400);

    if (!isWishlisted) {
      services
        .post(`${StaticApi.addWishlist}?productCode=${id}`)
        .then(() => {
          setIsWishlisted(true);
          toast.success("Added to Wishlist");
        })
        .catch(() => toast.error("Failed to add to wishlist"))
        .finally(() => setLoading(false));
    } else {
      services
        .delete(`${StaticApi.removeFromWishlist}?productCode=${id}`)
        .then(() => {
          setIsWishlisted(false);
          toast.info("Removed from Wishlist");
        })
        .catch(() => toast.error("Failed to remove from wishlist"))
        .finally(() => setLoading(false));
    }
  };

  const getUserCart = () => {
    setLoading(true);
    const userID = localStorage.getItem("userID");

    if (!userID) {
      setLoading(false);
      return;
    }

    services
      .post(`${StaticApi.getUserCart}?userId=${userID}`)
      .then((res) => {
        const cartItems = res.data?.data || [];

        // Check if current product is in the cart
        const isPresent = cartItems.some((item) => item.productCode == id);
        setIsInCart(isPresent);
      })
      .catch((err) => {
        console.error("Error fetching user cart:", err);
        toast.error("Failed to fetch cart data");
      })
      .finally(() => setLoading(false));
  };
  const checkIfWishlisted = async () => {
    try {
      const res = await services.get(StaticApi.getUserWishlist);
      const wishlist = res?.data || [];

      const isPresent = wishlist.some((item) => item.productCode === id);
      setIsWishlisted(isPresent);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };
  useEffect(() => {
    getProductDetails();
    getUserCart();
    checkIfWishlisted();
  }, [id]);

  if (loading) {
    return (
      <div className="px-[220px] py-5 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-[220px] py-5 flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="px-[220px] py-5 flex justify-center items-center h-64">
        <div>Product not found</div>
      </div>
    );
  }

  // Sample images - in a real app, these would come from the API
  const productImages = [
    "https://images.unsplash.com/photo-1656497119922-068c6a5e1193?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFzYWxhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1633881614907-8587c9b93c2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFzYWxhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1543376798-62217a8d85cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hc2FsYXxlbnwwfHwwfHx8MA%3D%3D",
  ];
  const price = Number(product?.price);
  const discount = Number(product?.discount) || 0;

  const hasValidPrice = !isNaN(price) && price > 0;
  const hasDiscount = hasValidPrice && discount > 0 && discount <= 100;

  const discountedPrice = hasDiscount
    ? price - (price * discount) / 100
    : price;

  return (
    <div className="py-5 flex flex-col gap-5">
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <div className="relative flex flex-col md:flex-row gap-5 rounded-2xl p-5 bg-white h-[100vh]">
        <div className="w-full md:w-[50%]">
          {/* Sticky container */}
          <div className="sticky top-[80px] flex gap-5">
            {/* Desktop Thumbnails (hidden on mobile) */}
            <div className="hidden md:flex flex-col gap-3">
              {productImages?.map((img, index) => (
                <div
                  key={index}
                  className={`w-[75px] h-[80px] cursor-pointer ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={img}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Mobile Carousel (hidden on desktop) */}
            <div className="md:hidden w-full">
              <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Thumbs]}
                className="product-images-swiper"
              >
                {productImages?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={product?.name}
                      className="w-full h-[300px] object-cover rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnail Carousel */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="thumb-swiper mt-2"
              >
                {productImages?.map((img, index) => (
                  <SwiperSlide key={index} className="!w-[80px] !h-[80px]">
                    <img
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Main Image (hidden on mobile) */}
            <div className="flex-1 hidden md:block">
              <img
                src={
                  productImages?.[selectedImage] ||
                  "https://plus.unsplash.com/premium_photo-1664647903833-318dce8f3239?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={product?.name}
                className="w-full max-h-[600px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[10px] md:w-[50%] justify-between w-full">
          <div className="flex flex-col gap-[20px]">
            <h1 className="text-2xl font-bold">{product?.name ?? "Hello"}</h1>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="text-sm text-gray-600">(100 reviews)</span>
            </div>
          </div>

          <div className="flex items-end gap-2">
            {hasValidPrice && (
              <span className="text-[24px] font-semibold text-primary leading-none">
                ₹{discountedPrice.toFixed(2)}
              </span>
            )}

            {hasDiscount && (
              <>
                <span className="line-through text-gray-500 text-sm leading-none">
                  ₹{price.toFixed(2)}
                </span>
                <span className="text-sm text-green-600 font-medium leading-none">
                  ({discount}% OFF)
                </span>
              </>
            )}
          </div>

          <div className="text-sm">
            <span className="font-medium">Category:</span> {product?.category}
          </div>

          <div className="text-sm">
            {product?.stockQuantity > 0 ? (
              <span className="text-green-600">
                In Stock ({product?.stockQuantity} available)
              </span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>

          {/* quantity increase and decrease*/}
          <div className="inline-flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm w-max">
            <button
              className={`px-4 py-1 text-lg font-semibold transition-all ${
                quantity <= 1
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-primary hover:bg-gray-200"
              }`}
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              –
            </button>

            <span className="px-5 py-1 text-base font-medium text-gray-700 bg-white select-none">
              {quantity}
            </span>

            <button
              className={`px-4 py-1 text-lg font-semibold transition-all ${
                quantity >= product?.stockQuantity
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-primary hover:bg-gray-200"
              }`}
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product?.stockQuantity}
            >
              +
            </button>
          </div>

          {/* total price */}
          <div className="text-lg font-semibold text-primary">
            Total: ₹
            {((Number(product?.price) || 0) * (Number(quantity) || 0)).toFixed(
              2
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              className={`${
                product?.stockQuantity <= 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary hover:bg-secondary"
              } text-white px-4 py-2 rounded-lg transition-colors h-[42px]`}
              // disabled={product?.stockQuantity <= 0}
              onClick={handleCart}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>

            {/* Buy Now – now looks SECONDARY */}
            <button
              className={`px-4 py-2 rounded-lg transition-colors h-[42px] border ${
                product?.stockQuantity <= 0
                  ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                  : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
              }`}
              // disabled={product?.stockQuantity <= 0}
              onClick={() => {
                if (!isAuthenticated()) {
                  setShowLoginModal(true);
                  return;
                }

                const buyNowItem = {
                  productId: product?.productId,
                  productCode: product?.productCode,
                  name: product?.name,
                  imageUrl: product?.imageUrl || productImages?.[0],
                  price: discountedPrice,
                  quantity,
                  totalPrice: discountedPrice * quantity,
                };

                // Overwrite with the latest item as the only one (since it's a buy now flow)
                const updatedItems = [buyNowItem];

                localStorage.setItem(
                  "selectedCheckoutItems",
                  JSON.stringify(updatedItems)
                );
                handleCart();

                navigate("/checkout");
              }}
            >
              Buy Now
            </button>

            <div
              className={`text-red-500 cursor-pointer text-2xl transition-transform ${
                wishlistAnimation ? "wishlist-bounce" : ""
              }`}
              onClick={toggleWishlist}
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-600">Description:</span>
            <p className="text-gray-700">{product?.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full h-full border-t border-quaternary border-b bg-white">
        {/* Top Selling Products - Moves to top on mobile */}
        <div className="w-full lg:flex-grow lg:max-w-[250px] px-4 py-5 lg:px-5 lg:py-6 flex flex-col gap-4 lg:gap-5 border-b lg:border-b-0 lg:border-r border-quaternary">
          <h2 className="text-lg lg:text-xl font-semibold">
            Top Selling Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-4">
            {/* Example Product Cards - should be mapped from data */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white border border-quaternary rounded-lg p-3 lg:p-4 shadow hover:shadow-lg transition-shadow"
              >
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                  alt="Product"
                  className="w-full h-28 lg:h-40 object-cover rounded-lg mb-2 lg:mb-3"
                />
                <h3 className="text-base lg:text-lg font-semibold line-clamp-1">
                  Premium Headphones
                </h3>
                <p className="text-xs lg:text-sm text-gray-600">₹2,499.99</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical divider - hidden on mobile */}
        <div className="hidden lg:block flex-grow w-[1px] bg-quaternary"></div>

        {/* Main content area */}
        <div className="w-full h-full px-4 py-5 lg:px-5 lg:pb-6 flex flex-col gap-4 lg:gap-5">
          {/* Related Products Carousel */}
          <div className="overflow-x-hidden">
            <FeatureCarousel
              heading="Related Products"
              category={product?.category}
            />
          </div>

          {/* Customer Reviews */}
          <div className="w-full h-full flex flex-col gap-4 lg:gap-5">
            <h2 className="text-lg lg:text-xl font-semibold">
              Customer Reviews
            </h2>
            <div className="flex flex-col gap-3">
              {[1, 2].map((review) => (
                <div
                  key={review}
                  className="p-3 lg:p-4 border border-quaternary rounded-lg bg-white"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">
                      ⭐⭐⭐⭐{review === 1 ? "⭐" : ""}
                    </span>
                    <span className="text-xs lg:text-sm text-gray-600">
                      {review === 1 ? "John Doe" : "Jane Smith"}
                    </span>
                  </div>
                  <p className="text-sm lg:text-base text-gray-700 mt-1 lg:mt-2">
                    {review === 1
                      ? "This product is amazing! I loved it and will buy again."
                      : "Good quality, but the delivery was a bit slow."}
                  </p>
                </div>
              ))}
            </div>

            {/* View All Reviews Button */}
            <button className="self-start text-primary text-sm lg:text-base font-medium hover:underline mt-2">
              View all reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
