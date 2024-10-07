import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RentPropertyModal from "../pages/RentPropertyModal"; // Adjust the path as needed
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import "@testing-library/jest-dom/extend-expect"; // For jest-dom matchers

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn().mockResolvedValue("mocked-download-url"),
}));

describe("RentPropertyModal Component", () => {
  const toggleModal = jest.fn();
  const modal = true;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {}); // Mock the alert
  });

  test("renders the modal with required form fields", () => {
    render(<RentPropertyModal modal={modal} toggleModal={toggleModal} />);

    expect(screen.getByText(/Upload Property for Rent/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Property Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Add a location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Beds/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Baths/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bond/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price per Week/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Agent\/Landlord Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/You are a/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/This is a/i)).toBeInTheDocument();
  });

  test("handles form input changes", () => {
    render(<RentPropertyModal modal={modal} toggleModal={toggleModal} />);

    fireEvent.change(screen.getByLabelText(/Property Name/i), {
      target: { value: "Test Property" },
    });
    fireEvent.change(screen.getByLabelText(/Number of Beds/i), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByLabelText(/Price per Week/i), {
      target: { value: "500" },
    });

    expect(screen.getByLabelText(/Property Name/i).value).toBe("Test Property");
    expect(screen.getByLabelText(/Number of Beds/i).value).toBe("3");
    expect(screen.getByLabelText(/Price per Week/i).value).toBe("500");
  });

  test("uploads a property when form is submitted", async () => {
    // Arrange: Render the component
    const toggleModal = jest.fn(); // Mock toggleModal function
    render(<RentPropertyModal modal={true} toggleModal={toggleModal} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Property Name/i), {
      target: { value: "Beautiful House" },
    });
    fireEvent.change(screen.getByLabelText(/Add a location/i), {
      target: { value: "123 Test St, Sydney, NSW 2000" },
    });
    fireEvent.change(screen.getByLabelText(/Number of Beds/i), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByLabelText(/Number of Baths/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/Price per Week/i), {
      target: { value: "500" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "123456789" },
    });
    fireEvent.change(screen.getByLabelText(/Agent\/Landlord Name/i), {
      target: { value: "John Doe" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Assert: Check if addDoc and uploadBytes were called
    await waitFor(() => {
      expect(addDoc).toHaveBeenCalled(); // Ensure addDoc was called
    });

    // Check if Snackbar is displayed
    expect(
      screen.getByText(/Property uploaded successfully!/i)
    ).toBeInTheDocument();
  });

  test("uploads an image file when file input is changed", async () => {
    // Arrange: Render the component
    const toggleModal = jest.fn(); // Mock toggleModal function
    render(<RentPropertyModal modal={true} toggleModal={toggleModal} />);

    // Simulate file upload
    const file = new File(["image content"], "test-image.png", {
      type: "image/png",
    });

    // Fill in the form (optional, you can skip this if only testing file upload)
    fireEvent.change(screen.getByLabelText(/Property Name/i), {
      target: { value: "Beautiful House" },
    });
    // Other form fields can be filled similarly if required...

    // Simulate file input change using role
    const fileInput = screen.getByTestId("img-input");
    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    // Assert: Check if the file is set correctly
    await waitFor(() => {
      const imageFiles = fileInput.files;
      expect(imageFiles).toHaveLength(1); // Ensure one file is uploaded
      expect(imageFiles[0].name).toBe("test-image.png"); // Ensure the correct file name
    });
  });

  test("displays an error message when form submission fails", async () => {
    // Arrange: Render the component
    render(<RentPropertyModal modal={true} toggleModal={toggleModal} />);

    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText(/Property Name/i), {
      target: { value: "Beautiful House" },
    });
    fireEvent.change(screen.getByLabelText(/Add a location/i), {
      target: { value: "123 Test St, Sydney, NSW 2000" },
    });
    fireEvent.change(screen.getByLabelText(/Number of Beds/i), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByLabelText(/Number of Baths/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/Price per Week/i), {
      target: { value: "500" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "123456789" },
    });
    fireEvent.change(screen.getByLabelText(/Agent\/Landlord Name/i), {
      target: { value: "John Doe" },
    });

    // Mock addDoc to throw an error
    addDoc.mockRejectedValue(new Error("Failed to upload"));

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Assert: Check if alert is shown with the error message
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Failed to upload property. Please try again."
      );
    });
  });
});
