import express from "express";
import fs from "fs";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type : "auto"
    });

    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
      else console.log("Deleted file");
    });

    res.status(200).json({
      message: "File uploaded successfully",
      url: uploadResult.secure_url,
    });
  } catch (error) {
    
    res.status(500).json(error);
  }
});


 export default router;
