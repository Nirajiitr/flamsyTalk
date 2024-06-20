import mongoose from "mongoose";

const ConversationsModel = new mongoose.Schema(
  {
    Participant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    Messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  { timestamps: true }
);

export const Conversations = mongoose.model("Conversations", ConversationsModel);