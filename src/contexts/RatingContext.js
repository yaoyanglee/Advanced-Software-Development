// RatingContext.js
import React, { createContext, useState, useEffect } from "react";
import { db } from "../Firebase"; // Import Firebase instance
import { collection, doc, getDocs, addDoc, updateDoc, query, where } from "firebase/firestore";

export const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState([]);
  const ratingsRef = collection(db, "Ratings");

  useEffect(() => {
    // Fetch initial ratings from Firestore
    const fetchRatings = async () => {
      const querySnapshot = await getDocs(ratingsRef);
      const ratingsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRatings(ratingsData);
    };

    fetchRatings();
  }, []);

  const addOrUpdateRating = async (houseId, userId, newRating) => {
    const existingRating = ratings.find((r) => r.houseId === houseId && r.userId === userId);

    if (existingRating) {
      // Update existing rating
      const ratingDocRef = doc(db, "Ratings", existingRating.id);
      await updateDoc(ratingDocRef, { rating: newRating });
      setRatings((prev) =>
        prev.map((r) => (r.id === existingRating.id ? { ...r, rating: newRating } : r))
      );
    } else {
      // Add new rating
      const newRatingDoc = await addDoc(ratingsRef, { houseId, userId, rating: newRating });
      setRatings((prev) => [...prev, { houseId, userId, rating: newRating, id: newRatingDoc.id }]);
    }
  };

  const getHouseAverageRating = (houseId) => {
    const houseRatings = ratings.filter((r) => r.houseId === houseId);
    const averageRating =
      houseRatings.reduce((total, r) => total + r.rating, 0) / houseRatings.length || 0;
    return averageRating.toFixed(1);
  };

  return (
    <RatingContext.Provider value={{ ratings, addOrUpdateRating, getHouseAverageRating }}>
      {children}
    </RatingContext.Provider>
  );
};
