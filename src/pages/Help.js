import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { BiBed, BiBath, BiCar } from "react-icons/bi";
import ReactStars from "react-rating-stars-component";

const Help = () => {
  const [totalPeople, setTotalPeople] = useState(1);
  const [adults, setAdults] = useState(0);
  const [kids, setKids] = useState(0);
  const [range, setRange] = useState(5);
  const [recommendedBedrooms, setRecommendedBedrooms] = useState(null);
  const [houses, setHouses] = useState([]);
  const [error, setError] = useState("");

  const TOWN_HALL_COORDS = { lat: -33.87365, lng: 151.20689 };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleTotalPeopleChange = (e) => {
    const value = parseInt(e.target.value);
    setTotalPeople(value);
    if (adults + kids > value) {
      setAdults(0);
      setKids(0);
    }
  };

  const handleAdultsChange = (e) => {
    const value = parseInt(e.target.value);
    if (value + kids <= totalPeople) {
      setAdults(value);
    }
  };

  const handleKidsChange = (e) => {
    const value = parseInt(e.target.value);
    if (value + adults <= totalPeople) {
      setKids(value);
    }
  };

  const handleRangeChange = (e) => {
    setRange(parseInt(e.target.value));
  };

  const fetchAverageRating = async (houseId) => {
    const ratingsRef = collection(db, "ratings");
    const q = query(ratingsRef, where("propertyId", "==", houseId));
    const querySnapshot = await getDocs(q);

    const ratings = querySnapshot.docs.map((doc) => doc.data().rating);
    const averageRating = ratings.length > 0
      ? ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
      : 0;

    return averageRating.toFixed(1);
  };

  const handleSubmit = async () => {
    setError("");
    setHouses([]);

    // Calculate the recommended bedrooms based on adults and kids
    let bedrooms = 1;
    if (adults >= 2 || adults + kids > 2) {
      bedrooms = 2;
    }
    if (adults + kids > 4) {
      bedrooms = Math.ceil((adults + kids) / 2);
    }

    setRecommendedBedrooms(bedrooms);

    const housesRef = collection(db, "Rent");
    const q = query(housesRef, where("numberOfBeds", "==", bedrooms.toString()));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError("No houses found with the recommended bedroom count.");
      } else {
        const fetchedHouses = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const houseData = doc.data();
            const averageRating = await fetchAverageRating(doc.id);

            // Calculate distance from Town Hall
            const distance = calculateDistance(
              TOWN_HALL_COORDS.lat,
              TOWN_HALL_COORDS.lng,
              houseData.address.lat,
              houseData.address.lng
            );

            return { id: doc.id, ...houseData, averageRating, distanceFromTownHall: distance };
          })
        );

        // Filter houses based on the selected range
        const filteredHouses = fetchedHouses.filter(
          (house) => house.distanceFromTownHall <= range
        );

        setHouses(filteredHouses);
      }
    } catch (error) {
      console.error("Error fetching houses:", error);
      setError("Error fetching houses. Please try again later.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">What are you looking for?</h2>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">How many people:</label>
        <select
          value={totalPeople}
          onChange={handleTotalPeopleChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          {[...Array(11).keys()].slice(1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Adults:</label>
        <select
          value={adults}
          onChange={handleAdultsChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          {[...Array(totalPeople + 1).keys()].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Kids:</label>
        <select
          value={kids}
          onChange={handleKidsChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          {[...Array(totalPeople - adults + 1).keys()].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Range far from the City (km):</label>
        <input
          type="range"
          min="5"
          max="25"
          step="5"
          value={range}
          onChange={handleRangeChange}
          className="w-full"
        />
        <div className="text-center mt-2">{range} km</div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-violet-700 text-white px-4 py-2 rounded-lg hover:bg-violet-800 transition mr-2"
        >
          Submit
        </button>
        <button
          onClick={() => window.history.back()}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Close
        </button>
      </div>

      {recommendedBedrooms && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <p className="text-lg font-semibold">
            Recommended Bedrooms: {recommendedBedrooms}
          </p>
          <p>Based on {adults} adult(s) and {kids} kid(s).</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 border rounded-lg bg-red-100 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {houses.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Recommended Houses:</h3>
          <ul className="mt-2 grid gap-4">
            {houses.map((house) => (
              <li key={house.id} className="p-4 border rounded-lg bg-white shadow">
                <div className="text-lg text-violet-700 font-bold mb-1">
                  {house.propertyName || "Unnamed Property"} - ${house.price} {house.RoS === "Rent" ? "/pw" : ""}
                </div>
                <ReactStars
                  count={5}
                  value={parseFloat(house.averageRating)}
                  size={24}
                  edit={false}
                  isHalf={true}
                  activeColor="#ffd700"
                />
                <div className="text-sm text-gray-700 mt-2">
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-gray-600">{house.propertyType}</span>
                    <span>| {house.city}</span>
                  </div>
                  <p>{house.address?.description}</p>
                </div>
                <div className="flex justify-around mt-3">
                  <div className="flex items-center gap-1">
                    <BiBed className="text-xl text-violet-700" />
                    <span>{house.numberOfBeds || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BiBath className="text-xl text-violet-700" />
                    <span>{house.numberOfBaths || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BiCar className="text-xl text-violet-700" />
                    <span>{house.numCarpark || "N/A"}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Help;
