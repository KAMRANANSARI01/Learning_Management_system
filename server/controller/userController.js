import { json } from "express";
import User from "../models/userSchema.js";
import AppError from "../utils/error.utils.js";
import cloudinary from "cloudinary"
import fs from 'fs/promises'

//common cookieOptions
const cookieOption = {
    maxAge:24*60*60*1000 ,
    // httpOnly:true,
    // secure:true
}
//for user registration 
const register = async(req,res,next)=>{
    console.log(req.body)
    const {fullName, email, password} = req.body;

    //adding some validations
    if(!fullName||!email||!password){
       return next(new AppError('All fields are required', 400)) 
    }
    //checking that user is already exist or not
    const userExists = await User.findOne({email})
    if(userExists){
        return next(new AppError('Email already exists', 400)) 

    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar :{
            public_id : email,
            secure_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Davatars&psig=AOvVaw1Ep2HrPQJQBpISDmhIq5_Y&ust=1698941282388000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMi5xM-Xo4IDFQAAAAAdAAAAABAE"
        }
    })
 
    if(!user){
        return next(new AppError("user registration failed, please try again"),400)
    }


  //File uploading

  //here we get the converted profile pic file in req.file then we will save it into cloudinary.
  console.log('FILE DETAILS >', JSON.stringify(req.file))

if(req.file){
   try {
    const result = await cloudinary.v2.uploader.upload(req.file.path,{
        folder :'lms',
        height : 250,
        width : 250,
        gravity : 'faces',
        crop:'fill'
    })
     if (result){
        user.avatar.public_id = result.public_id,
        user.avatar.secure_url = result.secure_url
     }

     //remove file from server(uploads folder)
     fs.rm(`uploads/${req.file.filename}`)
   } catch (error) {
           return next(new AppError(error.message,503))
   }
}

  await user.save()

 
  //when user registered successfully after that we want to save their info in cookie.
  const token = await user.generateJWTToken()//this function defined in userschema.js
 //after password encription we do not want to share 
 user.password = undefined;
  res.cookie('token',token, cookieOption)

  res.status(201).json({
    sucess:true,
    message:"user registered successfully",
    user
  })
}


//for login
const login = async(req,res,next)=>{
    try {
        const{email,password} = req.body;

        //adding some validations
        if(!email||!password){
           return next(new AppError('All fields are required', 400)) 
        }
       
        const user = await User.findOne({email}).select("+password")
   
        if(!user || !user.comparePassword(password)){
           return next(new AppError('email or password does not match.', 400)) 
   
        }
        const token = await user.generateJWTToken()//this function defined in userschema.js
    //after password encription we do not want to share 
       user.password = undefined;
        res.cookie('token',token, cookieOption)
      
        res.status(201).json({
          sucess:true,
          message:"user loggedin successfully",
          user
        })
    } catch (error) {
        return next(new AppError(error.message, 500)) 

    }

}

// for logout
const logout = async(req,res)=>{
    try {
        await res.cookie("token",null,{
            secure:true,
            httpOnly:true,
            maxAge:0
        }) 

        res.status(200).json({
            success:ture,
            message:"User loggedout successfully"
        })
    } catch (error) {
        console.log(error)
       return  next(new AppError(error.message,400))
    }
   
}
//for getProfile
const getProfile = async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({
            success:true,
            message:"fetched user's data",
            user
        })
    } catch (error) {
        return  next(new AppError("failed to fetch user profile",500))

    }
  
}

export {
    register,
    login,
    logout,
    getProfile
}