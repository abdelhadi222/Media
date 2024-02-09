import mongoose from "mongoose";
const MessageModel = mongoose.Schema({
    Sender:{
        type:String,
    },
    IdChat:{
        type:String
    },
    Message:{
        type:String,
    },
    ImageMessge:{
       type:[String],
    }, 
    VideoMessage:{
       type:[String],
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
})
export default mongoose.model('Message',MessageModel)