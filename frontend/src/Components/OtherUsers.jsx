import React, { useEffect } from "react";
import OtherUser from "./OtherUser";

import { useDispatch, useSelector } from "react-redux";

import { setOtherUser } from "../Redux/authSlice";
import axios from "axios";

const OtherUsers = () => {
  const dispatch = useDispatch();
  const { otherUser, authUser } = useSelector((store) => store.auth);

  useEffect(() => {
    if (authUser) {
      const FatchOtherUser = async () => {
        try {
          const token = authUser?.token;
         
          const res = await axios.get("https://flimsytalk.netlify.app/auth/", {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
          dispatch(setOtherUser(res?.data));
        } catch (error) {
          console.log(error);
        }
      };
      FatchOtherUser();
    }
  }, [authUser, dispatch]);

  if (!otherUser) return null;

  return (
    <div className=" overflow-auto no-scrollbar">
      {otherUser &&
        otherUser.map((other) => {
          return <OtherUser users={other} key={other?._id} />;
        })}
    </div>
  );
};

export default OtherUsers;
