import React, { useState, useEffect, createContext } from "react";
import data from "../hooks/data"; // Ensure this path is correct

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const { houses: fetchedHouses, loading: dataLoading, error } = data(); // Custom hook to fetch data
  const [houses, setHouses] = useState([]);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [startDate, setStartDate] = useState("Rent Date (any)");
  const [loading, setLoading] = useState(false);

  // Update houses state when fetched data changes
  useEffect(() => {
    if (fetchedHouses) {
      setHouses(fetchedHouses);
    }
  }, [fetchedHouses]);

  // Handle the case where there is an error
  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }

  // Countries
  useEffect(() => {
    const allCountries = houses.map((house) => house.country);
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, [houses]);

  // Properties
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

    const newHouses = houses.filter((house) => {
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

      if (
        !isDefault(country) &&
        isDefault(property) &&
        isDefault(price) &&
        isDefault(startDate)
      ) {
        return house.country === country;
      }

      if (
        !isDefault(property) &&
        isDefault(country) &&
        isDefault(price) &&
        isDefault(startDate)
      ) {
        return house.type === property;
      }

      if (
        !isDefault(price) &&
        isDefault(country) &&
        isDefault(property) &&
        isDefault(startDate)
      ) {
        return housePrice >= minPrice && housePrice <= maxPrice;
      }

      if (
        !isDefault(startDate) &&
        isDefault(country) &&
        isDefault(property) &&
        isDefault(price)
      ) {
        return houseAvailableDate >= dateSelected;
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
