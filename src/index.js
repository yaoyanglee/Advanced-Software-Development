import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import HouseContextProvider from "./components/HouseContext";  // Importing the context provider
import { FavouritesProvider } from "./contexts/FavouritesContext";  // Assuming you also have this context

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FavouritesProvider>
    <HouseContextProvider>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </HouseContextProvider>
  </FavouritesProvider>
);
