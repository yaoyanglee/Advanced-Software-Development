import React, { useContext } from "react";
import { HouseContext } from "./HouseContext";
import { BiBed, BiBath, BiArea, BiCar } from "react-icons/bi";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri"; // Import both outline and filled heart icons
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import DecimalFormat from "decimal-format";
import { useFavourites } from "../contexts/FavouritesContext"; // Import the useFavourites hook

const HouseList = ({ inMapView = false }) => {
  const { houses, loading } = useContext(HouseContext);
  const { addToFavourites, isInFavourites } = useFavourites(); // Destructure needed functions from useFavourites
  const df = new DecimalFormat("#,###,###,###,###");
  const handleAddToFavourites = (house) => {
    addToFavourites(house);
  };

  if (loading) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-4xl text-violet-700 font-bold mt-[200px]" />
    );
  }

  if (houses.length < 1) {
    return <div>Sorry, no match found!</div>;
  }

  return (
    <section className="mb-20">
      <div className="container mx-auto max-w-[1100px]" oncli>
        <div className={`container mx-auto ${inMapView ? 'flex flex-col gap-4' : "grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"}`}>
          {houses.map((house, index) => (
            <Link to={`/PropertyDetail/${house.id}`} key={index}>
              <div className="bg-white shadow-1 pb-5 rounded-lg w-full max-w-[300px] mx-auto cursor-pointer hover:shadow-2xl transition text-gray-600">
                <div className="p-3">
                  <div className="flex justify-between items-center px-3">
                    <div className="text-lg text-violet-600 mb-4 font-bold pl-2">
                      {house.propertyName}
                      <br />${df.format(house.price)}{" "}
                      {house.RoS === "Rent" ? "/pw" : ""}
                      <span className="text-gray-500 font-light text-sm"></span>
                    </div>
                    {isInFavourites(house.id) ? (
                      <RiHeart3Fill
                        className="text-3xl text-red-500 hover:text-red-600"
                        onClick={(e) => {
                          e.preventDefault(); // Prevents the Link from being triggered
                          handleAddToFavourites(house);
                        }}
                      />
                    ) : (
                      <RiHeart3Line
                        className="text-3xl hover:text-red-500"
                        onClick={(e) => {
                          e.preventDefault(); // Prevents the Link from being triggered
                          handleAddToFavourites(house);
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
                    <div className="flex items-center gap-1">
                      {/* Add more info like surface area if needed */}
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
