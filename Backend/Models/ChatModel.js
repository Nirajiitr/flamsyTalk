import mongoose from "mongoose";

const ChatModel = new mongoose.Schema({
    SenderId:{
       type: mongoose.Schema.Types.ObjectId,
       ref : "User",
       require: true
    },
    ReceiverId :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        require: true
    },
    Message :{
     type : String,
     require : true
    }
},
{ timestamps: true })

export const Chat = mongoose.model("Chat", ChatModel)