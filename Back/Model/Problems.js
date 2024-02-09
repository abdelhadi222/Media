import mongoose from "mongoose";
const ProblemsModel = mongoose.Schema({
    IdUser:{
        type:String,
    },
    Problems:{
        type:String,
    },
    imageUser:{
        type:String
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
})
export default mongoose.model('Problems',ProblemsModel)