import React, { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  clearAuthUser,
  setOtherUser,
  setSelectedUser,
} from "../Redux/authSlice";
import { clearMessages } from "../Redux/messageSlice";
import { toast } from "react-toastify";
import { LuPenSquare } from "react-icons/lu";

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { authUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("https://flamsytalk-vdckqix0.b4a.run/auth/logout");
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

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === authUser._id) {
        setProfileUser(authUser);
      } else {
        try {
          const other = await axios.get(
            `https://flamsytalk-vdckqix0.b4a.run/user/${profileUserId}`
          );
          setProfileUser(other.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchProfileUser();
  }, [authUser, profileUserId]);

  return (
    <>
      <p className="text-2xl self-center font-bold">Your Info</p>
      <div className="flex min-h-full max-h-full text-white flex-col gap-3 bg-slate-200 p-10 rounded-xl   backdrop-blur-xl bg-opacity-0 border border-gray-100 overflow-auto no-scrollbar">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold ">Edit Your Info</p>
          {authUser._id === profileUserId && (
            <div
              onClick={() => setModalOpened(true)}
              className="cursor-pointer"
            >
              <LuPenSquare />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <span className="font-bold text-lg">Name: </span>
            <span>{profileUser?.FullName}</span>
          </div>
          <div className="flex gap-5">
            <span className="font-bold text-lg">Status: </span>
            <span>{profileUser?.Relationship}</span>
          </div>
          <div className="flex gap-5">
            <span className="font-bold text-lg">Lives in: </span>
            <span>{profileUser?.LiveIn}</span>
          </div>
          <div className="flex gap-5">
            <span className="font-bold text-lg">Works at: </span>
            <span>{profileUser?.worksAt}</span>
          </div>
        </div>
        <button className="button h-10" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <ProfileModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data={authUser}
      />
    </>
  );
};

export default InfoCard;
