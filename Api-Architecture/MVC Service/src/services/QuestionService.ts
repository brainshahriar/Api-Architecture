import { Request, Response } from "express";
import questionModel from "../models/Questions/QuestionSchema";
class questionService{
    static post =async(req:Request,res:Response)=>{
        const newPost = new questionModel({...req.body});
        return await newPost.save();
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