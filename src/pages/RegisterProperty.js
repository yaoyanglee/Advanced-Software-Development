import React from "react";

import app from "../Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export default function RegisterProperty() {
  const db = getFirestore(app);

  const getData = async () => {
    const q = query(collection(db, "Properties"));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };

  getData();
  // console.log(q);
  // console.log("Hello World");

  return <h1>Hello World</h1>;
}
