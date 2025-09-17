import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("userLoggedIn")){
      navigate('/dashboard');
    }else{
      navigate('/login');
    }
  },[]);

  

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </>
  );
};

export default App;
