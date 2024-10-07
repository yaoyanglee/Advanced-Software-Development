// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favourites from "./pages/Favourites";
import Account from "./pages/Account";
import PropertyDetail from "./pages/PropertyDetail";
import { AuthProvider } from "./contexts/AuthContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";

function App() {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/PropertyDetail/:id" element={<PropertyDetail />} />
        </Routes>
      </FavouritesProvider>
    </AuthProvider>
  );
}

export default App;
