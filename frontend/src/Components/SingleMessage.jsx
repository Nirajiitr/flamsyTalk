import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import defaultProfile from "../imgs/defaultProfile.png"
const SingleMessage = ({ message }) => {
  const scrollRef = useRef();
 
  const { authUser, selectedUser } = useSelector((store) => store.auth);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isAuthUserSender = authUser?._id === message?.SenderId;

  const userImage = isAuthUserSender 
    ? (authUser?.ProfilePhoto ?authUser.ProfilePhoto :defaultProfile)
    : (selectedUser?.ProfilePhoto ? selectedUser.ProfilePhoto : defaultProfile);

  return (
    <div ref={scrollRef} className={`chat ${isAuthUserSender ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="user icon" src={userImage} />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs text-gray">{new Date(message?.createdAt).toLocaleString()}</time>
      </div>
      <div className={`chat-bubble ${isAuthUserSender ? "bg-[#2B3595] text-white" : "bg-[#E7EAED] text-black"} text-lg`}>
        {message?.Message}
      </div>
    </div>
  );
};

export default SingleMessage;
