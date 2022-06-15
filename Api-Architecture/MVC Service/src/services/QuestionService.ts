import { Request, Response } from "express";
import questionModel from "../models/Questions/QuestionSchema";
import userModel from "../models/User/UserSchema";
class questionService{
    static post =async(req:Request,res:Response)=>{
        const newPost = new questionModel({...req.body});
        const savePost = await newPost.save();
        await userModel.updateOne({_id:req.body.user},{ $push: { questions:savePost._id } }, { new: true });
        return savePost;
    }
    static getAllQuestion = async()=>{
        return await questionModel.find({}).exec(); 
    }
    static getById = async(res:Response,req:Request)=>{
        const id = req.params.id
        return await questionModel.findById({_id:id}).exec();
    }
}
export default questionService