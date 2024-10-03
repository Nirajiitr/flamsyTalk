import React from "react";
import FollowersCard from "./FollowersCard";
import LogoSearch from "./LogoSearch";
import ProfileCard from "./ProfileCard";

const ProfileSide = () => {
  return (
    <div className=" flex-col w-[350px] gap-4 items-center  hidden xl:flex ">
      <LogoSearch />
      <ProfileCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
