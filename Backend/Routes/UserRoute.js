
import express from 'express'
import { FollowUser, UnFollowUser, deleteUser,  getUser, updateUser } from '../Controllers/UserController.js'
import isAuthenticated from "../Middleware/isAuthenticated.js"
const Router = express.Router();


Router.get("/:id",  getUser );
Router.put("/:id", isAuthenticated, updateUser);
Router.delete("/:id" , isAuthenticated, deleteUser);
Router.put("/:id/follow", isAuthenticated,FollowUser);
Router.put("/:id/unfollow", isAuthenticated,UnFollowUser)
export default Router