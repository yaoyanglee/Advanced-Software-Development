import { useState, useEffect } from 'react';
import Firebase from './Firebase'; // Ensure this path is correct
import {
  collection,
  query,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

const useHousesData = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore(Firebase);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rentQuery = query(collection(db, 'Rent'));
        const rentSnapShot = await getDocs(rentQuery);
        const rentData = rentSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const sellQuery = query(collection(db, 'Sell'));
        const sellSnapShot = await getDocs(sellQuery);
        const sellData = sellSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setHouses([...rentData, ...sellData]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [db]);
  //console.log(houses);
  return { houses, loading, error };
};

export default useHousesData;
