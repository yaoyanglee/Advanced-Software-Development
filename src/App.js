import React from "react";

import Home from "./pages/Home";
import Login from './pages/Login'
import Signup from './pages/Signup'
import RegisterProperty from "./pages/RegisterProperty";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
           <Route path="/Login" element={<Login />} />
           <Route path="/Signup" element={<Signup />} />
           <Route path="/RegisterProperty" element={<RegisterProperty />} />
      </Routes>
    </>
  )
}

export default App;