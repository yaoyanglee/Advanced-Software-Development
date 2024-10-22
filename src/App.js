import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset.js";
import GoogleSignUp from "./pages/googleSignUp.js";
import Favourites from "./pages/Favourites";
import Account from "./pages/Account.js";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import ManageProperty from "./pages/ManageProperty.js";
import { AuthProvider } from "./contexts/AuthContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";

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
    <AuthProvider>
      <FavouritesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/GoogleSignUp" element={<GoogleSignUp />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/PropertyDetail/:id" element={<PropertyDetail />} />
          <Route path="/ManageProperty" element={<ManageProperty />} />
        </Routes>
      </FavouritesProvider>
    </AuthProvider>
  );
}

export default App;
