import mongoose from "mongoose";
const ProudcutModel = mongoose.Schema({
    Titel:{
        type:String,
        required:true
    },
     des:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    imagePro:{
        type:String
    },
    Images:{
        type:[String]
    },
    adr:{
        type:String
    },
    User:{
        type:[Object]
    },
    IdUser:{
        type:String
    },
category:{
    type:String
},
imageUser:{
    type:String
},
    creat:{
        type:Date,
        default:()=> new Date()
    }
})
export default mongoose.model('Proudcut',ProudcutModel)