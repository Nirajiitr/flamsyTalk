import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../Redux/authSlice";
import defaultProfile from "../imgs/defaultProfile.png"
const User = ({ person, onFollowChange }) => {

  const { authUser } = useSelector((state) => state.auth);
  const token = authUser?.token;
  
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(
    authUser?.following?.some(
      (following) => following.UserId === person?._id || person.UserId
    )
  );
  

  const handleFollow = async () => {
    if (!authUser || !authUser._id) {
      return;
    }

    try {
      if (isFollowing) {
        
        await axios.put(
          `https://flimsytalk.netlify.app/user/${person._id || person.UserId}/unfollow`,
          {
            currentUserId: authUser._id,
            ProfilePhoto: authUser.ProfilePhoto,
            FullName: authUser.FullName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            }
          }
        );
        dispatch(unfollowUser(person._id || person.UserId));
      } else {
        await axios.put(
          `https://flimsytalk.netlify.app/user/${person._id || person.UserId}/follow`,
          {
            currentUserId: authUser._id,
            ProfilePhoto: authUser.ProfilePhoto,
            FullName: authUser.FullName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            }
          }
        );
        dispatch(
          followUser({
            UserId: person._id || person.UserId,
            ProfilePhoto: person.ProfilePhoto,
            FullName: person.FullName,
          })
        );
      }
      setIsFollowing((prev) => !prev);
      onFollowChange();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex gap-2 justify-around items-center"
    >
      <img
        src={
          person.ProfilePhoto
            ? person.ProfilePhoto
            : defaultProfile
        }
        alt="ProfileImage"
        className="w-20 h-20 object-cover rounded-full shadow-[var(--profileShadow)]"
      />
      <span className="text-white font-bold text-md">{person.FullName}</span>
      <button className="btn button" onClick={handleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
