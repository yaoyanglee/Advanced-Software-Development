// import logo from './logo.svg';
import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import RegisterProperty from "./pages/RegisterProperty";
import RentPropertyModal from "./pages/RentPropertyModal";
import SellPropertyModal from "./pages/SellPropertyModal";

// import Banner from "./components/Banner";

function App() {
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);

  const toggleRentModal = () => {
    setRentModal(!rentModal);
  };

  const toggleSellModal = () => {
    setSellModal(!sellModal);
  };

  return (
    <div className="max-w-[1440px] mx-auto bg-white ">
      {/* <h1>Hello world</h1> */}
      {/* <UploadPropertyModal /> */}

      {/* Uncomment this code to see how we can query the database */}
      {/* <RegisterProperty /> */}

      {/* Uncomment this code below to get back to the normal functionality */}
      <Header
        toggleRentModal={toggleRentModal}
        toggleSellModal={toggleSellModal}
      />
      <RentPropertyModal modal={rentModal} toggleModal={toggleRentModal} />
      <SellPropertyModal modal={sellModal} toggleModal={toggleSellModal} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
