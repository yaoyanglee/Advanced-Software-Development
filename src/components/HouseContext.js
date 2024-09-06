import React, { useState, useEffect, createContext } from "react";
import data from "../data"; // Ensure this path is correct

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const { houses: fetchedHouses, loading: dataLoading, error } = data(); // Custom hook to fetch data
  const [houses, setHouses] = useState([]);
  const [city, setCity] = useState("City (any)");
  const [cities, setCities] = useState([]);
  // const [property, setProperty] = useState("Property (any)");
  // const [properties, setProperties] = useState([]);
  // const [price, setPrice] = useState("Price range (any)");
  // const [startDate, setStartDate] = useState("Rent Date (any)");
  const [loading, setLoading] = useState(false);

  // Update houses state when fetched data changes
  useEffect(() => {
    if (fetchedHouses) {
      setHouses(fetchedHouses);
    }
  }, [fetchedHouses]);

  //cities
  useEffect(() => {
    const allCities = houses.map((house) => house.city);
    const uniqueCities = ["Location (any)", ...new Set(allCities)];
    setCities(uniqueCities);
  }, [houses]);

  // // Properties
  // useEffect(() => {
  //   const allProperties = houses.map((house) => house.type);
  //   const uniqueProperties = ["Property (any)", ...new Set(allProperties)];
  //   setProperties(uniqueProperties);
  // }, [houses]);
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

      if (
        house.city === city 
        // house.type === property &&
        // housePrice >= minPrice &&
        // housePrice <= maxPrice &&
        // houseAvailableDate >= dateSelected
      ) {
        return house;
      }

    //   if (
    //     isDefault(city) &&
    //     isDefault(property) &&
    //     isDefault(price) &&
    //     isDefault(startDate)
    //   ) {
    //     return house;
    //   }

    //   if (
    //     !isDefault(city) &&
    //     isDefault(property) &&
    //     isDefault(price) &&
    //     isDefault(startDate)
    //   ) {
    //     return house.city === city;
    //   }

    //   if (
    //     !isDefault(property) &&
    //     isDefault(city) &&
    //     isDefault(price) &&
    //     isDefault(startDate)
    //   ) {
    //     return house.type === property;
    //   }

    //   if (
    //     !isDefault(price) &&
    //     isDefault(city) &&
    //     isDefault(property) &&
    //     isDefault(startDate)
    //   ) {
    //     return housePrice >= minPrice && housePrice <= maxPrice;
    //   }

    //   if (
    //     !isDefault(startDate) &&
    //     isDefault(city) &&
    //     isDefault(property) &&
    //     isDefault(price)
    //   ) {
    //     return houseAvailableDate >= dateSelected;
    //   }
    });

    setTimeout(() => {
      setHouses(newHouses.length < 1 ? [] : newHouses);
      setLoading(false);
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        city,
        setCity,
        cities,
        // property,
        // setProperty,
        // properties,
        // price,
        // setPrice,
        // startDate,
        // setStartDate,
        houses,
        loading,
        handleClick,
      }}
    >
      {error ? (
        <div>Error loading data</div>
      ) : (
        children
      )}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
