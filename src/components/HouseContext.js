import React, { useState, useEffect, createContext } from "react";
import { housesData } from "../data";

// Create the HouseContext
export const HouseContext = createContext();

// HouseContextProvider component
const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [startDate, setStartDate] = useState("Rent Date (any)");
  const [loading, setLoading] = useState(false);

  // Fetch countries based on available houses
  useEffect(() => {
    const allCountries = houses.map((house) => house.country);
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, [houses]);

  // Fetch property types based on available houses
  useEffect(() => {
    const allProperties = houses.map((house) => house.type);
    const uniqueProperties = ["Property (any)", ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, [houses]);

  const handleClick = () => {
    setLoading(true);

    const isDefault = (str) => str.split(" ").includes("(any)");

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);
    const dateSelected = parseInt(startDate);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      const houseAvailableDate = parseInt(house.date);

      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice &&
        houseAvailableDate >= dateSelected
      ) {
        return house;
      }

      if (
        isDefault(country) &&
        isDefault(property) &&
        isDefault(price) &&
        isDefault(startDate)
      ) {
        return house;
      }

      if (!isDefault(country) && isDefault(property) && isDefault(price) && isDefault(startDate)) {
        return house.country === country;
      }

      if (!isDefault(property) && isDefault(country) && isDefault(price) && isDefault(startDate)) {
        return house.type === property;
      }

      if (!isDefault(price) && isDefault(country) && isDefault(property) && isDefault(startDate)) {
        if (house.price >= minPrice && house.price <= maxPrice) {
          return house;
        }
      }

      if (!isDefault(startDate) && isDefault(country) && isDefault(property) && isDefault(price)) {
        if (houseAvailableDate >= dateSelected) {
          return house;
        }
      }
    });

    setTimeout(() => {
      setHouses(newHouses.length < 1 ? [] : newHouses);
      setLoading(false);
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        startDate,
        setStartDate,
        houses,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
