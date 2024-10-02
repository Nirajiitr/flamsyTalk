import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";
import { likePost, commentPost } from "../Redux/postSlice";
import defaultProfile from "../imgs/defaultProfile.png"
const Post = ({ data }) => {
 
  const dispatch = useDispatch();
 
  const { authUser } = useSelector((state) => state.auth);
  const [liked, setLiked] = useState(data.likes.includes(authUser._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [comments, setComments] = useState(data.comments);
  const [commentText, setCommentText] = useState("");
  const commentInputRef = useRef();

  const handleLike = async () => {
    dispatch(likePost({ postId: data._id, userId: authUser._id }));
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const newComment = {
      userId: authUser._id,
      comment: commentText,
      FullName: authUser.FullName,
    };

    dispatch(commentPost({ postId: data._id, comment: newComment }));
    setComments([...comments, newComment]);
    setCommentText("");
    commentInputRef.current.blur();
  };

  const handleShare = async () => {
    const shareData = {
      title: "Check out this post!",
      text: data.desc,
      url: window.location.href,
    };

    if (data.type === "videoPost") {
      shareData.url = data.content
    }

    try {
      await navigator.share(shareData);
      alert("Post shared successfully");
    } catch (err) {
      alert("Error sharing post: " + err.message);
    }
  };

  const renderContent = () => {
    switch (data?.type) {
      case "imagePost":
        return (
          <img
            src={data.content}
            alt="Post content"
            className=" object-cover min-h-full min-w-full py-1 m-1 rounded-md"
          />
        );
      case "videoPost":
        return (
          <video controls className=" object-cover min-h-full min-w-full py-1 m-1 rounded-md">
            <source src={data.content} type="video/mp4" />
          </video>
        );
      case "textPost":
        return (
          <p className=" overflow-auto min-h-full min-w-full py-1 m-1 rounded-md ">
            {data.content}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-purple-100 p-4 rounded-lg shadow-md my-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={
              data.ProfilePhoto
                ? data.ProfilePhoto
                : defaultProfile
            }
            alt="Profile"
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="font-semibold">{data.FullName}</span>
        </div>
        <span>{new Date(data?.createdAt)?.toDateString()}</span>
      </div>
      <div className="my-2 max-h-[400px] overflow-hidden items-center flex justify-center flex-col  ">
        
        {renderContent()}
      </div>
      <p className="my-1">{data?.desc}</p>
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLike}
        >
          {liked ? (
            <BsHeartFill size="24" color="red" />
          ) : (
            <BsHeart size="24" />
          )}
          <span>{likes}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaRegCommentDots size="24" />
          <span>{comments.length}</span>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleShare}
        >
          <FiShare size="24" />
          <span>Share</span>
        </div>
      </div>
      <div className=" h-16 text-slate-800 items-center border-x-2 border-white overflow-auto mt-2  ">
        {comments.map((comment, index) => (
          <div key={index} className="flex justify-center  gap-2">
            <span className="font-bold">{comment.FullName}:</span>
            <span>{comment.comment}</span>
          </div>
        ))}
      </div>
      <form className="flex items-center gap-2 mt-2" onSubmit={handleComment}>
        <input
          type="text"
          ref={commentInputRef}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default Post;
