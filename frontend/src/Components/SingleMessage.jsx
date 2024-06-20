import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({ message }) => {
  const scrollRef = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { authUser, selectedUser } = useSelector((store) => store.auth);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isAuthUserSender = authUser?._id === message?.SenderId;

  const userImage = isAuthUserSender 
    ? (authUser?.ProfilePhoto ? `${serverPublic}${authUser.ProfilePhoto}` : `${serverPublic}defaultProfile.png`)
    : (selectedUser?.ProfilePhoto ? `${serverPublic}${selectedUser.ProfilePhoto}` : `${serverPublic}defaultProfile.png`);

  return (
    <div ref={scrollRef} className={`chat ${isAuthUserSender ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="user icon" src={userImage} />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs text-white">{new Date(message?.createdAt).toLocaleString()}</time>
      </div>
      <div className={`chat-bubble ${isAuthUserSender ? "bg-[#d5f9ff] text-black" : "bg-[#404045]"} text-lg`}>
        {message?.Message}
      </div>
    </div>
  );
};

export default SingleMessage;
