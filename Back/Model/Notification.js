import mongoose from "mongoose";
const NotificationModel = mongoose.Schema({
    Mabaoute:{
        type:String,
    },
    IdChat:{
        type:String
    },
   UserCreatMessage:{
        type:String
    },
    Message:{
        type:String
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
})
export default mongoose.model('Notification',NotificationModel)