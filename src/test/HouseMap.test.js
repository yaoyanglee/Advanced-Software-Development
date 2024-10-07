import React from 'react';
import { render, screen } from '@testing-library/react';
import { HouseContext } from '../components/HouseContext';
import HouseMap from '../components/HouseMap';
import { MemoryRouter } from 'react-router-dom';

const mockHouses = [
  { 
    address: { lat: -33.860664, lng: 151.208138 },
    propertyName: "House 1",
    price: 750000,
    RoS: "Sale",
    availability: true
  },
  { 
    address: { lat: -33.861664, lng: 151.209138 },
    propertyName: "House 2",
    price: 500,
    RoS: "Rent",
    availability: true
  },
];

jest.mock('../contexts/FavouritesContext', () => ({
  useFavourites: () => ({
    addToFavourites: jest.fn(),
    isInFavourites: jest.fn(() => false),
  }),
}));

describe('HouseMap', () => {
  test('displays loading spinner when loading', () => {
    render(
      <HouseContext.Provider value={{ houses: [], loading: true }}>
        <HouseMap />
      </HouseContext.Provider>
    );

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  test('displays no houses found message when no houses', () => {
    render(
      <HouseContext.Provider value={{ houses: [], loading: false }}>
        <HouseMap />
      </HouseContext.Provider>
    );
    expect(screen.getByText(/Sorry, no match found!/i)).toBeInTheDocument();
  });

  test('Map container is rendered', () => {
    render(
      <MemoryRouter>
        <HouseContext.Provider value={{ houses: mockHouses, loading: false }}>
          <HouseMap />
        </HouseContext.Provider>
      </MemoryRouter>
    );

    const mapContainer = screen.getByTestId('map'); 
    expect(mapContainer).toBeInTheDocument();
  });

  test('renders markers when houses are available', () => {
    render(
      <MemoryRouter>
        <HouseContext.Provider value={{ houses: mockHouses, loading: false }}>
          <HouseMap />
        </HouseContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/House 1/i)).toBeInTheDocument();
    expect(screen.getByText(/\$750,000/i)).toBeInTheDocument();
    expect(screen.getByText(/House 2/i)).toBeInTheDocument();
    expect(screen.getByText(/\$500/i)).toBeInTheDocument();
  });

  test('does not render markers when no houses are available', () => {
    render(
      <HouseContext.Provider value={{ houses: [], loading: false }}>
        <HouseMap />
      </HouseContext.Provider>
    );

    // Ensure markers are not rendered when no houses are available
    expect(screen.queryByText(/Lat:/i)).not.toBeInTheDocument();
  });

  test('does not render anything when loading', async () => {
    render(
      <HouseContext.Provider value={{ houses: [], loading: true }}>
        <HouseMap />
      </HouseContext.Provider>
    );

    // Ensure that the map container is not rendered
    expect(screen.queryByTestId('map')).not.toBeInTheDocument(); // Check that the map container is not present
    expect(screen.queryByText(/Sorry, no match found!/i)).not.toBeInTheDocument(); // Also check that no message is shown
    // Optionally, check for the spinner if you have one
    const spinner = document.querySelector('.animate-spin'); // Adjust this if your spinner has a different class
    expect(spinner).toBeInTheDocument(); // Ensure the spinner is rendered
  });
});
