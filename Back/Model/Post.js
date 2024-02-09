import mongoose from "mongoose";
const PostModel = mongoose.Schema({
    IdUser:{
        type:String,
    },
     Likes:{
        type:Number,
        required:true
    },
     FirstName:{
        type:String,
    },
     LasteName:{
        type:String,
    },
    imagePost:{
        type:String
      },
      VideoPost:{
        type:String
      },
      num:{
        type:String
    },
    msg:{
        type:String,
        default : ""
    },
      IsSave:{
        type:Boolean,
        default:false
    },
   comment:{
    type:Number
   },
   imageUser:{
        type:String,
    },
    LikeArray:{
       type:[String]
    },
    SaveArray:{
       type:[String]
    },
    creat:{
        type:Date,
        default:()=> new Date()
    }
})
export default mongoose.model('Post',PostModel)