import mongoose from "mongoose";
const InviModel = mongoose.Schema({
    IdUserSender:{
        type:String,
    },
    IdUserReciver:{
        type:String,
    },
    Type:{
        type:String,
        default:''
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
    
})
export default mongoose.model('Invi',InviModel)