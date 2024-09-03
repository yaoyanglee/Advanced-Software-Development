import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase"; 
import './Login&Signup.css';
import googleLogo from '../assets/img/googleIcon.png'
import { Link } from "react-router-dom";
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      toast.success("Sign Up Accounct Successfully!", {
        position: "top-center",
      });
      window.location.href="/";
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center",
      });
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
            <Link to= "/">Back</Link>
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
                <a href="#" className="forgot-pass">Forgot password?</a>
                </div>
                <div className="field button-field">
                <button type="submit">Login</button>
                </div>
            </form>
            <div className="form-link">
                <span>Don't have an account? <Link to="/Signup" className="link signup-link">Signup</Link></span>
            </div>
            <div className="line"></div>
            <div className="media-options">
                <a href="#" className="field google">
                <img src={googleLogo} alt="Google Icon" className="google-img" />
                <span>Login with Google</span>
                </a>
            </div>
            </div>
        </div>
        <ToastContainer 
         style={{
         width: "400px",
         height: "20px",  
        }}
       />
    </div>
  );
}

export default LogIn;
