import React, { useEffect, useState } from "react";

import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setOtherUser } from "../Redux/authSlice";

const FollowersCard = ({ location }) => {
  
  const { otherUser, authUser, getOnlineUser } = useSelector(
    (store) => store.auth
  );

  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  
  useEffect(() => {
    if (authUser) {
      const fetchOtherUser = async () => {
        try {
          const token = authUser?.token;
          axios.defaults.withCredentials = true;
          const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/`, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
          dispatch(setOtherUser(res?.data));
        } catch (error) {
          console.log(error);
        }
      };
      fetchOtherUser();
    }
  }, [authUser, dispatch, updated]);

  const handleFollowChange = () => {
    setUpdated(!updated);
  };

  return (
    <>
      {!location ? (
        <p className="text-2xl text-white font-bold">People you may know</p>
      ) : (
        <p className="text-2xl text-white font-bold self-center">
          Your Following
        </p>
      )}

      <div
        className={`${
          !location ? "w-full min-h-[45vh]  " : "h-screen"
        } rounded-lg flex flex-col gap-4 text-lg backdrop-blur-xl bg-opacity-0 border border-gray-100 overflow-auto no-scrollbar`}
      >
        {!location
          ? otherUser?.map((person, id) => {
              const isOnline = getOnlineUser?.includes(person?._id);

              return (
                <div className=" relative">
                  <User
                    person={person}
                    key={id}
                    onFollowChange={handleFollowChange}
                  />
                  <div
                    className={`${
                      isOnline
                        ? " absolute w-4 h-4 rounded-full left-4 top-2 bg-green-400"
                        : ""
                    }`}
                  ></div>
                </div>
              );
            })
          : authUser?.following?.map((person, id) => {
              const isOnline = getOnlineUser?.includes(person?._id);
              return (
                <div className=" relative">
                  <User
                    person={person}
                    key={id}
                    onFollowChange={handleFollowChange}
                  />
                  <div
                    className={` ${
                      isOnline
                        ? "absolute w-4 h-4 bg-green-500 rounded-full top-2 left-5"
                        : ""
                    }`}
                  ></div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default FollowersCard;
