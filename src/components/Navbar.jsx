import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Help from "../pages/Help"; // Adjusted path based on your folder structure


const Navbar = ({ toggleRentModal, toggleSellModal }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("Name");
    const email = localStorage.getItem("Email");
    const role = localStorage.getItem("Role");
    setUserName(name);
    setUserEmail(email);
    setUserRole(role);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("Email");
      localStorage.removeItem("Name");
      localStorage.removeItem("Role");
      window.dispatchEvent(new Event("storage"));
      window.location.replace("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleFavouritesClick = () => {
    if (!userEmail) {
      alert("Please log in to view your favourites.");
      return;
    }
    navigate("/favourites");
  };

  return (
    <nav className="py-6 mb-12 border-b">
      <div className="container mx-auto flex justify-between items-center font-bold text-gray-800">
        <div className="flex justify-between items-center gap-6">
          <Link onClick={() => window.location.replace("/")}>
            <p className="text-violet-700 hover:text-violet-800 text-3xl font-bold transition">
              91acres
            </p>
          </Link>

          {userRole !== "Tenant" && (
            <>
              <Link
                className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg"
                to=""
                onClick={toggleSellModal}
              >
                Upload for Sale
              </Link>
              <Link
                className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg"
                to=""
                onClick={toggleRentModal}
              >
                Upload Rental
              </Link>
            </>
          )}

          <button
            className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg"
            onClick={handleFavouritesClick}
          >
            Favourites
          </button>
          <Link
            className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg"
            to="/ManageProperty"
          >
            Manage Property
          </Link>

          {/* Help link to new page */}
          <Link
            className="px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg"
            to="/Help"
          >
            Help
          </Link>
        </div>

        {userEmail ? (
          <div className="relative account">
            <button onClick={toggleDropdown} className="flex items-center gap-2">
              <i className="fas fa-user-circle text-2xl"></i>
              <span className="hidden sm:inline">Account</span>
            </button>

            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-4 z-10">
                <div className="flex flex-col items-center py-2">
                  <div className="flex items-center justify-center bg-gray-200 w-14 h-14 rounded-full mb-2">
                    <span className="text-2xl font-bold">
                      {userName.charAt(0)}
                    </span>
                  </div>
                  <p className="font-bold">{userName}</p>
                  <p className="text-sm text-gray-500">{userEmail}</p>
                  <p className="text-sm text-gray-400">{userRole}</p>
                </div>

                <Link
                  to="/account"
                  className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full"
                >
                  <i className="fas fa-cog"></i>
                  Manage Account
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link
              className="border-2 text-violet-800 px-4 py-3 rounded-lg hover:bg-violet-300 hover:text-white transition"
              to="/Login"
            >
              Log in
            </Link>
            <Link
              className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition"
              to="/Signup"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
