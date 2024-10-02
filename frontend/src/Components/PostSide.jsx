import React from "react";
import Posts from "./Posts";
import PostShare from "./PostShare";

const PostSide = ({location}) => {
  return (
    <div className="flex flex-col gap-4 w-full ">
      {location !== 'profilePage' &&
        <PostShare />
      }
     
      <Posts  />
    </div>
  );
};

export default PostSide;
