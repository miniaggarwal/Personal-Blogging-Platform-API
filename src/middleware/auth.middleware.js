import config from "../config/index.js";
import User from "../models/user.model.js"
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../services/asyncHandler.js";
import CustomError from "../services/customErrors.js";

export const isLoggedIn = asyncHandler(async(req,res,next)=>{

    let token;

    if(req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))){
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if(!token){
        throw new CustomError("Not Logged In", 401)
    }

    try{
        const decodedJWTtoken = JWT.verify(token, config.JWT_SECRET);

        req.user = await User.findById(decodedJWTtoken._id, "uname email");

        next();
    }catch(err){
        throw new CustomError("Not authorized to access the resource",401)
    }
})

