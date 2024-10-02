import React from "react";
import PostSide from "../../Components/PostSide";
import ProfileCard from "../../Components/ProfileCard";

import FollowersCard from "../../Components/FollowersCard";
import InfoCard from "../../Components/InfoCard";

const Profile = () => {
  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start xl:justify-between gap-4 p-5 w-screen  h-screen overflow-x-hidden overflow-y-scroll no-scrollbar ">
      <div className="hidden xl:flex flex-col text-white w-full xl:w-1/3">
        <InfoCard />
      </div>

      <div className="flex flex-col  px-5  w-full xl:w-full ">
        <ProfileCard location="profilePage" />
        <div className="flex xl:hidden flex-col text-white xl:w-full ">
          <InfoCard />
        </div>
        <PostSide location="profilePage" />
      </div>

      <div className="hidden xl:flex flex-col  text-white  w-full xl:w-1/3">
        <FollowersCard location="profilePage" />
      </div>
    </div>
  );
};

export default Profile;
