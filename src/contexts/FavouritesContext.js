import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getFirestore,
  deleteDoc,
  doc,
} from "firebase/firestore";

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "favourites"));
        const favouritesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavourites(favouritesList);
        // console.log("Fetched favourites:", favouritesList); // Debugging output
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []); // Fetch once on component mount

  const addToFavourites = async (house) => {
    try {
      if (isInFavourites(house.id)) {
        return false; // Don't add if it's already in the list
      }

      const docRef = await addDoc(collection(db, "favourites"), house);
      setFavourites([...favourites, { ...house, id: docRef.id }]);
      return true;
    } catch (error) {
      console.error("Error adding to favourites:", error);
      return false;
    }
  };

  const removeFromFavourites = async (id) => {
    try {
      await deleteDoc(doc(db, "favourites", id));
      setFavourites(favourites.filter((house) => house.id !== id));
      console.log("Removed house with ID:", id); // Debugging output
    } catch (error) {
      console.error("Error removing document:", error);
    }
  };

  const isInFavourites = (id) => {
    return favourites.some((favourite) => favourite.id === id);
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
    </FavouritesContext.Provider>
  );
};

// export const FavouritesProvider = ({ children }) => {
//   const [favourites, setFavourites] = useState([]);

//   const addToFavourites = (house) => {
//     setFavourites([...favourites, house]);
//   };

//   const removeFromFavourites = (id) => {
//     setFavourites(favourites.filter((house) => house.id !== id));
//   };

//   const isInFavourites = (id) => {
//     return favourites.some((house) => house.id === id);
//   };

//   return (
//     <FavouritesContext.Provider
//       value={{
//         favourites,
//         addToFavourites,
//         removeFromFavourites,
//         isInFavourites,
//       }}
//     >
//       {children}
//     </FavouritesContext.Provider>
//   );
// };
