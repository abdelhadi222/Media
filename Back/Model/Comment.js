import mongoose from "mongoose";
const ComentModel = mongoose.Schema({
    IdUser:{
        type:String,
    },
     IdPost:{
        type:String,
    },
    Comment:{
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
export default mongoose.model('Coment',ComentModel)