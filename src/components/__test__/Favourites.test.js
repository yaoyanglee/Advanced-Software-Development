import { render, screen, fireEvent } from '@testing-library/react';
import Favourites from '../../pages/Favourites';
import { FavouritesProvider } from '../../contexts/FavouritesContext';
import { getDocs, deleteDoc, collection, getFirestore } from "firebase/firestore";

// Mocking the Firestore methods, including getFirestore
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),  // Mocking getFirestore
  getDocs: jest.fn(),
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  addDoc: jest.fn(),
}));

// Mock data for Firestore documents
const mockFavourites = [
  {
    id: 1,
    propertyName: 'Lovely House',
    propertyType: 'Apartment',
    city: 'Sydney',
    price: 1500,
    RoS: 'Rent',
    numberOfRooms: 3,
    numberOfBath: 2,
    address: { description: '123 Main St' },
  },
  {
    id: 2,
    propertyName: 'Beachside Villa',
    propertyType: 'Villa',
    city: 'Bondi',
    price: 2500,
    RoS: 'Sell',
    numberOfRooms: 5,
    numberOfBath: 4,
    address: { description: '456 Beach St' },
  },
];

// Setting up the mock response for getDocs
beforeEach(() => {
  getDocs.mockResolvedValue({
    docs: mockFavourites.map((favourite) => ({
      id: favourite.id,
      data: () => favourite,
    })),
  });
});

describe('Favourites Component', () => {
  it('removes a property from favourites', async () => {
    render(
      <FavouritesProvider>
        <Favourites />
      </FavouritesProvider>
    );

    // Verify that the properties are displayed
    expect(screen.getByText('Lovely House')).toBeInTheDocument();
    expect(screen.getByText('Beachside Villa')).toBeInTheDocument();

    // Click "Remove" button for the first property
    const removeButton = screen.getAllByText('Remove')[0];
    fireEvent.click(removeButton);

    // Verify that the deleteDoc function is called
    expect(deleteDoc).toHaveBeenCalled();
  });
});
