import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import { setDoc, doc } from "firebase/firestore";
import "./form.css";
import googleLogo from "../assets/img/googleIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          Name: name,
          Email: user.email,
          PhoneNum: phone,
          Status: status,
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("Sign Up Account Successfully!", {
        position: "top-center",
        autoClose: 5000,
        onClose: () => navigate("/Login"),
      });
    } catch (error) {
      let errorMessage = "";
      if (error.message.includes("auth/weak-password")) {
        errorMessage = "Password should be at least 6 characters";
      } else if (error.message.includes("auth/invalid-email")){
        errorMessage = "Invalid email used for sign up";
      } else {
        errorMessage = "Email already be used for sign up";
      }
      toast.error(errorMessage, {
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
      <div>
        <div className="form-forms">
          <Link to="/">{"<Back"}</Link>
          <div className="form-content">
            <header>Signup</header>
            <form onSubmit={handleSignUp}>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                  placeholder="Create password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="field input-field">
                <input
                  type="phone"
                  placeholder="Phone"
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>
              <div>
                <a style={{ fontSize: "14px" }}>
                  Please select your role from the following options:
                </a>
              </div>
              <div className="field radio-field">
                <label>
                  <input
                    type="radio"
                    name="status" // All radio buttons share the same name
                    value="Agent"
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  />
                  Agent
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Tenant"
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  />
                  Tenant
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Landlord"
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  />
                  Landlord
                </label>
              </div>
              <div className="field button-field">
                <button type="submit" className="pageButton" aria-label="signup">
                  Signup
                </button>
                <ToastContainer />
              </div>
            </form>
            <div className="form-link">
              <span>
                Already have an account?{" "}
                <Link to="/Login" type="submit">
                  Login
                </Link>
              </span>
            </div>
          </div>
          <div className="line"></div>
          <div className="media-options">
            <Link to="/GoogleSignUp">
              <button
                className="field google pageButton"
                disabled={isGoogleSigningIn}
              >
                <img
                  src={googleLogo}
                  alt="Google Icon"
                  className="google-img"
                />
                <span>Sign up with Google</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
