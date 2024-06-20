import { Chat } from "../Models/ChatModel.js";
import { Conversations } from "../Models/ConversationsModels.js";
import mongoose from "mongoose";
import { User } from "../Models/UserModel.js";
import { getReceiverSocketId, io } from "../socket/soket.js";

export const SendMessage = async (req, res) => {
  try {
    const SenderId = req.id;
    const ReceiverId = req.params.id;
    const { Message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(ReceiverId)) {
      return res.status(400).json({ error: "Invalid Receiver ID format" });
    }

    const receiverExists = await User.findById(ReceiverId);
    if (!receiverExists) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    let GotConversations = await Conversations.findOne({
      Participant: { $all: [SenderId, ReceiverId] },
    });

    if (!GotConversations) {
      GotConversations = await Conversations.create({
        Participant: [SenderId, ReceiverId],
      });
    }

    const NewMessage = await Chat.create({
      SenderId,
      ReceiverId,
      Message,
    });

    if (NewMessage) {
      GotConversations.Messages.push(NewMessage._id);
    }

    await Promise.all([GotConversations.save(), NewMessage.save()]);
    const receiverSocketId = getReceiverSocketId(ReceiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", NewMessage);
    }
    res.status(200).json({ NewMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const GetMessage = async (req, res) => {
  try {
    const ReceiverId = req.params.id;
    const SenderId = req.id;

    if (!mongoose.Types.ObjectId.isValid(ReceiverId)) {
      return res.status(400).json({ error: "Invalid Receiver ID format" });
    }

    const receiverExists = await User.findById(ReceiverId);
    if (!receiverExists) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    let GotConversations = await Conversations.findOne({
      Participant: { $all: [SenderId, ReceiverId] },
    }).populate("Messages");

    if (!GotConversations) {
      GotConversations = await Conversations.create({
        Participant: [SenderId, ReceiverId],
      });
    }

    res.status(200).json(GotConversations.Messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
