import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import UserRoute from "./Routes/UserRoute.js"
import AuthRoute from "./Routes/AuthRoute.js"
import cookieParser from "cookie-parser";
import MessageRoute from "./Routes/MessageRoute.js"
import cors from "cors"
import PostRoute from "./Routes/PostRoute.js"
import { app, server } from "./socket/soket.js";
import UploadRoute from './Routes/UploadRoute.js';
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use("/images", express.static("images"))
 const corsOption ={
   origin : "http://localhost:3000",
   credentials:true
 }
 app.use(cors(corsOption))

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("database is connected!"))
  .catch((error) => console.log(error));


server.listen(PORT, () => {
  console.log(`server is running port: ${PORT}`);
});


//routing
app.use("/auth", AuthRoute)
app.use("/message" ,MessageRoute)
app.use("/user", UserRoute)
app.use("/posts", PostRoute);
app.use('/upload', UploadRoute)