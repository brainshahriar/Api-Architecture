import mongoose from "mongoose";
import Question from "./QuestionDto";

const questionSchema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        type: { type: String, required: true, trim: true },
        user:{
            type:mongoose.Types.ObjectId,
            ref:"user"
        },

})

const questionModel = mongoose.model<Question>("question",questionSchema)

export default questionModel