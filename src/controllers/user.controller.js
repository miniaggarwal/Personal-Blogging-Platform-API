import User from "../models/user.model.js";
import { asyncHandler } from "../services/asyncHandler.js";
import JWT from "jsonwebtoken";


export const signUp = asyncHandler(async(req,res)=>{
    const {uname, email, password} = req.body

    if(!uname || !email || !password){
        res.status(400).json({
            sucess : false,
            message : err
        })
    }

    const userExist = await User.findOne({email});

    if(userExist){
        console.log("Error0");

        res.status(400).json({
            sucess : false,
            message : "User Already Exist"
        })
    }else{

        const newUser = await User.create({
            uname : req.body.uname,
            email : req.body.uname,email,
            password : req.body.password
        })
            const token = newUser.getJWTtoken();

            res.cookie("token", token, {
                expiresIn : Date.now()*24*60*60*1000,
                httpOnly : true
            })

            console.log("Error");

            newUser.password = undefined;
            res.status(200).json({
                sucess : true,
                token,
                newUser
            })



    }
})


export const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const userExist = await User.findOne({email}).select("+password");

    if(userExist){
        const matchPassword = await userExist.comparePassword(password);

        if(matchPassword){
            const JWTToken = await userExist.getJWTtoken();

            console.log(JWTToken);
            
            userExist.password = undefined;

            res.cookie("token", JWTToken, {
                expiresIn : Date.now()*24*60*60*1000,
                httpOnly : true
            })

            res.status(200).json({
                success : true,
                token : JWTToken,
                userExist
            })
        }
    }else{
        res.status(400).json({
            success : false
        })
    }


})

export const logout = asyncHandler(async(req,res)=>{
    
    console.log("Cookies:", req.headers.authorization.startsWith("Bearer"));

    if (!req.cookies?.token) {
        return res.status(400).json({
            success: false,
            message: "Token not found in cookies"
        });
    }

    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).send("You are logged Out!!")
})