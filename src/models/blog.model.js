import mongoose from "mongoose";
import User from "./user.model.js";

const blogSchema = new mongoose.Schema ({
    uid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
    },
    title : {
        type : String,
        required : true,
        trim : true,
        maxlength : [120, "Length must be less than 120"]
    },

    description : {
        type : String,
        required : true,
    },


},
{
    timestamps : true
})



export default mongoose.model("Blog", blogSchema);



