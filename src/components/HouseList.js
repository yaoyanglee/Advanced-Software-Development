// HouseList.js
import React, { useContext } from "react";
import { HouseContext } from "./HouseContext";
import { BiBed, BiBath, BiCar } from "react-icons/bi";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import DecimalFormat from "decimal-format";
import { useFavourites } from "../contexts/FavouritesContext";

const HouseList = ({ inMapView = false }) => {
  const { houses, loading } = useContext(HouseContext);
  const { addToFavourites, isInFavourites } = useFavourites();
  const df = new DecimalFormat("#,###,###,###,###");

  // Function to check if email exists in localStorage
  const isUserLoggedIn = () => {
    const email = localStorage.getItem('Email'); // Check if email exists in localStorage
    return email && email.trim() !== ''; // Ensure it's not an empty string
  };

  const handleAddToFavourites = (house) => {
    if (!isUserLoggedIn()) {
      // Show an alert prompting the user to log in
      alert("Please log in or register to add to Favourites");
      return;
    }
    // If the user is logged in, add the house to favorites
    addToFavourites(house);
  };

  if (loading) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-4xl text-violet-700 font-bold mt-[200px]" />
    );
  }

  const availableHouses = houses.filter(house => house.availability === true);

  if (availableHouses.length < 1) {
    return <div>Sorry, no match found!</div>;
  }

  return (
    <section className="mb-20">
      <div className="container mx-auto max-w-[1100px]">
        <div className={`container mx-auto ${inMapView ? 'flex flex-col gap-4' : "grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"}`}>
          {availableHouses.map((house, index) => (
            <Link to={`/PropertyDetail/${house.id}`} key={index}>
              <div className="bg-white shadow-1 pb-5 rounded-lg w-full max-w-[300px] mx-auto cursor-pointer hover:shadow-2xl transition text-gray-600">
                <div className="p-3">
                  <div className="flex justify-between items-center px-3">
                    <div className="text-lg text-violet-600 mb-4 font-bold pl-2">
                      {house.propertyName}
                      <br />${df.format(house.price)}{" "}
                      {house.RoS === "Rent" ? "/pw" : ""}
                    </div>
                    {/* Toggle between filled and outlined heart based on whether the house is in favourites */}
                    {isInFavourites(house.id) ? (
                      <RiHeart3Fill
                        className="text-3xl text-red-500 hover:text-red-600"
                        onClick={(e) => {
                          e.preventDefault(); // Prevents navigation
                          handleAddToFavourites(house); // Call the handler
                        }}
                      />
                    ) : (
                      <RiHeart3Line
                        className="text-3xl hover:text-red-500"
                        onClick={(e) => {
                          e.preventDefault(); // Prevents navigation
                          handleAddToFavourites(house); // Call the handler
                        }}
                      />
                    )}
                  </div>
                  <div className="flex gap-x-2">
                    <div className="border-r-2 pr-2">{house.propertyType}</div>
                    <div className="text-gray-900 font-bold">{house.city}</div>
                  </div>
                  <div className="text-xs max-w-[260px]">
                    {house.address.description}
                  </div>
                  <div className="flex justify-around my-1 p-1 border-t-2">
                    <div className="flex items-center gap-1">
                      <div className="text-[20px] text-violet-700">
                        <BiBed />
                      </div>
                      <div>{house.numberOfBeds}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="text-[20px] text-violet-700">
                        <BiBath />
                      </div>
                      <div>{house.numberOfBaths}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="text-[20px] text-violet-700">
                        <BiCar />
                      </div>
                      <div>{house.numCarpark}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HouseList;
