import React from "react";
import { Link } from "react-router-dom";

const Header = ({ toggleRentModal, toggleSellModal }) => {
    return (
        <header className="py-6 mb-12 border-b">
            <div className="container mx-auto flex justify-between items-center font-bold text-gray-800">
                <Link to="/" className="text-violet-700 hover:text-violet-800 text-3xl font-bold transition">
                    91acres
                </Link>
                <div className="flex gap-6">
                    <Link to="/" className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg">
                        Rent
                    </Link>
                    <Link to="/" className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg">
                        Buy
                    </Link>
                    <Link to="#" onClick={toggleSellModal} className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg">
                        Sell
                    </Link>
                    <Link to="#" onClick={toggleRentModal} className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg">
                        Upload Rental Property
                    </Link>
                    <Link to="/favourites" className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg">
                        Favourites
                    </Link>
                    <Link to="/" className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg">
                        Manage Property
                    </Link>
                    <Link to="/" className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg">
                        Resources
                    </Link>
                </div>
                <div className="flex gap-6">
                    <Link to="/" className="border-2 text-violet-800 px-4 py-3 rounded-lg hover:bg-violet-300 hover:text-white transition">
                        Log in
                    </Link>
                    <Link to="/" className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition">
                        Sign up
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
