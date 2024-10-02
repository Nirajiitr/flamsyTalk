import React from "react";
import PostSide from "../Components/PostSide";
import ProfileSide from "../Components/ProfileSide";
import RightSide from "../Components/RightSide";
import NavIcons from "../Components/NavIcons";

const Home = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col xl:flex-row  xl:justify-center pt-5 gap-4 no-scrollbar overflow-x-hidden overflow-y-scroll">
      <div className="w-full xl:hidden">
        <NavIcons  />
      </div>
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
