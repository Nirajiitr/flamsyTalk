import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    ProfilePhoto: {
      type: String,
      default: "",
    },
    Gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
   
    CoverPicture: String,
    about: String,
    LiveIn: String,
    worksAt: String,
    Relationship: String,
    followers: [
      {
        UserId: String,
        ProfilePhoto: String,
        FullName: String,
      },
    ],
    following: [
      {
        UserId: String,
        ProfilePhoto: String,
        FullName: String,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
