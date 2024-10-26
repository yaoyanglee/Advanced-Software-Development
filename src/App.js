import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import GoogleSignUp from "./pages/googleSignUp";
import Favourites from "./pages/Favourites";
import Account from "./pages/Account";
import PropertyDetail from "./pages/PropertyDetail";
import ManageProperty from "./pages/ManageProperty";
import Help from "./pages/Help"; // Import the Help component
import Navbar from "./components/Navbar"; // Import Navbar
import { AuthProvider } from "./contexts/AuthContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import { RatingProvider } from "./contexts/RatingContext";

function App() {
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);

  const toggleRentModal = () => setRentModal(!rentModal);
  const toggleSellModal = () => setSellModal(!sellModal);

  return (
    <AuthProvider>
      <FavouritesProvider>
        <RatingProvider>
          <Navbar toggleRentModal={toggleRentModal} toggleSellModal={toggleSellModal} />
          
          {/* Define all your routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/googlesignup" element={<GoogleSignUp />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/account" element={<Account />} />
            <Route path="/propertydetail/:id" element={<PropertyDetail />} />
            <Route path="/manageproperty" element={<ManageProperty />} />
            <Route path="/help" element={<Help />} /> {/* Add Help route */}
          </Routes>
        </RatingProvider>
      </FavouritesProvider>
    </AuthProvider>
  );
}

export default App;
