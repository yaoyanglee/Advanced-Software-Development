import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HouseContextProvider, { HouseContext } from '../components/HouseContext';
import React from 'react';
import { getDocs, query, collection } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(() => ({})), 
    collection: jest.fn(),
    query: jest.fn(),
    getDocs: jest.fn(),
}));
  
describe('HouseContextProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing and provides default values', async () => {
    render(
      <HouseContextProvider>
        <HouseContext.Consumer>
          {value => (
            <>
              <div data-testid="city">{value.city}</div>
              <div data-testid="type">{value.type}</div>
              <div data-testid="RoS">{value.RoS}</div>
              <div data-testid="price">{value.price}</div>
            </>
          )}
        </HouseContext.Consumer>
      </HouseContextProvider>
    );

    // Use waitFor to wait for potential async state updates
    await waitFor(() => {
      expect(screen.getByTestId('city')).toHaveTextContent('');
      expect(screen.getByTestId('type')).toHaveTextContent('');
      expect(screen.getByTestId('RoS')).toHaveTextContent('');
      expect(screen.getByTestId('price')).toHaveTextContent('Price range (any)');
    });
  });

  test('fetches and filters houses correctly', async () => {
    // Mock successful data fetching from Firebase
    const rentData = [
      { id: '1', city: 'Ultimo', price: '1500', propertyType: 'Apartment', RoS: 'Rent' },
      { id: '2', city: 'Paramatta', price: '25000000', propertyType: 'House', RoS: 'Sell' },
    ];

    getDocs.mockResolvedValueOnce({
      docs: rentData.map(data => ({ id: data.id, data: () => data })),
    });
    
    // Mock the second query for Sell data
    const sellData = [
      { id: '3', city: 'Pyrmont', price: '20000000', propertyType: 'Semi-detached', RoS: 'Sell' },
    ];

    getDocs.mockResolvedValueOnce({
      docs: sellData.map(data => ({ id: data.id, data: () => data })),
    });

    render(
      <HouseContextProvider>
        <HouseContext.Consumer>
          {({ houses, handleClick, setCity }) => (
            <>
              <button onClick={handleClick}>Filter Houses</button>
              <ul>
                {houses.map(house => (
                  <li key={house.id} data-testid="house-item">{house.city}</li>
                ))}
              </ul>
            </>
          )}
        </HouseContext.Consumer>
      </HouseContextProvider>
    );

    // Wait for the async effect to finish
    await waitFor(() => {
      expect(getDocs).toHaveBeenCalledTimes(2); // Ensure that getDocs was called twice for Rent and Sell
    });

    // Click the filter button to trigger filtering
    fireEvent.click(screen.getByText('Filter Houses'));

    // Check that houses are displayed
    const houseListItems = screen.getAllByTestId('house-item');
    expect(houseListItems.length).toBe(3); // Expecting three houses to be rendered
    expect(houseListItems[0]).toHaveTextContent('Ultimo');
    expect(houseListItems[1]).toHaveTextContent('Paramatta');
    expect(houseListItems[2]).toHaveTextContent('Pyrmont');
  });

  test('shows error message when data fetching fails', async () => {
    // Mock an error during Firebase fetching
    const errorMessage = 'Failed to fetch data';
    getDocs.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <HouseContextProvider>
        <HouseContext.Consumer>
          {({ error }) => (
            <div>{error ? 'Error loading data' : 'Data loaded'}</div>
          )}
        </HouseContext.Consumer>
      </HouseContextProvider>
    );

    // Wait for the async effect to finish
    await waitFor(() => {
      expect(screen.getByText('Error loading data')).toBeInTheDocument();
    });
  });
  afterAll(() => {
    // This is where you can close any open connections or perform any necessary cleanup
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
});
