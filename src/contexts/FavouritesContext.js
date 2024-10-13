import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../Firebase"; // Firebase Firestore instance
import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { useAuth } from "./AuthContext"; // Assuming you're using Firebase Auth for user management

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const { user } = useAuth() || {}; // Safely destructure user (add fallback to empty object)
  const [favourites, setFavourites] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    show: false,
  });

  // Fetch the favourites for the currently logged-in user
  useEffect(() => {
    if (!user) {
      setFavourites([]); // Clear the favourites if no user is logged in
      return;
    }
    const fetchFavourites = async () => {
      try {
        // Query Firestore to get favourites specific to the logged-in user's email
        const q = query(collection(db, "favourites"), where("userEmail", "==", user.email));
        const querySnapshot = await getDocs(q);
        const favouritesList = querySnapshot.docs.map((doc) => ({
          firestoreId: doc.id, // Firestore document ID
          ...doc.data(), // Custom data fields, including numberOfBeds and numberOfBaths
        }));
        setFavourites(favouritesList);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, [user]);  // Refetch favorites whenever user changes (logs in or logs out)

  // Function to add a property to favourites
  const addToFavourites = async (house) => {
    if (!user || !user.email) {
      setNotification({ message: "You must be logged in to add favourites", show: true });
      return;
    }

    try {
      // Check if the house is already in the favourites list
      if (favourites.some((favourite) => favourite.id === house.id)) {
        setNotification({ message: "Already in the list", show: true });
        setTimeout(() => {
          setNotification({ message: "", show: false });
        }, 3000);
        return false;
      }

      // Add the house to Firestore with the user's email
      const docRef = await addDoc(collection(db, "favourites"), {
        ...house,
        userEmail: user.email, // Save the email of the logged-in user
      });
      setFavourites([...favourites, { ...house, firestoreId: docRef.id }]);
      setNotification({ message: "Added to favourites", show: true });
      setTimeout(() => {
        setNotification({ message: "", show: false });
      }, 3000);
      return true;
    } catch (error) {
      console.error("Error adding to favourites:", error);
      setNotification({ message: "Failed to add to favourites", show: true });
      setTimeout(() => {
        setNotification({ message: "", show: false });
      }, 3000);
      return false;
    }
  };

  // Function to remove a property from favourites
  const removeFromFavourites = async (id) => {
    try {
      const houseToDelete = favourites.find((house) => house.id === id);
      if (!houseToDelete) return;

      // Remove the document from Firestore
      await deleteDoc(doc(db, "favourites", houseToDelete.firestoreId));
      setFavourites(favourites.filter((house) => house.id !== id));
      setNotification({ message: "Removed from favourites", show: true });
      setTimeout(() => {
        setNotification({ message: "", show: false });
      }, 3000);
    } catch (error) {
      console.error("Error removing document:", error);
      setNotification({
        message: "Failed to remove from favourites",
        show: true,
      });
      setTimeout(() => {
        setNotification({ message: "", show: false });
      }, 3000);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        isInFavourites: (id) => favourites.some((favourite) => favourite.id === id), // Check if a house is in the favourites
      }}
    >
      {children}
      {/* Display notification when necessary */}
      {notification.show && (
        <div className="notification">
          {notification.message}
        </div>
      )}
    </FavouritesContext.Provider>
  );
};
