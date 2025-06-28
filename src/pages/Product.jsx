import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FeatureCarousel from "../components/HomeHelper/FeatureCarousel";
import { useParams } from "react-router-dom"; // For getting product code from URL
import { services } from "../utils/services";
import { StaticApi } from "../utils/StaticApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

export default function Product() {
  const { id } = useParams(); // Get product code from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const getProductDetails = () => {
    setLoading(true);
    setError(null);

    services
      .get(`${StaticApi.getProductByProductCode}/${id}`) // Use GET with URL parameter
      .then((response) => {
        if (response.data && response.data.success) {
          setProduct(response.data.data);
        } else {
          setError(response.data?.message || "Failed to fetch product details");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load product. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= (product?.stockQuantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Here you would typically make an API call to update wishlist status
  };

  if (loading) {
    return (
      <div className="px-[220px] py-5 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!error) {
    return (
      <div className="px-[220px] py-5 flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (product) {
    return (
      <div className="px-[220px] py-5 flex justify-center items-center h-64">
        <div>Product not found</div>
      </div>
    );
  }

  // Sample images - in a real app, these would come from the API
  const productImages = [
    "https://plus.unsplash.com/premium_photo-1664647903833-318dce8f3239?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661690495584-cba1d18e1936?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGFpcnl8ZW58MHx8MHx8fDA%3D"
  ];

  return (
    <div className="py-5 flex flex-col gap-5">
      <div className="relative flex flex-col md:flex-row gap-5 rounded-2xl p-5 bg-white">
        <div className="w-full md:w-2/3">
          {/* Sticky container */}
          <div className="sticky top-[80px] flex gap-5">
            {/* Desktop Thumbnails (hidden on mobile) */}
            <div className="hidden md:flex flex-col gap-3">
              {productImages?.map((img, index) => (
                <div
                  key={index}
                  className={`w-[50px] h-[80px] cursor-pointer ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
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
                src={productImages?.[selectedImage] || "https://plus.unsplash.com/premium_photo-1664647903833-318dce8f3239?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt={product?.name}
                className="w-full max-h-[600px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-2xl font-bold">{product?.name ?? "Hello"}</h1>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
            <span className="text-sm text-gray-600">(100 reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-primary">
              ₹{product?.price?.toFixed(2)}
            </span>
            {product?.price < product?.originalPrice && (
              <span className="line-through text-gray-500">
                ₹{product?.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>

          <div className="text-sm">
            <span className="font-medium">Category:</span> {product?.category}
          </div>

          <div className="text-sm">
            <span className="font-medium">Availability:</span>{" "}
            {product?.stockQuantity > 0 ? (
              <span className="text-green-600">In Stock ({product?.stockQuantity} available)</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>

          {/* quantity increase and decrease*/}
          <div className="flex items-center gap-3">
            <button
              className="bg-quaternary text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              className="bg-quaternary text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product?.stockQuantity}
            >
              +
            </button>
          </div>

          {/* total price */}
          <div className="text-lg font-semibold text-primary">
            Total: ₹{(product?.price * quantity).toFixed(2)}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
              disabled={product?.stockQuantity <= 0}
            >
              Buy Now
            </button>
            <button
              className="bg-quaternary text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              disabled={product?.stockQuantity <= 0}
            >
              Add to Cart
            </button>
            <div
              className="text-red-500 cursor-pointer text-2xl"
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

      <div className="flex w-full h-full border border-quaternary rounded-2xl bg-white">
        <div className="flex-grow w-full h-full px-5 py-6 flex flex-col gap-5 max-w-[250px]">
          <h2 className="text-xl font-semibold">Top Selling Products</h2>
          <div className="grid gap-4">
            {/* Example Product Card - in a real app these would be mapped from data */}
            <div className="bg-white border border-quaternary rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                alt="Product"
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold">Premium Headphones</h3>
              <p className="text-sm text-gray-600">₹2,499.99</p>
            </div>
          </div>
        </div>

        <div className="flex-grow w-[1px] bg-quaternary"></div>

        <div className="w-full h-full px-5 pb-6 flex flex-col gap-3 overflow-x-hidden">
          <FeatureCarousel heading={"Related Products"} category={product?.category} />

          <div className="w-full h-full flex flex-col gap-5">
            <h2 className="text-xl font-semibold">Customer Reviews</h2>
            <div className="flex flex-col gap-3 mt-3">
              <div className="p-4 border border-quaternary rounded-lg bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <span className="text-sm text-gray-600">John Doe</span>
                </div>
                <p className="text-gray-700 mt-2">
                  This product is amazing! I loved it and will buy again.
                </p>
              </div>
              <div className="p-4 border border-quaternary rounded-lg bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐</span>
                  <span className="text-sm text-gray-600">Jane Smith</span>
                </div>
                <p className="text-gray-700 mt-2">
                  Good quality, but the delivery was a bit slow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}