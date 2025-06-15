import React from "react";
import dairydumm from "../assets/dairy-dum.png";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = React.useState([
    {
      id: 1,
      name: "Product Name",
      brand: "XYZ Brand",
      price: 499.0,
      originalPrice: 599.0,
      rating: 4.5,
      reviews: 100,
      imageUrl: dairydumm,
      addedDate: "5 March 2024",
    },
    {
      id: 2,
      name: "Another Product",
      brand: "ABC Brand",
      price: 299.0,
      originalPrice: 399.0,
      rating: 4.0,
      reviews: 50,
      imageUrl: dairydumm,
      addedDate: "10 March 2024",
    },
    {
      id: 3,
      name: "Third Product",
      brand: "LMN Brand",
      price: 199.0,
      originalPrice: 299.0,
      rating: 3.5,
      reviews: 30,
      imageUrl: dairydumm,
      addedDate: "15 March 2024",
    },
  ]);

  return (
    <div className="px-[220px] py-5">
      <div className="w-full h-full p-5 flex flex-col gap-3 border border-quaternary rounded-2xl bg-white">
        <span className="text-lg font-semibold text-primary">Wishlist</span>
        <div className="w-full flex flex-col gap-3">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="w-full flex items-stretch border border-quaternary rounded-lg"
            >
              {/* Image Section */}
              <div className="w-[180px] bg-quaternary rounded-l-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="flex flex-col justify-between gap-2 flex-1 p-3">
                <div>
                  <span className="text-base text-primary font-semibold">
                    {item.name}
                  </span>
                  <p className="text-xs text-gray-600">by ({item.brand})</p>

                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm">{item.rating}</span>
                    <span className="text-gray-500 text-xs">
                      ({item.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center mt-2">
                    <span className="text-gray-600 text-sm line-through">
                      ₹ {item.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-primary text-sm font-semibold ml-2">
                      ₹ {item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs">Item added {item.addedDate}</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 pr-2">
                <ButtonPrimary
                  label="Add to Cart"
                  handleOnClick={() => {
                    console.log(`Added ${item.name} to cart`);
                  }}
                  loading={false}
                />

                <ButtonPrimary
                  label="Delete"
                  handleOnClick={() => {
                    console.log(`Deleted ${item.name} from wishlist`);
                    setWishlistItems(
                      wishlistItems.filter((w) => w.id !== item.id)
                    );
                  }}
                  loading={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
