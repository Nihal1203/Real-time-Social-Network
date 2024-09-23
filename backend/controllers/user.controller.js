import { User } from "../models/user.model";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"



export const register=async(req,res)=>{
  try{
    const {username,email,password}=req.body;

    if(!username || !email || !password)
        return res.status(401).json({
      message:"Something is missing",
      success:false
    })
    const user=await User.findOne({email});
    if(user)
      return res.status(401).json({
        message:"User with this email already exists",
        success:false
      })
      const hashPassword=await bcrypt.hash(password,10);

      await User.create({username,email,password:hashPassword})
      return res.status(201).json({
        message:"Account Created succssfully",
        success:true
      })

  } 
  catch(error){
    console.log("ERROR:",error)
  } 
}

export const login=async(req,res)=>{
  try {
    const {email,password}=req.body;
    if(!email || !password)
      return res.status(401).json({
        message:"Something is missing",
        success:false
      })
      let user = await User.findOne({email})
      if(!user)
        return res.status(401).json({
        message:"User with this email does not exists || Incorrect email or password ",
        success:false})
      
      const isPassword=await bcrypt.compare(password,user.password)
      if(!isPassword)
        return res.status(401).json({
          message:" Incorrect password ",
          success:false})
      
      user={
        _id:user._id,
        username:user.username,
        email:user.email,
        profilePicture:user.profilePicture,
        bio:user.bio,
        followers:user.followers,
        following:user.following,
        posts:user.posts,


      }    
      
      const token =  await jwt.sign({userId:user._id},process.env.SECRECT_KEY,{expiresIn:'1d'})
      
      return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({
        message:`Welcome back ${user.username}`,
        success:true,
        user
      })




      
        


     
  } catch (error) {
    console.log(error)   
  }

}

export const logout=async(req,res)=>{
  try {
    return res.cookie(token,"",{maxAge:0}).json(
     { message:"User Logout successfully",
      success:true}
    )
  } catch (error) {
    console.log(error)
  }
}

export const getProfile=async(req,res)=>{
  try {
    const userId=req.params.id
    let user=await User.findById(userId)
    return res.status(200).json({
      user,
      success:true
    })

  } catch (error) {
    console.log(error)
  }
}

export const editProfile=async(req,res)=>{
  try {
    const userId=req.id;
    const {bio,gender}=req.body;
    const profilePicture=req.file;

    let cloudResponse;

    if(profilePicture){
      
    }


  } catch (error) {
    console.log(error)
  }
}