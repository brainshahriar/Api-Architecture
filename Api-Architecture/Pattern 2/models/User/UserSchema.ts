import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name: { type: String },
        email: { type: String},
        password:{
            type:String
        },
        image:{
            type:String,
        },
        employee_id:{
            type:Number,
        },
        role_id:{
            type:Number,
        },
        phone:{
            type:Number,
        }
})

const userModel = mongoose.model("user",userSchema)

export default userModel