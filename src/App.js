import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import RegisterProperty from "./pages/RegisterProperty";
import RentPropertyModal from "./pages/RentPropertyModal";
import SellPropertyModal from "./pages/SellPropertyModal";

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
        <div className="max-w-[1440px] mx-auto bg-white">
            <Header
                toggleRentModal={toggleRentModal}
                toggleSellModal={toggleSellModal}
            />
            <RentPropertyModal modal={rentModal} toggleModal={toggleRentModal} />
            <SellPropertyModal modal={sellModal} toggleModal={toggleSellModal} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favourites" element={<Favourites />} />
   
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
