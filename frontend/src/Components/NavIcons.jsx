import React from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NavIcons = ({ location }) => {
  return (
    <>
      {location === "profilePage" && (
        <div className="flex justify-between items-center bg-slate-700 h-16 p-4 m-1 rounded-xl ">
          <Link className="button" to="../home">
            <FaHome size="40px" />
          </Link>
          <Link className="button" to="../homechat">
            <BsChatDotsFill size="40px" />
          </Link>
        </div>
      )}
      {location !== "profilePage" && (
        <div className="flex justify-between items-center bg-black h-16 p-4 m-1">
          <Link className="button" to="../home">
            <FaHome size="40px" />
          </Link>
          <Link className="button" to="../homechat">
            <BsChatDotsFill size="40px" />
          </Link>
        </div>
      )}
    </>
  );
};

export default NavIcons;
