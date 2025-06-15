import React, { useState } from "react";
// Import your posters properly
import poster1 from "../../assets/poster-1.jpg";
import poster2 from "../../assets/poster-2.jpg";
import poster3 from "../../assets/poster-3.jpg";
import poster4 from "../../assets/poster-4.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

export default function HomeHeroCrausal() {
  const [swiperData, setSwiperData] = useState([
    { id: 1, content: poster1 },
    { id: 2, content: poster2 },
    { id: 3, content: poster3 },
    { id: 4, content: poster4 },
  ]);
  return (
    <div className="w-full ">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
      >
        {swiperData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full max-h-[600px] overflow-hidden  relative">
              <img
                src={slide.content}
                alt={`Slide ${slide.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
