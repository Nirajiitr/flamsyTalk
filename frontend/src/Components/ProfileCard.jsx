import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavIcons from "./NavIcons";
import defaultProfile from "../imgs/defaultProfile.png"
import defaultCover from "../imgs/defaultCover.jpg"
const ProfileCard = ({ location }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
 

  return (
    <>
      {location === "profilePage" && (
        <NavIcons location="profilePage" />
      )}
      <div className={`rounded-xl flex flex-col ${!location? " w-[350px]" : "w-full"}  relative gap-2 bg-slate-200 p-4 bg-blur-2xl`}>
        <div className="relative flex flex-col items-center justify-center online">
          {location === "profilePage" ? (
            <>
              <img
                src={authUser.CoverPicture ? authUser.CoverPicture : defaultCover}
                alt="CoverImage"
                className="min-w-full max-h-40"
              />
              <img
                src={ authUser.ProfilePhoto? authUser.ProfilePhoto:defaultProfile } alt="ProfileImage"
                  className=" w-24 h-24 absolute sm:top-28 object-cover rounded-full shadow-[var(--profileShadow)] "
                />
            </>
          ) : (
            <>
              <img
                src={authUser.CoverPicture ? authUser.CoverPicture :defaultCover}
                alt="CoverImage"
                className="w-full h-28"
              />
              <img
                src={ authUser.ProfilePhoto? authUser.ProfilePhoto: defaultProfile} 
               className=" w-24 h-24 mt-24 absolute  object-cover rounded-full shadow-[var(--profileShadow)] "
               alt="ProfileImage"
              />
            </>
          )}
        </div>
        <div className="flex flex-col items-center mt-12 gap-2.5">
          <span className="font-bold">{authUser.FullName}</span>
          <span>
            {authUser.worksAt ? authUser.about : "Write about yourself"}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <hr className="w-[85%] border border-[var(--hrColor)]" />
          <div className="flex gap-4 w-[80%] justify-around items-center">
            <div className="flex flex-col gap-1 items-center justify-center">
              <span className="font-bold">{authUser?.followers?.length}</span>
              <span className="text-[13px] text-[var(--gray)]">Followers</span>
            </div>
            <div className="h-[150%] border-l-2 border-[var(--hrColor)]"></div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <span className="font-bold">{authUser?.following?.length}</span>
              <span className="text-[13px] text-[var(--gray)]">Following</span>
            </div>
            {location === "profilePage" && (
              <>
                <div className="h-[150%] border-l-2 border-[var(--hrColor)]"></div>
                <div className="flex flex-col gap-1 items-center justify-center">
                  <span className="font-bold">
                    {posts?.filter((post) => post?.userId === authUser._id)?.length}
                  </span>
                  <span className="text-[13px] text-[var(--gray)]">Posts</span>
                </div>
              </>
            )}
          </div>
          <hr className="w-[85%] border border-[var(--hrColor)]" />
        </div>

        {location !== "profilePage" && (
          <span className="font-bold text-orange-500 self-center mb-4 cursor-pointer">
            <Link
              to={`/profile/${authUser?._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="button btn"
            >
              My Profile
            </Link>
          </span>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
