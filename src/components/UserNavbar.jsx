import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";


const UserNavbar = ({ toggleRentModal, toggleSellModal }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Retrieve the values from localStorage when the component mounts
  useEffect(() => {
    const name = localStorage.getItem("Name");
    const email = localStorage.getItem("Email");
    setUserName(name);
    setUserEmail(email);
  }, []);
  const firstCharacter = userName.charAt(0);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="py-6 mb-12 border-b">
      <div className="container mx-auto flex justify-between items-center font-bold text-gray-800">
        <div className="flex justify-between items-center gap-6">
          <Link to="/">
            <p className="text-violet-700 hover:text-violet-800 text-3xl font-bold transition">
              91acres
            </p>
          </Link>
          <Link className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg" to="/rent">
            Rent
          </Link>
          <Link className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg" to="/buy">
            Buy
          </Link>
          <Link className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg" to="" onClick={toggleSellModal}>
            Sell
          </Link>
          <Link className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg" to="" onClick={toggleRentModal}>
            Upload Rental
          </Link>
          <Link to="/favourites" className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg">
            Favourites
          </Link>
          <Link className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg" to="">
            Manage Property
          </Link>
        </div>

        {/* Account Icon and Dropdown */}
        <div className="relative account">
          <button onClick={toggleDropdown} className="flex items-center gap-2">
            <i className="fas fa-user-circle text-2xl"></i>
            <span className="hidden sm:inline">Account</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-4 z-10">
              <div className="flex flex-col items-center py-2">
                {/* Profile Section */}
                <div className="flex items-center justify-center bg-gray-200 w-14 h-14 rounded-full mb-2">
                  <span className="text-2xl font-bold">{firstCharacter}</span> {/* You can dynamically insert initials */}
                </div>
                <p className="font-bold">{userName}</p>
                <p className="text-sm text-gray-500">{userEmail}</p>
              </div>
              {/* Manage Account */}
              <Link
                to="/account"
                className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full"
              >
                <i className="fas fa-cog"></i>
                Manage Account
              </Link>
              {/* Logout */}
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full"
              >
                <i className="fas fa-sign-out-alt"></i>
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
