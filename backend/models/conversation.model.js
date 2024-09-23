import mongoose from "mongoose";

const conversationSchema=new mongoose.Schema({
  participants:[{
    type:mongoose.Schema.ObjectId,
    ref:"User"
  }],
  message:[{
    type:mongoose.Schema.ObjectId,
    ref:"Message"

  }]

},{timestamps:true})

export default Conversation=mongoose.model("Conversation",conversationSchema);
