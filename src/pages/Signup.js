import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase"; 
import {setDoc, doc} from "firebase/firestore";
import './Login&Signup&reset.css';
import googleLogo from '../assets/img/googleIcon.png'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
   
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db,"Users", user.uid), {
          Name: name,
          Email: user.email,
          Password: password,
          Phone: phone,
        });    
      }
      console.log("User Registered Successfully!!");
      toast.success("Sign Up Accounct Successfully!", {
        position: "top-center",
      });
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
    <div>
     <div className="form-forms">
      <Link to= "/">Back</Link>
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
            <div className="field button-field">
                <button type="submit">Signup</button>
                <ToastContainer />
            </div>
            </form>
            <div className="form-link">
            <span>Already have an account? <Link to= "/Login"type ="submit">Login</Link></span>
            </div>
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
    </div> 
  );
}

export default SignUp;
