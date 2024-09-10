import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, updatePassword, signOut } from "firebase/auth"; // For password update
import {
  doc,
  updateDoc,
  getFirestore,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore"; // For updating account
import UserNavbar from "../components/UserNavbar";
import RentPropertyModal from "./RentPropertyModal";
import SellPropertyModal from "./SellPropertyModal";

const Account = () => {
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);

  //   This is for retrieving user information
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  // Retrieving user information by their emails
  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userEmail = user.email; // Get the email of the current user

        try {
          // Query the Users collection where the email matches the user's email
          const q = query(
            collection(db, "Users"),
            where("Email", "==", userEmail)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]; // Assuming the email is unique
            const data = userDoc.data();

            setUserData({
              name: data.Name,
              email: data.Email,
              phoneNumber: data.PhoneNum,
              status: data.Status,
            });
          } else {
            console.log("No user found with that email.");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No user is signed in.");
      }
    };

    fetchUser();
  }, [db, user]);

  const toggleRentModal = () => setRentModal(!rentModal);
  const toggleSellModal = () => setSellModal(!sellModal);

  console.log("Currently logged in user: ", userData);

  const handleAccountUpdate = async () => {
    if (user) {
      const userRef = doc(db, "Users", user.uid);
      try {
        await updateDoc(userRef, {
          Name: userData.name,
          PhoneNum: userData.phoneNumber,
        });
        toast.success("Account updated successfully!");
      } catch (error) {
        console.error("Error updating user data: ", error);
        toast.error("Error updating account: " + error.message);
      }
    }
  };

  //   This section is for managing password changes
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = async () => {
    if (newPassword) {
      try {
        await updatePassword(user, newPassword);
        // toast.success("Password updated successfully!");
        setNewPassword(""); // Clear the input field after successful update

        // // Log out the user
        // await signOut(auth);

        // // Optionally redirect to login page or another route
        // window.location.href = "/Login"; // Adjust this route as needed

        toast.success("Password updated successfully! Logging out...", {
          autoClose: 1000,
          onClose: () => {
            // Redirect to login page after a delay
            setTimeout(() => {
              signOut(auth).then(() => {
                window.location.href = "/Login"; // Adjust this route as needed
              });
            }, 0); // 1.5 second delay
          },
        });
      } catch (error) {
        toast.error("Error updating password: " + error.message);
      }
    } else {
      toast.warn("Please enter a new password.");
    }
  };

  //   This section is for deleting accounts
  const deactivateAccount = async () => {
    if (user) {
      try {
        // Optionally, delete user-related data from Firestore
        const userDocRef = doc(db, "Users", user.uid);
        await deleteDoc(userDocRef);

        // Delete the user from Firebase Authentication
        await user.delete();
        console.log("User account and data deleted successfully.");

        // Optionally, redirect to login or home page
        window.location.href = "/Login"; // Example redirect
      } catch (error) {
        console.error("Error deleting user: ", error);
        // Handle errors, e.g., show a message to the user
      }
    } else {
      console.log("No user is signed in.");
    }
  };

  //   const freezeAccount = () => {
  //     handleAccountUpdate("status", "frozen");
  //     alert("Your account has been frozen.");
  //   };

  return (
    <div className="min-h-[1800px] ">
      <UserNavbar
        toggleRentModal={toggleRentModal}
        toggleSellModal={toggleSellModal}
      />
      <RentPropertyModal modal={rentModal} toggleModal={toggleRentModal} />
      <SellPropertyModal modal={sellModal} toggleModal={toggleSellModal} />

      <Card style={{ margin: "20px", padding: "20px" }}>
        <CardContent>
          <Typography variant="h5">Manage Account</Typography>
          <Divider style={{ margin: "20px 0" }} />

          {/* Account Details */}
          <Typography variant="h6">Account Details</Typography>
          <TextField
            label="Name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            fullWidth
            style={{ marginBottom: "16px" }}
          />
          <TextField
            label="Email"
            value={userData.email}
            disabled
            fullWidth
            style={{ marginBottom: "16px" }}
          />
          <TextField
            label="Phone"
            value={userData.phoneNumber}
            onChange={(e) =>
              setUserData({ ...userData, phoneNumber: e.target.value })
            }
            fullWidth
          />

          {/* Confirm Changes Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAccountUpdate}
            style={{ marginTop: "20px" }}
          >
            Confirm Changes
          </Button>

          {/* Password Change */}
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Change Password
          </Typography>
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <Button variant="contained" onClick={handlePasswordChange}>
            Change Password
          </Button>

          {/* Account Actions */}
          <Button
            variant="outlined"
            onClick={deactivateAccount}
            // style={{ margin: "10px" }}
            color="error"
            sx={{ display: "block", marginTop: "20px" }}
          >
            Deactivate Account
          </Button>
          {/* <Button
            variant="outlined"
            onClick={freezeAccount}
            style={{ margin: "10px" }}
          >
            Freeze Account
          </Button> */}
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Account;
