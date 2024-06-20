import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../Redux/authSlice";

const OtherUser = ({ users }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const handleClick = (user) => {
    dispatch(setSelectedUser(user));
  };
  let { selectedUser, getOnlineUser, authUser } = useSelector((store) => store.auth);
  if (!selectedUser) {
    selectedUser = {
      _id: null,
    };
  }
  const isOnline = getOnlineUser.includes(users._id)
  return (
    <div>
      <div
        onClick={() => handleClick(users)}
        className={`flex gap-2 items-center ${
          selectedUser._id === users._id ? "bg-[#B0B9C4] text-black " : ""
        }  cursor-pointer hover:bg-[#B0B9C4] hover:text-black font-bold text-white p-2 `}
      >
        <div className={`avatar ${isOnline ? 'online' : ""  } `}>
          <div className="w-10  avatar rounded-full">
            <img
              src={
                users.ProfilePhoto
                  ? `${serverPublic}${users.ProfilePhoto}`
                  : `${serverPublic}defaultProfile.png`
              }
              alt="profile icon"
            />
          </div>
        </div>
        
          <p>{users.FullName}</p>
        
      </div>

      <div className="divider my-0 py-0 h-1 "></div>
    </div>
  );
};

export default OtherUser;
