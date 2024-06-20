import express from "express"
import { GetOtherUser, Login, Logout, Register, verifyEmail } from "../Controllers/AuthController.js";
import isAuthenticated from "../Middleware/isAuthenticated.js";
const Router = express.Router();

Router.post("/register", Register )
Router.post("/login", Login)
Router.get("/logout", Logout)
Router.get("/", isAuthenticated,GetOtherUser )

Router.get("/verify/:token", verifyEmail);
export default Router