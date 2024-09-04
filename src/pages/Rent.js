import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../Firebase"; // Adjust the import path as necessary
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from "@mui/material";
import Navbar from "../components/Navbar";
import RentPropertyModal from "./RentPropertyModal";
import SellPropertyModal from "./SellPropertyModal";

const Rent = () => {
  const db = getFirestore(app);

  //   For the navbar
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);

  const toggleRentModal = () => {
    setRentModal(!rentModal);
  };

  const toggleSellModal = () => {
    setSellModal(!sellModal);
  };

  //   For retrieving houses from firebase
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Rent")); // Replace 'Rent' with your Firestore collection name
        const housesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            propertyName: data.propertyName,
            propertyType: data.propertyType,
            address: data.address?.description || "No address provided",
            numberOfBeds: data.numberOfBeds,
            numberOfRooms: data.numberOfRooms,
            avaDate: data.avaDate?.toDate().toLocaleDateString() || "N/A",
            price: data.price,
            agentName: data.agentName,
            phoneNumber: data.phoneNumber,
          };
        });
        setHouses(housesData);
      } catch (error) {
        console.error("Error fetching houses: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <Navbar
        toggleRentModal={toggleRentModal}
        toggleSellModal={toggleSellModal}
      />
      <RentPropertyModal modal={rentModal} toggleModal={toggleRentModal} />
      <SellPropertyModal modal={sellModal} toggleModal={toggleSellModal} />
      <Container sx={{ paddingTop: 4 }}>
        <List>
          {houses.map((house) => (
            <ListItem key={house.id}>
              <ListItemText
                primary={house.propertyName}
                secondary={
                  <>
                    <Typography variant="body2">
                      <strong>Type:</strong> {house.propertyType}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Address:</strong> {house.address}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Beds:</strong> {house.numberOfBeds}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Rooms:</strong> {house.numberOfRooms}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Available From:</strong> {house.avaDate}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Price:</strong> ${house.price}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Agent:</strong> {house.agentName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Phone:</strong> {house.phoneNumber}
                    </Typography>
                  </>
                }
              />
              <Divider sx={{ my: 2 }} />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Rent;
