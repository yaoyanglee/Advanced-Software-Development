import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Favourites from "../pages/Favourites";
import { useAuth } from "../contexts/AuthContext";
import { useFavourites } from "../contexts/FavouritesContext";

jest.mock("../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../contexts/FavouritesContext", () => ({
  useFavourites: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Favourites Component", () => {
  it("shows login message if user is not logged in", () => {
    useAuth.mockReturnValue({ user: null });

    useFavourites.mockReturnValue({
      favourites: [],
      removeFromFavourites: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Favourites />
      </MemoryRouter>
    );

    expect(screen.getByText(/Please log in to see your favourites./i)).toBeInTheDocument();
  });

  it("displays favourite properties if user is logged in", () => {
    useAuth.mockReturnValue({ user: { email: "test@example.com" } });

    useFavourites.mockReturnValue({
      favourites: [
        {
          id: "1",
          propertyName: "Test Property",
          price: "$1000",
          RoS: "Rent",
          city: "Test City",
          address: { description: "123 Test Street" },
          numberOfRooms: 3,
          numberOfBath: 2,
        },
      ],
      removeFromFavourites: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Favourites />
      </MemoryRouter>
    );

    expect(screen.getByText(/Test Property/i)).toBeInTheDocument();
  });

  it("removes a property from favourites when clicking Remove button", () => {
    const removeFromFavouritesMock = jest.fn();

    useAuth.mockReturnValue({ user: { email: "test@example.com" } });

    useFavourites.mockReturnValue({
      favourites: [
        {
          id: "1",
          propertyName: "Test Property",
          price: "$1000",
          RoS: "Rent",
          city: "Test City",
          address: { description: "123 Test Street" },
          numberOfRooms: 3,
          numberOfBath: 2,
        },
      ],
      removeFromFavourites: removeFromFavouritesMock,
    });

    render(
      <MemoryRouter>
        <Favourites />
      </MemoryRouter>
    );

    const removeButton = screen.getByText(/Remove/i);
    removeButton.click();

    expect(removeFromFavouritesMock).toHaveBeenCalledWith("1");
  });

  // New Test Case 1: Shows a message when there are no favourite properties (Exact Match)
  it("shows a message when there are no favourite properties (Exact Match)", () => {
    useAuth.mockReturnValue({ user: { email: "test@example.com" } });

    useFavourites.mockReturnValue({
      favourites: [],
      removeFromFavourites: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Favourites />
      </MemoryRouter>
    );

    // Updated expected text to match what's in the DOM
    expect(screen.getByText(/No favorite properties yet./i)).toBeInTheDocument();
  });

  // New Test Case 1 (Alternate): Shows a message when there are no favourite properties (Flexible Match)
  it("shows a message when there are no favourite properties (Flexible Match)", () => {
    useAuth.mockReturnValue({ user: { email: "test@example.com" } });

    useFavourites.mockReturnValue({
      favourites: [],
      removeFromFavourites: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Favourites />
      </MemoryRouter>
    );

    // Using a function matcher for more flexibility
    expect(screen.getByText((content) =>
      content.includes("No favorite properties"))).toBeInTheDocument();
  });

  // New Test Case 2: Displays multiple favourite properties
  it("displays multiple favourite properties if user has more than one favourite", () => {
    useAuth.mockReturnValue({ user: { email: "test@example.com" } });

    useFavourites.mockReturnValue({
      favourites: [
        {
          id: "1",
          propertyName: "Property One",
          price: "$1000",
          RoS: "Rent",
          city: "City One",
          address: { description: "123 One Street" },
          numberOfRooms: 2,
          numberOfBath: 1,
        },
        {
          id: "2",
          propertyName: "Property Two",
          price: "$2000",
          RoS: "Rent",
          city: "City Two",
          address: { description: "456 Two Avenue" },
          numberOfRooms: 3,
          numberOfBath: 2,
        },
      ],
      removeFromFavourites: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Favourites />
      </MemoryRouter>
    );

    expect(screen.getByText(/Property One/i)).toBeInTheDocument();
    expect(screen.getByText(/Property Two/i)).toBeInTheDocument();
  });
});
