
import PostModel from "../Models/PostModel.js";
import { User } from "../Models/UserModel.js";

  
export const createPost = async (req, res) => {
  const { ProfilePhoto, FullName, userId, type, content, desc } = req.body;

  try {
    const newPost = new PostModel({
      ProfilePhoto,
      FullName,
      userId,
      type,
      content,
      desc,
    });

    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Creating post failed" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);

    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("updeted successfully");
    } else {
      res.status(403).json("you can not edit other posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("deleted successfully");
    } else {
      res.status(403).json("you can not delete other posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const likePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ message: "liked successfully", post });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ message: "unliked successfully", post });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const commentPost = async (req, res) => {
  const postId = req.params.id;
  const { comment } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push(comment);
    await post.save();
    
    res.status(200).json({ postId: post._id, comments: post.comments });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTimeLinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const user = await User.findById(userId).populate("following");
    const followingIds = user.following.map((follow) => follow.UserId);

    const followingPosts = await PostModel.find({
      userId: { $in: followingIds },
    });

    const timelinePosts = currentUserPosts
      .concat(followingPosts)
      .sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(timelinePosts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
