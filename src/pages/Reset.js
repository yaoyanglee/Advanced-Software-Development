import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase";
import "./Login&Signup&reset.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!", {
        position: "top-center",
        autoClose: 5000,
        onClose: () => navigate("/Login"),
      });
    } catch (error) {
      console.error(error.message);
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
        <Link to="/">{"<Back"}</Link>
        <div className="form-content">
          <header>Reset Password</header>
          <form onSubmit={handleResetPassword}>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Enter your email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field button-field">
              <button type="submit" className="pageButton">
                Reset
              </button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Remember your password?{" "}
              <Link to="/Login" className="link login-link">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Reset;
