import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset.js";
import { Routes, Route } from "react-router-dom";
import GoogleSignUp from "./pages/googleSignUp.js";
import Favourites from "./pages/Favourites";
import RegisterProperty from "./pages/RegisterProperty";
import RentPropertyModal from "./pages/RentPropertyModal";
import SellPropertyModal from "./pages/SellPropertyModal";
import Rent from "./pages/Rent.js";
import Buy from "./pages/Buy.js";
import Account from "./pages/Account.js";

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
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/buy" element={<Buy />} />
        {/* <Route path="/Reset" element={<Reset />} /> */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Reset" element={<Reset />} />
        <Route path="/GoogleSignUp" element={<GoogleSignUp />} />
        <Route path="/Account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
