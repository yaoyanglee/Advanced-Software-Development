import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import GoogleSignUp from "./pages/googleSignUp";
import Favourites from "./pages/Favourites";
import Account from "./pages/Account";
import PropertyDetail from "./pages/PropertyDetail";
import ManageProperty from "./pages/ManageProperty";
import Help from "./pages/Help";
import { AuthProvider } from "./contexts/AuthContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import { RatingProvider } from "./contexts/RatingContext";
import CryptoJS from "crypto-js";

const secretKey = "N@N6d3L!t7Z^b9m$Wq3J2vF8a&K*eQ1r";

function App() {
  const location = useLocation();
  const decryptPath = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  let isFavouritesPath = false;
  let isAccountPath = false;
  let isManagePropertyPath = false;
  let isHelpPath = false;

    if (location.pathname.startsWith("/")) {
        const encryptedPath = location.pathname.slice(1); // Remove the leading slash
        const decryptedPath = decryptPath(encryptedPath);

        isFavouritesPath = decryptedPath === "Favourites";
        isAccountPath = decryptedPath === "Account";
        isManagePropertyPath = decryptedPath === "ManageProperty";
        isHelpPath = decryptedPath === "Help";
    }
  return (
    <AuthProvider>
      <FavouritesProvider>
        <RatingProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/Reset" element={<Reset />} />
            <Route path="/GoogleSignup" element={<GoogleSignUp />} />
            {isFavouritesPath ? (
              <Route path="*" element={<Favourites />} />
            ) : (
              <Route path="/Favourites" element={<Favourites />} />
            )}
            
            {isAccountPath ? (
              <Route path="*" element={<Account />} />
            ) : (
              <Route path="/Account" element={<Account />} />
            )}
            
            {isManagePropertyPath ? (
              <Route path="*" element={<ManageProperty />} />
            ) : (
              <Route path="/ManageProperty" element={<ManageProperty />} />
            )}
            
            {isHelpPath ? (
              <Route path="*" element={<Help />} />
            ) : (
              <Route path="/Help" element={<Help />} />
            )}
            <Route path="/PropertyDetail/:id" element={<PropertyDetail />} />
          </Routes>
        </RatingProvider>
      </FavouritesProvider>
    </AuthProvider>
  );
}

export default App;
