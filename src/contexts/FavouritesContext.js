import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Notification from "../contexts/Notification";

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    show: false,
  });

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "favourites"));
        const favouritesList = querySnapshot.docs.map((doc) => ({
          firestoreId: doc.id, // Firestore document ID
          ...doc.data(), // Custom data fields
        }));
        setFavourites(favouritesList);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []);

  // Check if the house is already in the list by custom id
  const isInFavourites = (id) => {
    return favourites.some((favourite) => favourite.id === id);
  };

  const addToFavourites = async (house) => {
    try {
      if (isInFavourites(house.id)) {
        setNotification({ message: "Already in the list", show: true });
        // Reset notification after showing
        setTimeout(() => {
          setNotification({ message: "", show: false });
        }, 3000);
        return false;
      }

      const docRef = await addDoc(collection(db, "favourites"), house);
      // Add the house using the Firestore document ID
      setFavourites([...favourites, { ...house, firestoreId: docRef.id }]);
      setNotification({ message: "Added to favourites", show: true });
      // Reset notification after showing
      setTimeout(() => {
        setNotification({ message: "", show: false });
      }, 3000);
      return true;
    } catch (error) {
      console.error("Error adding to favourites:", error);
      setNotification({ message: "Failed to add to favourites", show: true });
      // Reset notification after showing
      setTimeout(() => {
        setNotification({ message: "", show: false });
      }, 3000);
      return false;
    }
  };

  const removeFromFavourites = async (id) => {
    try {
      // Find the document by custom id in the Firestore collection
      const houseToDelete = favourites.find((house) => house.id === id);
      if (!houseToDelete) return;

      await deleteDoc(doc(db, "favourites", houseToDelete.firestoreId));
      setFavourites(favourites.filter((house) => house.id !== id));
      setNotification({ message: "Removed from favourites", show: true });
      // Reset notification after showing
      setTimeout(() => {
        setNotification({ message: "", show: false });
      }, 3000);
    } catch (error) {
      console.error("Error removing document:", error);
      setNotification({
        message: "Failed to remove from favourites",
        show: true,
      });
      // Reset notification after showing
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
        isInFavourites,
      }}
    >
      {children}
      <Notification message={notification.message} show={notification.show} />
    </FavouritesContext.Provider>
  );
};
