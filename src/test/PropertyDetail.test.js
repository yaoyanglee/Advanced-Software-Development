import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PropertyDetail from "../pages/PropertyDetail";
import '@testing-library/jest-dom';
import { useParams } from "react-router-dom";
import { getDoc, doc, addDoc, collection } from "firebase/firestore"; // Include addDoc
import { ToastContainer } from "react-toastify";

// Mock Firestore functions
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  addDoc: jest.fn(), // Mock addDoc for submitting enquiry
  collection: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("PropertyDetail Component", () => {
  beforeEach(() => {
    // Mock the houseID
    useParams.mockReturnValue({ id: "B8XlsmrB3Sqk39QV6N1o" });
    
    // Mock the Date object globally
    const mockDate = new Date('2024-10-04T12:13:17.518Z');
    global.Date = jest.fn(() => mockDate);  // Mock Date constructor
    global.Date.now = jest.fn(() => mockDate.getTime());  // Mock Date.now
  });

  afterEach(() => {
    jest.clearAllMocks();  // Clear mocks after each test
  });

  test("loads and displays property details based on houseID", async () => {
    const mockHouseData = {
      propertyName: "64/209 Harris Street",
      address: { description: "64/209 Harris Street, Pyrmont NSW 2009, Australia" },
      numberOfBeds: 2,
      numberOfBaths: 2,
      numCarpark: 1,
      price: 900,
      RoS: "Rent",
      agentEmail: "felix@example.com",
      agentName: "Felix",
      phoneNumber: "466786981",
      imageUrl: "", // Default image used if not available
      propertyType: "apartment",
    };

    // Mock Firestore to return the house data when getDoc is called
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => mockHouseData,
    });

    render(
      <Router>
        <PropertyDetail />
        <ToastContainer />
      </Router>
    );
    
    await waitFor(() => {
      // Check that the address, beds, baths, carparks, and property type are displayed
      expect(screen.getByText("64/209 Harris Street, Pyrmont NSW 2009, Australia")).toBeInTheDocument();
      expect(screen.getByText("2 Beds")).toBeInTheDocument();
      expect(screen.getByText("2 Baths")).toBeInTheDocument();
      expect(screen.getByText("1 Carparks")).toBeInTheDocument();
      expect(screen.getByText("apartment")).toBeInTheDocument();
      expect(screen.getByText("$900 /pw")).toBeInTheDocument();
      expect(screen.getByText("Felix")).toBeInTheDocument();
      expect(screen.getByText("466786981")).toBeInTheDocument();
    });
  });
  
});
