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
import path from "path";
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();
//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use("/images", express.static("images"))
 const corsOption ={

   origin : "https://flimsytalk.netlify.app",
   credentials:true
 }
 app.use(cors(corsOption))

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("database is connected!"))
  .catch((error) => console.log(error));



//routing
app.use("/auth", AuthRoute)
app.use("/message" ,MessageRoute)
app.use("/user", UserRoute)
app.use("/posts", PostRoute);
app.use('/upload', UploadRoute)

app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*", (_, res)=>{
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"))
})

server.listen(PORT || 5000, () => {
  console.log(`server is running port: ${PORT}`);
});
