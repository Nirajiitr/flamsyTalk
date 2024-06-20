import { GetMessage, SendMessage } from "../Controllers/MessageController.js";
import express from "express"
import isAuthenticated from "../Middleware/isAuthenticated.js";

const Router = express.Router();

Router.post("/send/:id" ,isAuthenticated, SendMessage);
Router.get("/get/:id", isAuthenticated, GetMessage)

export default Router