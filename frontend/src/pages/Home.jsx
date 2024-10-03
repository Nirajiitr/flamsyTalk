import React, { useState } from "react";
import PostSide from "../Components/PostSide";
import ProfileSide from "../Components/ProfileSide";
import RightSide from "../Components/RightSide";
import NavIcons from "../Components/NavIcons";
import FollowersCard from "../Components/FollowersCard";
import { FaRegWindowClose } from "react-icons/fa";

const Home = () => {
  const [openPeoples, setOpenPeoples] = useState(false);
  return (
    <div className="relative w-screen h-screen flex flex-col xl:flex-row  xl:justify-center pt-5 gap-4 no-scrollbar overflow-x-hidden overflow-y-scroll">
      <div className="w-full xl:hidden">
        <NavIcons setOpenPeoples={setOpenPeoples} />
      </div>
      {
        openPeoples && 
        <div className="z-10  absolute xl:static xl:hidden w-full bg-slate-400 flex justify-between px-5">
        <div className="w-full">
          <FollowersCard  />
        </div>
        <FaRegWindowClose onClick={()=>setOpenPeoples(false)} className="size-6 " />
      </div>
      }

      <ProfileSide />
      <div className=" w-full xl:w-[700px]">
        <PostSide />
      </div>
      <div className="xl:w-[350px] hidden xl:block">
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
