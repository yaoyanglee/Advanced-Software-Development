import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../Firebase";
import { setDoc, doc } from "firebase/firestore";
import "./Login&Signup&reset.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GoogleSignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  const SignUpWithGoogle = async (e) => {
    e.preventDefault();
    if (isGoogleSigningIn) return;
    setIsGoogleSigningIn(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Get user details from Google auth result
      const user = result.user;
      const googleEmail = user.email;
      const userId = user.uid;
      // Save user info to Firestore
      await setDoc(doc(db, "Users", userId), {
        Emial: googleEmail,
        Name: name,
        PhoneNum: phone,
        Status: status,
      });

      // Show success message and navigate to login
      toast.success("Signed up successfully!", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => navigate("/Login"),
      });
    } catch (error) {
      toast.error("Invalid access code!", { position: "top-center" });
      setIsGoogleSigningIn(false);
      return;
    } finally {
      setIsGoogleSigningIn(false);
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
            <form onSubmit={SignUpWithGoogle}>
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
                <button type="submit" className="pageButton">
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
        </div>
      </div>
    </div>
  );
}

export default GoogleSignUp;
