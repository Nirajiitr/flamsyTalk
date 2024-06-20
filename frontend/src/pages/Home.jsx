import React from "react";
import PostSide from "../Components/PostSide";
import ProfileSide from "../Components/ProfileSide";
import RightSide from "../Components/RightSide";

const Home = () => {
  return (
    <div className="relative lg:min-w-full flex justify-center  gap-4 max-h-full overflow-scroll">
      <ProfileSide />
      <div className="w-[700px]">
      <PostSide />
      </div>
     <div className="w-[350px]">
     <RightSide />
     </div>
      
    </div>
  );
};

export default Home;
