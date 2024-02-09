import mongoose from "mongoose";
const ChatModel = mongoose.Schema(
    {
     members:Array
   
    },
    {
        timestamps:true
    } ,

)
export default mongoose.model('Chat',ChatModel)