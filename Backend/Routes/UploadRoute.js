import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const router = express.Router();


const storage = multer.memoryStorage(); 

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) return res.status(500).json(error);
        res.status(200).json({
          message: "File uploaded successfully",
          url: result.secure_url,
        });
      }
    );

   
    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
