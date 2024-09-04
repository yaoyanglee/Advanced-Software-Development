import React, { useState, useEffect } from "react";
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
  Skeleton,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import app from "../Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getFirestore,
} from "firebase/firestore";

const GOOGLE_MAPS_API_KEY = "AIzaSyA7qPVACs1MeMVb_ELlxGABCGJgZx7t0S4";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

// Snackbar Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SellPropertyModal({ modal, toggleModal }) {
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

  // Edits start here
  const [avaDate, setAvaDate] = useState("");
  const [numCarpark, setNumCarpark] = useState("");

  // const [coordinates, setCoordinates] = useState({ lat: null, long: null });

  // Manages the opening and closing of the snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handlers for the google maps autocomplete
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  // Role was removed
  // const handleRoleChange = (event) => {
  //   setRole(event.target.value);
  // };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "Sell"), {
        propertyName,
        address,
        numberOfRooms,
        numberOfBeds,
        numCarpark,
        price,
        phoneNumber,
        agentName,
        propertyType,
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
          <IconButton
            onClick={toggleModal}
            style={{
              position: "absolute",
              top: "8px",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              label="Property Name"
              onChange={(e) => setPropertyName(e.target.value)}
            ></TextField>

            <Autocomplete
              sx={{ width: 300 }}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.description
              }
              filterOptions={(x) => x}
              options={options}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={value}
              noOptionsText="No locations"
              onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
                setAddress(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Add a location" fullWidth />
              )}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                const matches =
                  option.structured_formatting.main_text_matched_substrings ||
                  [];

                const parts = parse(
                  option.structured_formatting.main_text,
                  matches.map((match) => [
                    match.offset,
                    match.offset + match.length,
                  ])
                );
                return (
                  <li key={key} {...optionProps}>
                    <Grid container sx={{ alignItems: "center" }}>
                      <Grid item sx={{ display: "flex", width: 44 }}>
                        <LocationOnIcon sx={{ color: "text.secondary" }} />
                      </Grid>
                      <Grid
                        item
                        sx={{
                          width: "calc(100% - 44px)",
                          wordWrap: "break-word",
                        }}
                      >
                        {parts.map((part, index) => (
                          <Box
                            key={index}
                            component="span"
                            sx={{
                              fontWeight: part.highlight ? "bold" : "regular",
                            }}
                          >
                            {part.text}
                          </Box>
                        ))}
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {option.structured_formatting.secondary_text}
                        </Typography>
                      </Grid>
                    </Grid>
                  </li>
                );
              }}
            />

            {/* <GooglePlacesAutocomplete
              apiKey="AIzaSyA7qPVACs1MeMVb_ELlxGABCGJgZx7t0S4"
              selectProps={{
                styles: {
                  option: (provided) => ({
                    ...provided,
                    color: "purple",
                    backgroundColor: "white",
                    opacity: 1,
                  }),
                },
              }}
            /> */}

            {/* <TextField
              variant="outlined"
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
            ></TextField> */}

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
              label="Number of carparks"
              onChange={(e) => setNumCarpark(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label="Selling Price"
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

            {/* <InputLabel id="role-select-label">You are a ...</InputLabel>
            <Select
              labelId="role-select-label"
              value={role}
              onChange={handleRoleChange}
              label="Role"
            >
              <MenuItem value="landlord">Landlord</MenuItem>
              <MenuItem value="agent">Agent</MenuItem>
            </Select> */}

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
