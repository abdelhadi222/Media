import mongoose from "mongoose";
const SaveModel = mongoose.Schema({
    IdUser:{
        type:String,
    },
     IdPost:{
        type:String,
    },

    Message:{
        type:String
    },
      FirstName:{
        type:String,
    },
     LasteName:{
        type:String,
    },
     imageUser:{
        type:String,
    },
    UserSave:{
        type:String
    },
    num:{
        type:String
    },
    VideoPost:{
        type:String
    },
    imagePost:{
    type:String
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
})
export default mongoose.model('Save',SaveModel)