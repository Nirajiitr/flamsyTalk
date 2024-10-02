import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import Typed from "typed.js";
const Navbar = () => {
  useEffect(() => {
    const options = {
      strings: [
        "FlimsyTalk",
        "Where Every Conversation Sparks Joy",
        "Where Whimsy Meets Community",
        "Share Smiles, Spark Joy",
        "Laugh Together, Thrive Together",
        "Signup Now",
      ],
      typeSpeed: 15,

      backSpeed: 10,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
    };
    const typed = new Typed("#element", options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="navbar bg-[#6610f2]  flex justify-between items-center rounded-lg w-full">
      <div className="items-center hidden sm:flex">
        <img
          className="rounded-full h-20 w-20 bg-pink-500"
          src={logo}
          alt="Logo"
        />
      </div>
      <p className="  lg:text-4xl font-bold font-serif text-white"> FlimsyTalk</p>
      <div className=" w-1/2 hidden lg:block">
        <p className=" lg:text-4xl  font-bold text-[#110229]" id="element"></p>
      </div>
      <div className="flex gap-4">
        <Link to="/login" className="btn text-blue-700">
          Login
        </Link>
        <Link to="/signup" className="btn text-blue-700">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
