import express from 'express';

import { commentPost, createPost, deletePost, getPost, getTimeLinePosts, likePost, updatePost} from '../Controllers/PostController.js';

const Router = express.Router();

Router.post("/", createPost);
Router.get("/:id", getPost); 
Router.put("/:id", updatePost);
Router.delete("/:id", deletePost);
Router.put("/:id/like", likePost); 
Router.get("/:id/timeline", getTimeLinePosts);
Router.post("/:id/comment", commentPost);

export default Router;
