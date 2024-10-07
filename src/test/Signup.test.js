import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SignUp from '../pages/Signup'; // Adjust the path according to your project structure
import { auth } from '../Firebase'; // Import Firebase for mocking
import { Email } from '@mui/icons-material';

// Mock Firebase functions
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    setDoc: jest.fn(),
    doc: jest.fn((db, collectionName, uid) => ({ id: uid})), // Include collectionName for testing
  }));
  

jest.mock('../Firebase', () => ({
  auth: { currentUser: { email: 'testuser@example.com', uid: 'WJ3UwhgtZnXDkdTOf1Uor9d0AJA3' } },
  db: jest.fn(),
}));

describe('SignUp Component', () => {
  beforeEach(() => {
    // Clear the mocks before each test
    jest.clearAllMocks();
  });

  test('renders signup form correctly', () => {
    render(
      <BrowserRouter>
        <SignUp />
        <ToastContainer />
      </BrowserRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Create password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Please select your role from the following options:')).toBeInTheDocument();
    expect(screen.getByText('Agent')).toBeInTheDocument();
    expect(screen.getByText('Tenant')).toBeInTheDocument();
    expect(screen.getByText('Landlord')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Signup/i })).toBeInTheDocument();
    expect(screen.getByText('Sign up with Google')).toBeInTheDocument();
  });

  test('submits form with valid data and calls Firebase functions', async () => {
    const createUserWithEmailAndPassword = require('firebase/auth').createUserWithEmailAndPassword;
    createUserWithEmailAndPassword.mockResolvedValueOnce({ user: { email: 'testuser@example.com', uid: 'WJ3UwhgtZnXDkdTOf1Uor9d0AJA3' } });
    const setDoc = require('firebase/firestore').setDoc;
    const doc = require('firebase/firestore').doc;
  
    render(
      <BrowserRouter>
        <SignUp />
        <ToastContainer />
      </BrowserRouter>
    );
  
    // Fill the form
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Create password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Phone'), { target: { value: '123456789' } });
    fireEvent.click(screen.getByLabelText('Agent')); // Select role
  
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Signup/i }));
  
    // Wait for form submission to complete
    await waitFor(() => expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'testuser@example.com', 'password123'));
  
    // Ensure that doc returns the correct user UID and setDoc receives the correct data
    await waitFor(() => expect(doc).toHaveBeenCalledWith(expect.anything(), "Users", "WJ3UwhgtZnXDkdTOf1Uor9d0AJA3"));
  
    // Check that success message is shown
    expect(screen.getByText('Sign Up Account Successfully!')).toBeInTheDocument();
  });
  

  test('shows error message if user is already registered', async () => {
    const createUserWithEmailAndPassword = require('firebase/auth').createUserWithEmailAndPassword;
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('auth/email-already-in-use'));

    render(
      <BrowserRouter>
        <SignUp />
        <ToastContainer />
      </BrowserRouter>
    );

    // Fill the form
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Create password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Phone'), { target: { value: '123456789' } });
    fireEvent.click(screen.getByLabelText('Agent')); // Select role

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

    // Wait for form submission to complete
    await waitFor(() => expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'testuser@example.com', 'password123'));

    // Check that error message is shown
    expect(screen.getByText('The user has already registered!')).toBeInTheDocument();
  });
});
