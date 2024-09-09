import React, { useState } from "react";
import HouseList from "../components/HouseList";
import Search from "../components/Search";
import UserNavbar from "../components/UserNavbar";
import RentPropertyModal from "./RentPropertyModal";
import SellPropertyModal from "./SellPropertyModal";

const UserHome = () => {
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);

  const toggleRentModal = () => {
    setRentModal(!rentModal);
  };

  const toggleSellModal = () => {
    setSellModal(!sellModal);
  };

  return (
    <div className="min-h-[1800px] ">
      <UserNavbar
        toggleRentModal={toggleRentModal}
        toggleSellModal={toggleSellModal}
      />
      <RentPropertyModal modal={rentModal} toggleModal={toggleRentModal} />
      <SellPropertyModal modal={sellModal} toggleModal={toggleSellModal} />
    
      <Search />
      <br></br>
      <HouseList />
    </div>
  );
};

export default UserHome;
