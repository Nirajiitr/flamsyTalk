import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    FullName: String,
    ProfilePhoto: String,
    type: { type: String, required: true, enum: ['imagePost', 'videoPost', 'textPost'] },
    content: { type: String },
    desc: { type: String },
    likes: { type: [String], default: [] },
    comments: [
      {
        userId: String,
        FullName: String,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
