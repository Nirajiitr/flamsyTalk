import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import MessageBox from "./MessageBox";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, setGetMessage } from "../Redux/messageSlice";
import {
  clearAuthUser,
  setOtherUser,
  setSelectedUser,
} from "../Redux/authSlice";
import { FaHome } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import defaultProfile from "../imgs/defaultProfile.png";
import { IoIosArrowBack } from "react-icons/io";
const ChatContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Message, setMessage] = useState("");
  const { getMessage } = useSelector((store) => store.messages);

  const { selectedUser, authUser, getOnlineUser } = useSelector(
    (store) => store.auth
  );

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/message/send/${selectedUser?._id}`,
        { Message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(setGetMessage([...getMessage, res?.data?.NewMessage]));
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("process.env.REACT_APP_BASE_URL/auth/logout");
      dispatch(clearAuthUser());
      dispatch(clearMessages());
      dispatch(setSelectedUser(null));
      dispatch(setOtherUser(null));
      toast(res.data.message);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const isOnline = getOnlineUser.includes(selectedUser?._id);
  const handleOpenSidebar = () => {
    dispatch(setSelectedUser({ ...selectedUser, updatedAt: !selectedUser.updatedAt }));
  };

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <div className="flex gap-2 items-center rounded-lg hover:bg-[#646388] hover:text-white font-bold text-black p-4 bg-[#2B3595]">
        {selectedUser && (
          <div
            className={`avatar ${
              isOnline ? "online" : ""
            } flex items-center gap-1`}
          >
            <IoIosArrowBack
              onClick={handleOpenSidebar}
              className="size-8 text-white"
            />
            <div className="max-h-16 max-w-16 rounded-full ">
              <img
                src={
                  selectedUser.ProfilePhoto
                    ? selectedUser.ProfilePhoto
                    : defaultProfile
                }
                alt="profile icon"
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between w-full">
          <p className="text-lg">
            {!selectedUser ? "" : selectedUser.FullName}
          </p>
          <div className="flex gap-5 ml-auto">
            <Link className="button" to="../home">
              <FaHome size="40px" />
            </Link>
            <button className="button" onClick={handleLogout}>
              <RiLogoutCircleRLine size="40px" />
            </button>
          </div>
        </div>
      </div>
      {selectedUser !== null ? (
        <>
          
            <MessageBox />
         
          <form
            action=""
            className="relative border-none outline-none "
            onSubmit={SubmitHandler}
          >
            <input
              type="text"
              className="input input-bordered placeholder-white p-8 text-xl w-full bg-[#555561] border-hidden focus:outline-none text-white"
              placeholder="message..."
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="absolute text-black right-1 top-1">
              <MdSend size="50px" />
            </button>
          </form>
        </>
      ) : (
        <div className="md:w-[550px] flex flex-col items-center justify-center text-white">
          <h1 className="mt-40 font-bold text-xl">Hey {authUser?.FullName}</h1>
          <p className="text-lg mt-6">Let's Start Chating</p>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
