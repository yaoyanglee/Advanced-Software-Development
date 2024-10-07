// HouseList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HouseContext } from '../components/HouseContext';
import { FavouritesContext } from '../contexts/FavouritesContext';
import HouseList from '../components/HouseList';
import { MemoryRouter } from 'react-router-dom';

const mockHouses = [
  {
    id: '1',
    propertyName: 'Example 1',
    price: 750000,
    availability: true,
    RoS: 'Sale',
    propertyType: 'Apartment',
    city: 'Ultimo',
    address: { description: '1 Test Address' },
    numberOfBeds: 3,
    numberOfBaths: 2,
    numCarpark: 1,
  },
  {
    id: '2',
    propertyName: 'Example 2',
    price: 500,
    availability: true,
    RoS: 'Rent',
    propertyType: 'House',
    city: 'Pyrmont',
    address: { description: '2 Test Address' },
    numberOfBeds: 2,
    numberOfBaths: 1,
    numCarpark: 0,
  },
];

jest.mock('../contexts/FavouritesContext', () => ({
  useFavourites: () => ({
    addToFavourites: jest.fn(),
    isInFavourites: jest.fn(() => false),
  }),
}));

describe('HouseList', () => {
  test('displays loading spinner when loading', () => {
    render(
      <HouseContext.Provider value={{ houses: [], loading: true }}>
        <HouseList />
      </HouseContext.Provider>
    );

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  test('displays message when no houses are available', () => {
    render(
      <HouseContext.Provider value={{ houses: [], loading: false }}>
        <HouseList />
      </HouseContext.Provider>
    );
    expect(screen.getByText(/Sorry, no match found!/i)).toBeInTheDocument();
  });

  test('renders available houses', () => {
    render(
      <MemoryRouter>
        <HouseContext.Provider value={{ houses: mockHouses, loading: false }}>
          <HouseList />
        </HouseContext.Provider>
      </MemoryRouter>
    );

    const house1Element = screen.getByText(/Example 1/i);
    expect(house1Element).toBeInTheDocument();
    const house2Element = screen.getByText(/Example 2/i);
    expect(house2Element).toBeInTheDocument();
  });
  test('displays correct price for each house', () => {
    render(
      <MemoryRouter>
        <HouseContext.Provider value={{ houses: mockHouses, loading: false }}>
          <HouseList />
        </HouseContext.Provider>
      </MemoryRouter>
    );

    const price1Element = screen.getByText(/\$750,000/i);
    expect(price1Element).toBeInTheDocument();

    const price2Element = screen.getByText(/\$500/i);
    expect(price2Element).toBeInTheDocument();
  });

  test('displays correct property type for each house', () => {
    render(
      <MemoryRouter>
        <HouseContext.Provider value={{ houses: mockHouses, loading: false }}>
          <HouseList />
        </HouseContext.Provider>
      </MemoryRouter>
    );

    const propertyType1 = screen.getByText(/Apartment/i);
    expect(propertyType1).toBeInTheDocument();

    const propertyType2 = screen.getByText(/House/i);
    expect(propertyType2).toBeInTheDocument();
  });

  test('displays address for each house', () => {
    render(
      <MemoryRouter>
        <HouseContext.Provider value={{ houses: mockHouses, loading: false }}>
          <HouseList />
        </HouseContext.Provider>
      </MemoryRouter>
    );
  
    expect(screen.getByText(/1 Test Address/i)).toBeInTheDocument();
    expect(screen.getByText(/2 Test Address/i)).toBeInTheDocument();
  });

});
