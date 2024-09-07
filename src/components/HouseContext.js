import React, { useState, useEffect, createContext } from "react";
import data from "../data"; // Ensure this path is correct

// Create the HouseContext
export const HouseContext = createContext();

// HouseContextProvider component
const HouseContextProvider = ({ children }) => {
  const { houses: fetchedHouses, loading: dataLoading, error } = data(); // Custom hook to fetch data
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]); // New state for filtered houses
  const [city, setCity] = useState();
  const [cities, setCities] = useState([]);
  const [type, setType] = useState();
  const [types, setTypes] = useState([]);
  // const [price, setPrice] = useState("Price range (any)");
  // const [startDate, setStartDate] = useState("Rent Date (any)");
  const [loading, setLoading] = useState(false);

  // Update houses state when fetched data changes
  useEffect(() => {
    if (fetchedHouses) {
      setHouses(fetchedHouses);
      setFilteredHouses(fetchedHouses); // Initialize with all houses
    }
  }, [fetchedHouses]);

  //cities
  useEffect(() => {
    const allCities = houses.map((house) => house.city);
    const uniqueCities = ["City (any)", ...new Set(allCities)];
    setCities(uniqueCities);
  }, [houses]);

  // Property types
  useEffect(() => {
    const allTypes = houses.map((house) => house.propertyType);
    const uniqueTypes = ["Property Type (any)", ...new Set(allTypes)];
    setTypes(uniqueTypes);
  }, [houses]);
  console.log(houses);
  const handleClick = () => {
    setLoading(true);

    // const isDefault = (str) => str.split(" ").includes("(any)");

    // const minPrice = parseInt(price.split(" ")[0]);
    // const maxPrice = parseInt(price.split(" ")[2]);
    // const dateSelected = parseInt(startDate);

    const newHouses = houses.filter((house) => {
      // const housePrice = parseInt(house.price);
      // const houseAvailableDate = parseInt(house.date);

      // Case 1: Both city and type are specified (not "any")
      if (city !== "City (any)" && type !== "Property Type (any)") {
        return house.city === city && house.propertyType === type;
      }
      // Case 2: City is specified, type is "any"
      else if (city !== "City (any)" && type === "Property Type (any)") {
        return house.city === city;
      }
      // Case 3: Type is specified, city is "any"
      else if (city === "City (any)" && type !== "Property Type (any)") {
        return house.propertyType === type;
      }
      // Case 4: Both city and type are "any"
      else if (city === "City (any)" && type === "Property Type (any)") {
        return true; // Show all houses
      }
      return false; // Default return value if no conditions are met
    });

    setTimeout(() => {
      setFilteredHouses(newHouses);
      setLoading(false);
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        city,
        setCity,
        cities,
        type,
        setType,
        types,
        // price,
        // setPrice,
        // startDate,
        // setStartDate,
        houses: filteredHouses,
        loading,
        handleClick,
      }}
    >
      {error ? <div>Error loading data</div> : children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
