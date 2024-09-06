// Posts.js
import React, { useEffect } from "react";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setPosts } from "../Redux/postSlice";
import axios from "axios";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://flamsytalk-vdckqix0.b4a.run/posts/${authUser._id}/timeline`);
        dispatch(setPosts(response?.data));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [dispatch, authUser._id]); 

  if (!posts || posts.length === 0) return "No Posts";

  const filteredPosts = params.id
    ? posts.filter((post) => post.userId === params.id)
    : posts;
    
  return (
    <div className="flex flex-col h-screen overflow-auto no-scrollbar gap-4">
      {filteredPosts.map((post) => (
        <Post data={post} key={post._id} location="profilePage" />
      ))}
    </div>
  );
};

export default Posts;
