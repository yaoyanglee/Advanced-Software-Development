import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"; 
import { auth } from "../Firebase"; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Default value for user is null
  const [loading, setLoading] = useState(true); 

  // Function to check if the email exists in localStorage
  const checkLocalStorageUser = () => {
    const storedEmail = localStorage.getItem("Email");
    if (storedEmail && storedEmail.trim() !== "") {
      return { email: storedEmail };
    }
    return null;
  };

  useEffect(() => {
    // Add a listener to detect changes to localStorage
    const handleStorageChange = () => {
      const updatedUser = checkLocalStorageUser();
      setUser(updatedUser);
    };

    // Initial check for localStorage user
    const initialUser = checkLocalStorageUser();
    setUser(initialUser);

    // Listen to Firebase auth changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || initialUser); // Set the user from Firebase or localStorage
      setLoading(false);
    });

    // Listen for changes to localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      unsubscribe(); // Cleanup listener
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children} {/* Only render children when loading is done */}
    </AuthContext.Provider>
  );
};
