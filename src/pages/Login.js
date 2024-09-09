import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../Firebase"; 
import { doc, getDoc } from "firebase/firestore";
import './Login&Signup&Reset.css';
import googleLogo from '../assets/img/googleIcon.png';
import { Link } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function LogIn() {
  // const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const userDoc = await getDoc(doc(db, "Users", user.uid));
      const userData = userDoc.data();
      const userName = userData.Name;
      console.log("User logged in successfully");
      localStorage.setItem("Name", userName);
      localStorage.setItem("Email", email);
      toast.success("Logged in successfully!", {
        position: "top-center",
      });
      window.location.href = "/UserHome";
    } catch (error) {
      console.log(error.message);
      toast.error("Invalid emaill or password", {
        position: "top-center",
      });
    }
  };

  const LoginWithGoogle = async () => {
    if (isGoogleSigningIn) return; // Prevent multiple popup requests
    setIsGoogleSigningIn(true); // Set flag to indicate the request is in progress

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const googleEmail = user.email;
      // Fetch the user from Firestore by email
      const userDoc = await getDoc(doc(db, "Users", user.uid));
      const userData = userDoc.data();
      const userName = userData.Name;
      localStorage.setItem("Name", userName);
      localStorage.setItem("Email", googleEmail);
      console.log(result);
      if (result.user) {
        toast.success("Logged in successfully!", {
          position: "top-center",
        });
        window.location.href = "/UserHome";
      }
    } catch (error) {
      console.error(error.message);
      toast.error("You need to sign up!", {
        position: "top-center",
      });
    } finally {
      setIsGoogleSigningIn(false); // Reset flag after the request is completed
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#4070f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="form-forms">
        <Link to="/">{'<Back'}</Link>
        <div className="form-content">
          <header>Login</header>
          <form onSubmit={handleLogIn}>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>
            <div className="form-link">
              <Link to="/Reset" className="forgot-pass">Forgot password?</Link>
            </div>
            <div className="field button-field">
              <button type="submit" className="pageButton">Login</button>
              <ToastContainer />
            </div>
          </form>
          <div className="form-link">
            <span>Don't have an account? <Link to="/Signup" className="link signup-link">Signup</Link></span>
          </div>
          <div className="line"></div>
          <div className="media-options">
            <button
              className="field google pageButton"
              onClick={LoginWithGoogle}
              disabled={isGoogleSigningIn}
            >
              <img src={googleLogo} alt="Google Icon" className="google-img" />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
