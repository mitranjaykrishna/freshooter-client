import React, { useEffect, useState } from "react";
import { services } from "../utils/services";
import { StaticApi } from "../utils/StaticApi";
import dairydumm from "../assets/dairy-dum.png";
import HomeHeroCrausal from "../components/SwiperComp/HomeHeroCrausal";
import FeatureCarousel from "../components/HomeHelper/FeatureCarousel";

export default function Home() {
  const [productCat, setProductCat] = useState([
    { id: 1, name: "Milk", image: dairydumm },
    { id: 2, name: "Cheese", image: dairydumm },
    { id: 3, name: "Yogurt", image: dairydumm },
    { id: 4, name: "Butter", image: dairydumm },
    { id: 5, name: "Ice Cream", image: dairydumm },
    { id: 6, name: "Paneer", image: dairydumm },
  ]);

  // Uncomment this if you want to load categories from API
  // useEffect(() => {
  //   services
  //     .get(StaticApi?.getAllProductCategory)
  //     .then((response) => {
  //       console.log("Product Categories:", response.data);
  //       setProductCat(response.data); // Assuming the API returns array
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching product categories:", error);
  //     });
  // }, []);

  return (
    <div className="flex flex-col gap-6 pt-5 w-full">
      {/* Product Categories Grid */}
      <div className="px-[220px] w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-center ">
        {productCat.map((item) => (
          <div
            className="flex flex-col items-center justify-center w-full"
            key={item.id}
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex flex-col items-center justify-center rounded-full gap-2 bg-white shadow-md p-2 cursor-pointer hover:bg-gradient-to-r from-tertiary from-2% to-primary hover:shadow-lg hover:text-white transition-all">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="mt-2 text-sm font-semibold">{item?.name}</span>
          </div>
        ))}
      </div>

      <HomeHeroCrausal />
      <div className="px-[220px] w-full flex flex-col gap-5">
        <FeatureCarousel heading={"New Products"} />
        <FeatureCarousel heading={"Featured Products"} />
        <FeatureCarousel heading={"Best Selling"} />
      </div>
    </div>
  );
}
