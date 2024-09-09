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
  const [RoS, setRoS] = useState();
  const [RoSs, setRoSs] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
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

  //Rent or Sell
  useEffect(() => {
    const allRoSs = houses.map((house) => house.RoS);
    const uniqueRoSs = ["Rent or Sell (any)", ...new Set(allRoSs)];
    setRoSs(uniqueRoSs);
  }, [houses]);

  console.log(houses);
  const handleClick = () => {
    setLoading(true);

    // Function to parse the price range
    const parsePriceRange = (priceRange) => {
      const [min, max] = priceRange.split(" - ").map((p) => parseInt(p));
      return { min: min || 0, max: max || Infinity }; // Default to full range if "Price range (any)"
    };

    // Only parse the price if it's not "Price range (any)"
    const { min: minPrice, max: maxPrice } = price !== "Price range (any)" ? parsePriceRange(price) : { min: 0, max: Infinity };

    const newHouses = houses.filter((house) => {
      const housePrice = parseInt(house.price);

      // Case 1: Both city and type are specified (not "any")
      if (city !== "City (any)" && type !== "Property Type (any)") {
        return (
          house.city === city &&
          house.propertyType === type &&
          housePrice >= minPrice &&
          housePrice <= maxPrice &&
          (RoS === "Rent or Sell (any)" || house.RoS === RoS) 
        );
      }
      // Case 2: City is specified, type is "any"
      else if (city !== "City (any)" && type === "Property Type (any)") {
        return (
          house.city === city &&
          housePrice >= minPrice &&
          housePrice <= maxPrice &&
          (RoS === "Rent or Sell (any)" || house.RoS === RoS) 
        );
      }
      // Case 3: Type is specified, city is "any"
      else if (city === "City (any)" && type !== "Property Type (any)") {
        return (
          house.propertyType === type &&
          housePrice >= minPrice &&
          housePrice <= maxPrice &&
          (RoS === "Rent or Sell (any)" || house.RoS === RoS) 
        );
      }
      // Case 4: Both city and type are "any"
      else if (city === "City (any)" && type === "Property Type (any)") {
        return (
          housePrice >= minPrice &&
          housePrice <= maxPrice &&
          (RoS === "Rent or Sell (any)" || house.RoS === RoS) 
        ); // Show all houses within the price range
      }
      // Case 5: RoS is specified, others are "any"
      else if (city === "City (any)" && type === "Property Type (any)" && RoS !== "Rent or Sell (any)") {
        return house.RoS === RoS && housePrice >= minPrice && housePrice <= maxPrice;
      }

      return false; // Default return value if no conditions are met.
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
        price,
        setPrice,
        RoS,
        setRoS,
        RoSs,
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
