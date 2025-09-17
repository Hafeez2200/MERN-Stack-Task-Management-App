import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from 'axios';
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {

  const navigate = useNavigate();

  const initialValue = {
    username: "", 
    email: "",
    password: ""
  };
 const [value, setvalue] = useState(initialValue)

 async function registerUser(e){
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:1000/api/v1/register',value);
    alert(res.data.success);
    navigate("/login");
  } catch (error) {
    console.log(error.response.data.error);
    
  }
  
  
 }

 function inputChange(e){
  const name = e.target.name;
  
  setvalue({
    ...value,
    [name]: e.target.value
  })
  
 }
 

  return (
    <div className=" flex flex-col h-screen justify-center items-center">
      <div className="  w-[60vw] md:w-[50vw] lg:w-[30vw] mb-4">
        <h1 className=" text-3xl text-center font-bold text-blue-800 ">
          Task Managment App
        </h1>
        <h3 className=" text-center font-bold text-xinc-900 mt-2">
          Register to Task Management
        </h3>
      </div>
      <div className=" w-[60vw] md:w-[50vw] lg:w-[25vw] mt-4">
        <form onSubmit={registerUser} className=" flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="Username"
            name="username"
            className=" border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            value={value.username}
            onChange={inputChange}
          />
          <input
            type="email"
            required
            placeholder="Email"
            name="email"
            className=" border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            value={value.email}
            onChange={inputChange}
          />
          <input
            type="password"
            required
            placeholder="Password"
            name="password"
            className=" border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            value={value.password}
            onChange={inputChange}
          />
          <button type="submit" className=" bg-blue-800 py-2 text-white rounded font-semibold hover:bg-blue-700 transition-all duration-150">
            Register
          </button>
          <p className=" text-center text-gray-700 font-bold">Already have an account? <Link to="/login">Login</Link></p>
          
        </form>

      </div>
    </div>
  );
};

export default RegisterPage;
