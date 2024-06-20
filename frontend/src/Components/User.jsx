import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../Redux/authSlice";

const User = ({ person, onFollowChange }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { authUser } = useSelector((state) => state.auth);
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
          `https://flimsytalk-c12ezbel.b4a.run/user/${person._id || person.UserId}/unfollow`,
          {
            currentUserId: authUser._id,
            ProfilePhoto: authUser.ProfilePhoto,
            FullName: authUser.FullName,
          }
        );
        dispatch(unfollowUser(person._id || person.UserId));
      } else {
        await axios.put(
          `https://flimsytalk-c12ezbel.b4a.run/user/${person._id || person.UserId}/follow`,
          {
            currentUserId: authUser._id,
            ProfilePhoto: authUser.ProfilePhoto,
            FullName: authUser.FullName,
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
            ? `${serverPublic}${person.ProfilePhoto}`
            : `${serverPublic}defaultProfile.png`
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
