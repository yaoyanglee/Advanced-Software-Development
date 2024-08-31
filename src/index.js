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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
