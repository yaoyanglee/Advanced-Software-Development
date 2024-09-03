import React from "react";

import Banner from "../components/Banner"; 
import HouseList from "../components/HouseList";
import Navbar from '../components/Navbar'

const Home = () => {
    return(
        <div className="min-h-[1800px] ">
            <Navbar />
            <Banner/> 
            <HouseList/>
        </div>
    )
}

export default Home;