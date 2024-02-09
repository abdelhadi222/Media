import mongoose from "mongoose";
const NotiModel = mongoose.Schema({
    IdUserSender:{
        type:String,
    },
    IdUserReciver:{
        type:String,
    },
    type:{
        type:String,
        default:""
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
    
})
export default mongoose.model('Noti',NotiModel)