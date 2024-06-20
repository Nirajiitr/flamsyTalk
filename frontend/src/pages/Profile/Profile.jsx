import React from "react";
import PostSide from "../../Components/PostSide";
import ProfileCard from "../../Components/ProfileCard";

import FollowersCard from "../../Components/FollowersCard";
import InfoCard from "../../Components/InfoCard";

const Profile = () => {
  return (
    <div className="flex justify-start gap-4  h-screen overflow-auto no-scrollbar lg:min-w-full">
      <div className="flex flex-col text-white w-[350px] ">
        <InfoCard />
      </div>

      <div className="flex flex-col h-screen">
        <ProfileCard location="profilePage" />
        <PostSide location="profilePage" />
      </div>
      <div className="flex flex-col  text-white w-[350px]">
        <FollowersCard location="profilePage" />
      </div>
    </div>
  );
};

export default Profile;
