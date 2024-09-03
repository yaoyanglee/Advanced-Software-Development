import React, { useState } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PropertyList from "./pages/PropertyList";
import RentPropertyModal from "./pages/RentPropertyModal";
import SellPropertyModal from "./pages/SellPropertyModal";

const App = () => {
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);

  const toggleRentModal = () => {
    setRentModal(!rentModal);
  };

  const toggleSellModal = () => {
    setSellModal(!sellModal);
  };

  return (
    <>
      <Navbar
        toggleRentModal={toggleRentModal}
        toggleSellModal={toggleSellModal}
      />
      <RentPropertyModal modal={rentModal} toggleModal={toggleRentModal} />
      <SellPropertyModal modal={sellModal} toggleModal={toggleSellModal} />
      <Home />
      {/* <PropertyList /> */}
    </>
  );
};

export default App;
