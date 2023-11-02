import User from "../models/userSchema.js";
import AppError from "../utils/error.utils.js";


//common cookieOptions
const cookieOptions = {
    maxAge:7*24*60*60*100 ,//7days
    httpOnly:true,
    secure:true
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
  //TODO:File upload

  await user.save()

 
  //when user registered successfully after that we want to save their info in cookie.
  const token = await user.generateJWTToken()//this function defined in userschema.js
 //after password encription we do not want to share 
 user.password = undefined;
  res.cookie('token',token, cookieOptions)

  res.status(201).json({
    sucess:true,
    message:"user registered successfully",
    user
  })
}


//for login
const login = async(req,res)=>{
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
        res.cookie('token',token, cookieOptions)
      
        res.status(201).json({
          sucess:true,
          message:"user loggedin successfully",
          user
        })
    } catch (error) {
        return next(new AppError(error.message, 400)) 

    }

}
const logout = async(req,res)=>{
    // const{fullName,email,password} = req.body;
}
const getProfile = async(req,res)=>{
    // const{fullName,email,password} = req.body;
}


export {
    register,
    login,
    logout,
    getProfile
}