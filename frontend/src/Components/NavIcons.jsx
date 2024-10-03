import React from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaUserFriends } from "react-icons/fa";
const NavIcons = ({ location, setOpenPeoples }) => {
  const { authUser } = useSelector((state) => state.auth);
  return (
    <>
      {location === "profilePage" && (
        <div className="flex justify-between items-center h-16 p-4 m-1 rounded-xl ">
          <Link className="button" to="../home">
            <FaHome size="40px" />
          </Link>
          <Link className="button" to="../homechat">
            <BsChatDotsFill size="40px" />
          </Link>
        </div>
      )}
      {location !== "profilePage" && (
        <div className="flex justify-between items-center border-2 border-sky-100 rounded-md h-16 p-4 m-1">
          <Link className="button" to="../home">
            <FaHome size="40px" />
          </Link>

          <Link
            to={`/profile/${authUser?._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            className="button btn xl:hidden"
          >
            My Profile
          </Link>
           <FaUserFriends onClick={()=>setOpenPeoples(true)} className="size-10 button " />
          <Link className="button" to="../homechat">
            <BsChatDotsFill size="40px" />
          </Link>
        </div>
      )}
    </>
  );
};

export default NavIcons;
