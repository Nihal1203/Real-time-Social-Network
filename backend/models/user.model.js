import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"


const userSchema=new mongoose.Schema({
  username:{type:"String",required:true,unique:true},
  
  email:{type:"String",required:true,unique:true},

  password:{type:"String",required:true},

  profilePicture:{type:"String",default:""},

  bio:{type:"String",default:""},

  gender:{type:"String",enum:["male","female"]},

  followers:[{type:mongoose.Schema.type.ObjectId,ref:"User"}],

  following:[{type:mongoose.Schema.type.ObjectId,ref:"User"}],

  posts:[{type:mongoose.Schema.type.ObjectId,ref:"Post"}],

  bookmarks:[{type:mongoose.Schema.type.ObjectId,ref:"Post"}]
},{timestamps:true})

export const User=mongoose.model('User',userSchema);