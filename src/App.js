import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Favourites from "./pages/Favourites";
import RegisterProperty from "./pages/RegisterProperty";
import RentPropertyModal from "./pages/RentPropertyModal";
import SellPropertyModal from "./pages/SellPropertyModal";

// import Banner from "./components/Banner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/favourites" element={<Favourites />} />
        {/* <Route path="/Reset" element={<Reset />} /> */}
      </Routes>
    </>
  );
}

export default App;
