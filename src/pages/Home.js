import React, { useState } from "react";
import HouseList from "../components/HouseList";
import HouseMap from "../components/HouseMap";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import RentPropertyModal from "./RentPropertyModal";
import SellPropertyModal from "./SellPropertyModal";
import "./Home.css";

const Home = () => {
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const [isToggled, setToggle] = useState(true);

  const toggleRentModal = () => {
    setRentModal(!rentModal);
  };

  const toggleSellModal = () => {
    setSellModal(!sellModal);
  };

  const toggleButton = () => {
    setToggle(!isToggled);
  };

  return (
    <div className="min-h-screen">
     
      <RentPropertyModal modal={rentModal} toggleModal={toggleRentModal} />
      <SellPropertyModal modal={sellModal} toggleModal={toggleSellModal} />
    
      <Search />
      <br />
      <div className="toggle-switch">
        <label className="switch">
          <input type="checkbox" onChange={toggleButton} checked={isToggled} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="content-container">
        {isToggled ? <HouseList /> : <HouseMap />}
      </div>
    </div>
  );
};

export default Home;
