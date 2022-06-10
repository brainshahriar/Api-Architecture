import mongoose from "mongoose";
import User from "../../interfaces/UserInterfaces";

const userSchema = new mongoose.Schema({
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        image:{
            type:String,
        }
})

const userModel = mongoose.model<User>("user",userSchema)

export default userModel