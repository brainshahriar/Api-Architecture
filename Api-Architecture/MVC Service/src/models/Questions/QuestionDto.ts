import { Document } from "mongoose";

export default interface Question extends Document{
    name:string,
    type:string,
    user:string
}