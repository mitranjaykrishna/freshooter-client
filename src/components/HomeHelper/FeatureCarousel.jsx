import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function FeatureCarousel({ heading, data }) {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(`/product/${link}`);
  };

  return (
    <div className="w-full border border-quaternary p-4 sm:p-6 rounded-lg relative">
      <span className="text-lg sm:text-2xl font-semibold text-center block mb-4">
        {heading}
      </span>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="p-3 bg-white shadow-md rounded-lg hover:bg-gradient-to-r from-tertiary to-primary hover:shadow-lg transition-all cursor-pointer"
              onClick={() => handleNavigate(item.link)}
            >
              <div className="w-full h-40 sm:h-44 md:h-52 bg-gray-100 rounded-lg mb-2 overflow-hidden">
                <img
                  src={item.image || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex justify-between text-xs sm:text-sm font-semibold">
                <span className="line-clamp-1">{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
