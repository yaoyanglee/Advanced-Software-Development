import React, { useState, useEffect, useCallback } from "react";
import { collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../Firebase";
import ReactStars from "react-rating-stars-component";
import _ from "lodash";

const Rating = ({ propertyId }) => {
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [existingRatingId, setExistingRatingId] = useState(null);
  const [error, setError] = useState("");
  const [ratingExists, setRatingExists] = useState(false);

  // Fetch the user's existing rating (if any)
  useEffect(() => {
    const fetchUserRating = async () => {
      if (!auth.currentUser || !propertyId) return;
      const userId = auth.currentUser.uid;

      const q = query(
        collection(db, "ratings"),
        where("userId", "==", userId),
        where("propertyId", "==", propertyId)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const ratingData = querySnapshot.docs[0].data();
        setUserRating(ratingData.rating);
        setExistingRatingId(querySnapshot.docs[0].id);
        setRatingExists(true);
      }
    };

    fetchUserRating();
  }, [propertyId]);

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const handleAddOrUpdateRating = async () => {
    if (!propertyId) {
      setError("Property ID is missing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (existingRatingId) {
        const ratingDocRef = doc(db, "ratings", existingRatingId);
        await updateDoc(ratingDocRef, {
          rating: userRating,
          updatedAt: new Date(),
        });
        console.log("Rating updated successfully!");
      } else {
        await addDoc(collection(db, "ratings"), {
          rating: userRating,
          propertyId: propertyId,
          userId: auth.currentUser.uid,
          createdAt: new Date(),
        });
        console.log("Rating added successfully!");
        setRatingExists(true);
      }
    } catch (error) {
      console.error("Error adding/updating rating:", error);
      setError("Error submitting rating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced function to prevent rapid submissions
  const debouncedHandleAddOrUpdateRating = useCallback(_.debounce(handleAddOrUpdateRating, 500), [userRating, propertyId]);

  // Handle rating reset
  const handleResetRating = async () => {
    if (!existingRatingId) return;
    setLoading(true);

    try {
      const ratingDocRef = doc(db, "ratings", existingRatingId);
      await deleteDoc(ratingDocRef);
      setUserRating(0); // Reset user rating
      setExistingRatingId(null);
      setRatingExists(false);
      console.log("Rating reset successfully!");
    } catch (error) {
      console.error("Error resetting rating:", error);
      setError("Error resetting rating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Rate this property</h2>
      <div>
        <ReactStars
          count={5}
          onChange={handleRatingChange}
          size={40}
          activeColor="#ffd700"
          value={userRating}
          edit={!ratingExists || Boolean(existingRatingId)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Submit/Update button */}
      <button onClick={debouncedHandleAddOrUpdateRating} disabled={loading || (ratingExists && !existingRatingId)}>
        {loading ? "Submitting..." : existingRatingId ? "Update Rating" : "Submit Rating"}
      </button>

      {/* Reset button */}
      {ratingExists && (
        <button onClick={handleResetRating} disabled={loading} style={{ marginLeft: "10px" }}>
          {loading ? "Resetting..." : "Reset Rating"}
        </button>
      )}
    </div>
  );
};

export default Rating;
