import { React, useState, useEffect } from "react";

import app from "../Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export default function RegisterProperty() {
  const [propList, setPropList] = useState([]);

  const db = getFirestore(app);

  const getData = async () => {
    const q = query(collection(db, "Properties"));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setPropList((propList) => [...propList, doc.data()]);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(propList);

  // console.log(q);
  // console.log("Hello World");

  return (
    <div>
      {propList.map((item, index) => (
        <div key={index}>{item.Name}</div>
      ))}
    </div>
  );
}
