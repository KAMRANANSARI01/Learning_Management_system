//firstly we check that user is login or not and for this we extract token form req.cookie if token is available its mean user is logged in

import AppError from "../utils/error.utils.js";
import jwt  from "jsonwebtoken";

const isLoggedIn = async(req,res,next)=>{
      const {token} = req.cookie;//here we can fetch token bcz of using cookie parser
      if(!token){
        return next(new AppError("Unauthenticated,Please login again.",401))
      }

      const userDetails = await jwt.verify(token,process.env.JWT_SECRET)//if token is available then we'll get details from jwt.verify
      console.log(userDetails)
      req.user = userDetails
      next()

}

export{
    isLoggedIn
}