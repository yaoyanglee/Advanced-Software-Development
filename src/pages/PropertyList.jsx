import React, { useEffect, useState } from "react";

import Firebase from '../Firebase'
import {
  collection,
  query,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export default function PropertyList () {

  const [propList, setPropList] = useState([]);  
  const db = getFirestore (Firebase);

  const fetchData = async () => {
    try {
      const q = query(collection(db, "Property")); // Correctly initialize the collection
      const querySnapShot = await getDocs(q);

      // Map the data correctly to avoid setting state multiple times in a loop
      const data = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPropList(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect ( () => { 
    fetchData();
  }, [])

  return (
    <div>
      <h1>Data from database:</h1>
      <ul style={{ listStyleType: 'disc' }}>
        {propList.map((item, index) => (
          <li key={index}>
          <p>Name is: {item.Name}</p>
          <p>Type is: {item.Type}</p>
          <p>Number of rooms are: {item.RoomNum}</p>
          <p>Number of bathrooms are: {item.BathNum}</p>
          <p>Weekly rent is: {item.Rent}</p>
          <br></br>
          </li>
        ))}
      </ul>
    </div>
  )
}

