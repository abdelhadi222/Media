import mongoose from "mongoose";
const UserModel = mongoose.Schema({
    FirstName:{
        type:String,

    },
     LasteName:{
        type:String,

    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
       
    },
    image:{
        type:String
      },
      ImageCov:{
         type:String
      },
    phone:{
        type:String,
        unique:true,
        minLength: 9
    },
    emailTk:{
        type:String
    },
    type:{
        type:String,
        default:''
    },
    DateN:{
        type:String,
    },
    GoogleId:{
        type:String
    },
    secret:{
        type:String
    },
    numAccount:{
        type:Number,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isOnline :{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:false
    },
    sexe:{
        type:String
    },
    Firends:{
      type:[Object]
    },
    creat:{
        type:Date,
        default:()=> new Date()
    },
    Pays:{
        type:String,
        default:'' 
    },
    Ville:{
        type:String,
         default:'' 
    },
    Work:{
        type:String,
         default:'' 
    },
    IdChats:{
        type:[String]
    },
    AcademicLevel:{
        type:String,
         default:'' 
    },
    noti:{
        type:Boolean,
        default:false
    },
    story:{
        type : [Object]
    }
})
export default mongoose.model('User',UserModel)