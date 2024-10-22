import { render, screen, fireEvent } from "@testing-library/react";
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
  it("displays favourite properties if user is logged in", () => {
    useAuth.mockReturnValue({ user: { email: "test@example.com" } });

    useFavourites.mockReturnValue({
      favourites: [
        {
          id: "1",
          propertyName: "Test Property",
          price: "1000",
          RoS: "Rent",
          city: "Test City",
          address: { description: "123 Test Street" },
          numberOfBeds: 3,
          numberOfBaths: 2,
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
    expect(screen.getByText(/123 Test Street/i)).toBeInTheDocument();
  });

  it("filters and displays only Rent properties", () => {
    useAuth.mockReturnValue({ user: { email: "test@example.com" } });

    useFavourites.mockReturnValue({
      favourites: [
        {
          id: "1",
          propertyName: "Rent Property",
          price: "1000",
          RoS: "Rent",
          city: "Rent City",
          address: { description: "123 Rent Street" },
          numberOfBeds: 2,
          numberOfBaths: 1,
        },
        {
          id: "2",
          propertyName: "Sell Property",
          price: "2000",
          RoS: "Sell",
          city: "Sell City",
          address: { description: "456 Sell Avenue" },
          numberOfBeds: 3,
          numberOfBaths: 2,
        },
      ],
      removeFromFavourites: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Favourites />
      </MemoryRouter>
    );

    const filterSelect = screen.getByLabelText(/Show:/i);
    fireEvent.change(filterSelect, { target: { value: "Rent" } });

    expect(screen.getByText(/Rent Property/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sell Property/i)).not.toBeInTheDocument();
  });

  it("removes a property from favourites when clicking Remove button", () => {
    const removeFromFavouritesMock = jest.fn();

    useAuth.mockReturnValue({ user: { email: "test@example.com" } });

    useFavourites.mockReturnValue({
      favourites: [
        {
          id: "1",
          propertyName: "Test Property",
          price: "1000",
          RoS: "Rent",
          city: "Test City",
          address: { description: "123 Test Street" },
          numberOfBeds: 3,
          numberOfBaths: 2,
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
    fireEvent.click(removeButton);

    expect(removeFromFavouritesMock).toHaveBeenCalledWith("1");
  });

  it("shows a message when there are no favourite properties", () => {
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

    expect(screen.getByText(/No favorite properties yet./i)).toBeInTheDocument();
  });

  it("displays multiple favourite properties", () => {
    useAuth.mockReturnValue({ user: { email: "test@example.com" } });

    useFavourites.mockReturnValue({
      favourites: [
        {
          id: "1",
          propertyName: "Property One",
          price: "1000",
          RoS: "Rent",
          city: "City One",
          address: { description: "123 One Street" },
          numberOfBeds: 2,
          numberOfBaths: 1,
        },
        {
          id: "2",
          propertyName: "Property Two",
          price: "2000",
          RoS: "Sell",
          city: "City Two",
          address: { description: "456 Two Avenue" },
          numberOfBeds: 3,
          numberOfBaths: 2,
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
