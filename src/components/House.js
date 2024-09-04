import React, { useState } from "react";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { RiHeart3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useFavourites } from "../contexts/FavouritesContext";
import Notification from "../contexts/Notification";

const House = ({ house, showHeart = true }) => {
  const { image, type, country, address, bedrooms, bathrooms, surface, price } =
    house;
  const { addToFavourites, isInFavourites } = useFavourites();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleAddToFavourites = (e) => {
    e.preventDefault(); // Prevents navigation
    e.stopPropagation(); // Stops the event from bubbling up to the Link component

    if (isInFavourites(house.id)) {
      setNotificationMessage("Already in the list");
    } else {
      addToFavourites(house);
      setNotificationMessage("Added to favourite list");
    }

    setShowNotification(true);
  };

  return (
    <div className="bg-white shadow-1 pb-5 rounded-lg w-full max-w-[300px] mx-auto cursor-pointer hover:shadow-2xl transition text-gray-600">
      <Link to={`/property/${house.id}`} className="block">
        <img
          className="w-full h-[150px] rounded-t-lg"
          src={image}
          alt="house img"
        />
        <div className="p-3">
          <div className="flex justify-between items-center px-3">
            <div className="text-lg text-violet-600 mb-4 font-bold pl-2">
              ${price}{" "}
              <span className="text-gray-500 font-light text-sm">/month</span>{" "}
            </div>
          </div>
          <div className="flex gap-x-2">
            <div className="border-r-2 pr-2">{type} </div>
            <div className="text-gray-900 font-bold">{country}</div>
          </div>
          <div className="text-xs max-w-[260]">{address}</div>
          <div className="flex justify-around my-1 p-1 border-t-2">
            <div className="flex items-center gap-1">
              <div className="text-[20px] text-violet-700">
                <BiBed />{" "}
              </div>
              <div>{bedrooms}</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="text-[20px] text-violet-700">
                <BiBath />{" "}
              </div>
              <div>{bathrooms}</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="text-[20px] text-violet-700">
                <BiArea />{" "}
              </div>
              <div>{surface}</div>
            </div>
          </div>
        </div>
      </Link>

      {/* Conditionally render the heart icon */}
      {showHeart && (
        <div className="p-3">
          <RiHeart3Line
            className="text-3xl hover:text-red-500 cursor-pointer"
            onClick={handleAddToFavourites}
          />
        </div>
      )}

      {/* Render the notification */}
      <Notification message={notificationMessage} show={showNotification} />
    </div>
  );
};

export default House;
