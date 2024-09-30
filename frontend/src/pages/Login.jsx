import React, { useState } from 'react'
import {Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../Redux/authSlice'
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setformData] = useState({Username:"",Password: ""})
  const submitHandler =async (e)=>{
    e.preventDefault()
    try {
       
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login` , formData , {
          headers : {
            "Content-Type" : "application/json"
          },
          withCredentials : true,
        }) 
       
        dispatch(setAuthUser(res.data))
        navigate("/home")
        toast(res.data.message)
    } catch (error) {
      toast.error(error.response.data)
      
    }
    
    setformData({
     Username:"",Password: ""

    })
  }

    return (
      <div className=" min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md  bg-blue-500  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-yellow-400">
            Login
          </h1>
          <form action="" onSubmit={submitHandler}>
           
            <div>
              <label className=" label p-2">
                <span className="text-base label-text  text-white font-bold  ">
                  Email
                </span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                type="email"
                placeholder="Enter your Email"
                value={formData.Username}
                onChange={(e)=>setformData({...formData, Username: e.target.value})}
              />
            </div>
            <div>
              <label className=" label p-2">
                <span className="text-base label-text  text-white font-bold  ">
                  Password
                </span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Enter your password"
                value={formData.Password}
                onChange={(e)=>setformData({...formData, Password: e.target.value})}
              />
            </div>
            
            <button type="submit"  className=" mt-5 font-bold text-black  justify-self-start input input-bordered h-10">Sumit</button>
          </form>
          <div className="flex justify-end mt-5 text-white font-bold">
            <Link to={"/signup"} >Don't have an account? Signup</Link >
          </div>
        </div>
      </div>
    );
  
}

export default Login