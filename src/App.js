import React from "react";

import Home from "./pages/Home";
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
           <Route path="/Login" element={<Login />} />
           <Route path="/Signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App;