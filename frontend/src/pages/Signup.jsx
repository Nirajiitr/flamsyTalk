import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    FullName: "",
    Username: "",
    Password: "",
    ConfirmPassword: "",
    Gender: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast(res.data);

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
    setformData({
      FullName: "",
      Username: "",
      Password: "",
      ConfirmPassword: "",
      Gender: "",
    });
  };

  const handleChecked = (Gender) => {
    setformData({ ...formData, Gender });
  };
  return (
    <div className=" min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md  bg-blue-500  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-yellow-400">
          SignUp
        </h1>
        <form action="" onSubmit={submitHandler}>
          <div>
            <label className=" label p-2">
              <span className="text-base label-text  text-white font-bold  ">
                Full Name
              </span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter your full name"
              onChange={(e) =>
                setformData({ ...formData, FullName: e.target.value })
              }
              value={formData.FullName}
            />
          </div>
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
              onChange={(e) =>
                setformData({ ...formData, Username: e.target.value })
              }
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
              onChange={(e) =>
                setformData({ ...formData, Password: e.target.value })
              }
              value={formData.Password}
            />
          </div>
          <div>
            <label className=" label p-2">
              <span className="text-base label-text  text-white font-bold  ">
                Confirm Password
              </span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter your confirm password"
              onChange={(e) =>
                setformData({ ...formData, ConfirmPassword: e.target.value })
              }
              value={formData.ConfirmPassword}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block label p-2 text-white font-bold "
            >
              Gender
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="male"
                name="gender"
                checked={formData.Gender === "male"}
                onChange={() => handleChecked("male")}
                className="mr-2 h-5 w-5 accent-black hover:cursor-pointer"
              />
              <label htmlFor="male" className="mr-4 text-white font-bold">
                Male
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                checked={formData.Gender === "female"}
                onChange={() => handleChecked("female")}
                className="mr-2 h-5 w-5 accent-black hover:cursor-pointer "
              />

              <label htmlFor="female" className="mr-4 text-white font-bold">
                Female
              </label>
            </div>
          </div>
          <button
            type="submit"
            className=" mt-5 font-bold text-black  justify-self-start input input-bordered h-10"
          >
            Sumit
          </button>
        </form>
        <div className="flex justify-end mt-5 text-white font-bold">
          <Link to={"/login"}>Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
