import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LogIn from '../pages/Login';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom'

// Mock Firebase auth and Firestore functions
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
  })),
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(
      <Router>
        <LogIn />
        <ToastContainer />
      </Router>
    );

    // Check that the email and password input fields are rendered
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    // Check that the login button is rendered
    expect(screen.getByRole('button', { name: 'email-login' })).toBeInTheDocument();
  });

  test('logs in with valid credentials', async () => {
    // Mock Firebase signInWithEmailAndPassword success response
    const mockUserCredential = {
      user: { uid: 'WJ3UwhgtZnXDkdTOf1Uor9d0AJA3', email: 'test2@test.com' },
    };
    signInWithEmailAndPassword.mockResolvedValueOnce(mockUserCredential);

    // Render the component
    render(
      <Router>
        <LogIn />
        <ToastContainer />
      </Router>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test2@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '123456' },
    });

    // Simulate form submission with more specific selector
    fireEvent.click(screen.getByRole('button', { name: 'email-login' }));

    // Wait for the async login action to resolve
    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test2@test.com',
        '123456'
      );
    });
  });

  test('shows error on invalid login', async () => {
    // Mock Firebase signInWithEmailAndPassword rejection
    const mockError = new Error('Invalid email or password');
    signInWithEmailAndPassword.mockRejectedValueOnce(mockError);

    // Render the component
    render(
      <Router>
        <LogIn />
        <ToastContainer />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
        target: { value: 'wrong@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('Password'), {
        target: { value: 'wrongpassword' },
      });
    
      // Simulate form submission
      fireEvent.click(screen.getByRole('button', { name: 'email-login' }));


      // Use waitFor to check if the toast message appears
      await waitFor(() =>
        expect(screen.queryByText('Invalid email or password')).toBeInTheDocument()
      ); 
     });
    
     test('successful Google login', async () => {
        // Mock successful signInWithPopup response
        const mockUser = {
          user: { uid: 'XMSkvllp8rhy3pQVgXFdl24Ari43', email: 'test@gmail.com' },
        };
        signInWithPopup.mockResolvedValueOnce(mockUser);
    
        render(
            <Router> {/* Wrap the LogIn component with Router */}
              <LogIn />
            </Router>
          );
          render(<ToastContainer />); // Ensure toast is available
    
        // Simulate Google login button click
        fireEvent.click(screen.getByRole('button', { name: 'google-login' }));
    
        // Check if signInWithPopup was called
        expect(signInWithPopup).toHaveBeenCalledWith(expect.any(Object), expect.any(GoogleAuthProvider));
      });
    
      test('Google login failure', async () => {
        // Mock signInWithPopup rejection (login failure)
        const mockError = new Error('Google login failed');
        signInWithPopup.mockRejectedValueOnce(mockError);
    
        render(
            <Router> {/* Wrap the LogIn component with Router */}
              <LogIn />
            </Router>
          );
          render(<ToastContainer />); // Ensure toast is available
    
        // Simulate Google login button click
        fireEvent.click(screen.getByRole('button', { name: 'google-login' }));
    
        // Check if signInWithPopup was called
        expect(signInWithPopup).toHaveBeenCalledWith(expect.any(Object), expect.any(GoogleAuthProvider));
    
        // Check if error toast is shown
        await waitFor(() => {
          expect(screen.getByText('You need to sign up!')).toBeInTheDocument();
        });

      });
  });
