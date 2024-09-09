import React, { useState } from "react";
import { useFavourites } from "../contexts/FavouritesContext";
import Navbar from "../components/Navbar";
import RentPropertyModal from "./RentPropertyModal";
import SellPropertyModal from "./SellPropertyModal";
import { BiBed, BiBath } from "react-icons/bi"; // Import BiBed and BiBath icons

const Favourites = () => {
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const [filter, setFilter] = useState("All"); // State to track the filter

  const toggleRentModal = () => {
    setRentModal(!rentModal);
  };

  const toggleSellModal = () => {
    setSellModal(!sellModal);
  };

  const { favourites, removeFromFavourites } = useFavourites();

  // Filter Rent or Sell houses
  const filteredFavourites = favourites.filter((house) => {
    if (filter === "All") return true;
    return house.RoS === filter;
  });

  return (
    <div className="min-h-[1800px]">
      <Navbar
        toggleRentModal={toggleRentModal}
        toggleSellModal={toggleSellModal}
      />
      <RentPropertyModal modal={rentModal} toggleModal={toggleRentModal} />
      <SellPropertyModal modal={sellModal} toggleModal={toggleSellModal} />

      <section className="mb-20">
        <div className="container mx-auto max-w-[1100px]">
          <h2 className="text-2xl font-semibold mb-6">
            Your Favourite Properties
          </h2>

          {/* Dropdown for filtering by Rent/Sell */}
          <div className="mb-6">
            <label htmlFor="filter" className="mr-3">
              Show:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="All">All Properties</option>
              <option value="Rent">Properties for Rent</option>
              <option value="Sell">Properties for Sale</option>
            </select>
          </div>

          {filteredFavourites.length < 1 ? (
            <div>No favorite properties yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {filteredFavourites.map((house, index) => (
                <div
                  key={index}
                  className="bg-white shadow-1 pb-5 rounded-lg w-full max-w-[300px] mx-auto hover:shadow-2xl transition text-gray-600"
                >
                  <div className="p-3">
                    <div className="text-lg text-violet-600 mb-4 font-bold">
                      {house.propertyName}
                    </div>
                    <div className="text-gray-500 mb-2">
                      {house.propertyType} in {house.city}
                    </div>
                    <div className="text-gray-700">
                      Price: ${house.price} {house.RoS === "Rent" ? "/pw" : ""}
                    </div>
                    <div className="text-gray-500 text-sm">
                      Address: {house.address.description}
                    </div>
                    <div className="flex justify-between mt-3">
                      <div className="flex items-center gap-1">
                        <div className="text-[20px] text-violet-700">
                          <BiBed />
                        </div>
                        <div>{house.numberOfRooms}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="text-[20px] text-violet-700">
                          <BiBath />
                        </div>
                        <div>{house.numberOfBath}</div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded mx-3"
                    onClick={() => removeFromFavourites(house.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favourites;
