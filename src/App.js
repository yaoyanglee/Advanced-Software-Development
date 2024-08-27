// import logo from './logo.svg';
import React from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import RegisterProperty from "./pages/RegisterProperty";

// import Banner from "./components/Banner";

function App() {
  return (
    <div className="max-w-[1440px] mx-auto bg-white ">
      {/* Uncomment this code to see how we can query the database */}
      {/* <RegisterProperty /> */}

      {/* Uncomment this code below to get back to the normal functionality */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
