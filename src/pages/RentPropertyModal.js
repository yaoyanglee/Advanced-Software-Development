import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import app from "../Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getFirestore,
} from "firebase/firestore";

import "./UploadPropertyCss.css";

// Snackbar Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RentPropertyModal({ modal, toggleModal }) {
  const db = getFirestore(app);

  const [role, setRole] = useState(""); // State to track selected role
  const [propertyType, setPropertyType] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [numberOfBeds, setNumberOfBeds] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agentName, setAgentName] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Manages the opening and closing of the snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "Rent"), {
        propertyName,
        address,
        numberOfRooms,
        numberOfBeds,
        price,
        phoneNumber,
        agentName,
        role,
        propertyType,
        startDate,
        endDate,
      });
      setOpenSnackbar(true);
      // alert("Property uploaded successfully!");
      toggleModal(); // Close modal on successful submission
    } catch (error) {
      console.error("Error uploading property: ", error);
      alert("Failed to upload property. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* <Button onClick={toggleModal} color="primary" variant="contained">
        Upload Property
      </Button> */}
      <Dialog open={modal} fullWidth maxWidth="sm">
        <DialogTitle>
          Upload Property for Rent{" "}
          <IconButton onClick={toggleModal} style={{ float: "right" }}>
            <CloseIcon></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              label="Property Name"
              onChange={(e) => setPropertyName(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label="Number of rooms"
              onChange={(e) => setNumberOfRooms(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label="Number of beds"
              onChange={(e) => setNumberOfBeds(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label="Price per Week"
              onChange={(e) => setPrice(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label="Agent/Landlord Name"
              onChange={(e) => setAgentName(e.target.value)}
            ></TextField>

            <Stack direction="row" spacing={2}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Select Start Date"
                className="custom-datepicker"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Select End Date"
                className="custom-datepicker"
              />
            </Stack>

            <InputLabel id="role-select-label">You are a ...</InputLabel>
            <Select
              labelId="role-select-label"
              value={role}
              onChange={handleRoleChange}
              label="Role"
            >
              <MenuItem value="landlord">Landlord</MenuItem>
              <MenuItem value="agent">Agent</MenuItem>
            </Select>

            <InputLabel id="prop-type-select-label">This is a ...</InputLabel>
            <Select
              labelId="prop-type-select-label"
              value={propertyType}
              onChange={handlePropertyTypeChange}
              label="Property Type"
            >
              <MenuItem value="house">House</MenuItem>
              <MenuItem value="semi-detached">Semi-Detached</MenuItem>
              <MenuItem value="apartment">Apartment</MenuItem>
            </Select>

            {/* <FormControlLabel
              control={<Checkbox color="primary"></Checkbox>}
              label="I am an agent"
            ></FormControlLabel> */}

            <Button color="success" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>

          {/* <DialogContentText>This screen is upload property</DialogContentText> */}
        </DialogContent>
        <DialogActions>
          {/* <Button color="success" variant="contained">
            Submit
          </Button> */}
          {/* <Button onClick={toggleModal} color="error" variant="contained">
            Close
          </Button> */}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Property uploaded successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
