import React, { useState } from "react";
import HouseList from "../components/HouseList";
import HouseMap from "../components/HouseMap";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import RentPropertyModal from "./RentPropertyModal";
import SellPropertyModal from "./SellPropertyModal";

const Home = () => {
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);

  const toggleRentModal = () => {
    setRentModal(!rentModal);
  };

  const toggleSellModal = () => {
    setSellModal(!sellModal);
  };

  return (
    <div className="min-h-screen">
      <Navbar
        toggleRentModal={toggleRentModal}
        toggleSellModal={toggleSellModal}
      />
      {/* <RentPropertyModal modal={rentModal} toggleModal={toggleRentModal} />
      <SellPropertyModal modal={sellModal} toggleModal={toggleSellModal} /> */}
    
      <Search />
      <br></br>
      {/* <HouseList /> */}
      <HouseMap />
    </div>
  );
};

export default Home;
