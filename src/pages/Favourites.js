import React from "react";
import { useFavourites } from "../contexts/FavouritesContext";
import House from "../components/House";
import Navbar from "../components/Navbar";

const Favourites = () => {
  const { favourites, removeFromFavourites } = useFavourites();

  console.log("Favourites Length => ", favourites.length);
  console.log("Favourites => ", favourites);

  if (favourites.length < 1) {
    return (
      <>
        <Navbar />
        <div>No favorite properties yet.</div>;
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="mb-20">
        <div className="container mx-auto max-w-[1100px]">
          <h2 className="text-2xl font-semibold mb-6">
            Your Favourite Properties
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {favourites.map((house, index) => (
              <div
                key={index}
                className="bg-white shadow-1 pb-5 rounded-lg w-full max-w-[300px] mx-auto hover:shadow-2xl transition text-gray-600"
              >
                <House house={house} showHeart={false} />{" "}
                {/* Pass showHeart={false} */}
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded mx-3"
                  onClick={() => removeFromFavourites(house.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Favourites;
