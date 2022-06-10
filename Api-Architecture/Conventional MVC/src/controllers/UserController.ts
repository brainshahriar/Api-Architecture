import {Request , Response} from 'express'
import userModel from '../models/User/UserSchema'
import fs from 'fs'


class userController {
    static post = async (req:Request,res:Response)=>{
        const newPost = new userModel({
            ...req.body,
            image:req.file?.filename
        })
        try {
             await newPost.save()
            return res.send({"status":"Data Inserted"})
        } catch (error) {
            console.log(error);
            return  res.send({"status":"Server side error"})
        }
    }
    static get = async(req:Request,res:Response)=>{
        try {
           userModel.find({}) 
           .exec((err,data)=>{
               if(err)
               {
                return res.send({"status":"Not found"})
               }
               else{
                res.status(200).json({
                    result:data,
                    message:"success"
                })
               }
           })
        } catch (error) {
            console.log(error);
            return res.send({"status":"Something error"})
        }
    }

    static getByid = async(req:Request,res:Response)=>{
        try {
            const id = req.params.id
            const test = await userModel.findOne({_id:id})
            .exec()
           if(test){
            return res.send({"Data": test})
           }
           else{
            return res.send({"Data": "Not found"})
           }
        } catch (error) {
            console.log(error);
            return res.send({"status":"Something error"})
        }
    }

    static update = async(req:Request,res:Response)=>{
        let newUser=req.body
        try {
            if(req.file && req.file.filename){
                const img:any = await userModel.findById(req.params.id)
                fs.unlink('./uploads/'+img.image,(err)=>{
                    if(err){
                        console.log(err);
                    }
                })
                newUser = {
                    ...newUser,
                    image:req.file.filename
                }
            
            }
            await userModel.findByIdAndUpdate(req.params.id,(newUser));
            return res.send({"status":"Updated"})
        } catch (error) {
           console.log(error); 
           return res.send({"status":"Error"})
        }
        
    }

    static delete = async (req:Request,res:Response)=>{
        try {
            const img:any = await userModel.findById(req.params.id)
            fs.unlink('./uploads/'+img.image,(err)=>{
                if(err){
                    console.log(err);
                }
            })
           await userModel.findByIdAndDelete(req.params.id)
            return res.send({"status":"Deleted"})

        } catch (error) {
            return res.send({"status":"Error"})
        }
    }
}


export default userController