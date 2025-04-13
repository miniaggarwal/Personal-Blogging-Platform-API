import mongoose from "mongoose";
import config from "../config/index.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema ({
    _id : mongoose.Schema.Types.ObjectId,
    uname : {
        type : String,
        required : true,
        trim : true,
        maxlength : [120, "Length must be less than 120"]
    },

    email : {
        type : String,
        required : true,
    },

    password : {
        type : String,
        required : true,
        maxlength : [120, "Length must be less than 120"],
        select : false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,

},
{
    timestamps : true
})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10)
    next();

});


userSchema.methods.comparePassword = async function(enteredPasswod){
    return await bcrypt.compare(this.password, enteredPasswod)
}

//Set JWT Token
userSchema.methods.getJWTtoken = async function{
    JWT.sign({id : this._id}, config.JWT_SECRET, {
        expiresIn : config.JWT_EXPIRY
    })
};

//Generate forgot password token
userSchema.methods.generateForgotPasswordToken = async function () {
    const forgotToken = crypto.randomBytes(20).toString("hex");

    //Token Encryption
    this.forgotPasswordToken = crypto.createHash("sha256")
    .update(forgotToken).digest("hex")

    //Expiry Time
    this.forgotPasswordExpiry = Date.now() * 20 * 60 * 1000;

    return forgotToken;

}

module.export = mongoose.model("User", userSchema)



