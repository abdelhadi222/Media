import  express  from "express";
import {Sing ,Login ,getUser,LogOut,UpdateUser,Forget,UpdatePassword,AllUsers,AddPost
,getAllPosts,getAllComment,CreateComment,DeletOne,getSavedForUser,Saved,
RemoveSave,PostForOneUser,UpdateCove,UpdateImageUser,getById,getAllPostsById,GetAllSaved,
AddSomeInformation,serach,getPostById, getAllPro,AddPro,getProById,NotOnline,Online,
UpdateSt,UpdatePass,AddProblems,deletAccount,SearchCat,getAllProByUser,deletImagePro,
UpdatePro,deletPro,creatChat,findUserChat,findOneChat,creatMessage,getMessages,FindChatByIdChat,DeletAllMessages,
FindUserById,getNoti,deletNoti,Likes, UpdatMes , deletMes  , de , deletSt,Infolw,showStory,chekSt,getShowSt,delatNotiMessageOne,AddStory,CreatCallMessage,CreatCallNoti,UpdtByUser,delatNotiMessage,delatOnePro,deletOneUserByAdmin,AnulSend,FindUsersByIdNew,getAllProblems,deletOneProblem,deletAllProblem,ChekSave,DeletAllNoti,Addamie,FrUser,getUsersSendInvi,getUserSide,getUserNotiAddamie,accpet,Refuse,getNotiByUser} from "../Controllers/controllers.js"
import multer from "multer";

const UserRouter = express.Router()
let i = 0
const storage = multer.diskStorage({
    destination:(req,file,cb,next)=>{
        console.log('one');
        cb(null,'./Images');
    },
    filename:(req,file,cb)=>{

         const finame =   `${Date.now()}_${file.originalname.replace(/\s+/g,'-')}`;
        cb(null,finame)

    }
})

const upload = multer({storage:storage})


UserRouter.post('/Sing',Sing)
UserRouter.post('/Login',Login)
UserRouter.get('/User',getUser)
UserRouter.post('/confirm/:emailTk',UpdateUser)
UserRouter.post('/Forget',Forget)
UserRouter.post('/AddPassword/:emailTk',UpdatePassword)
UserRouter.get('/AllUsers',AllUsers)
UserRouter.post('/AddPost',upload.single('imagePost') ,AddPost)
UserRouter.get('/getAllPost',getAllPosts)
UserRouter.get('/getPostById/:Key',getPostById)
UserRouter.post('/Likes',Likes)
// UserRouter.get('/AddLike',AddLike)
// UserRouter.get('/MunisLike',MunisLike)
UserRouter.get('/getAllComment',getAllComment)
UserRouter.post('/CreateComment',CreateComment)
UserRouter.post('/DeletOne',DeletOne)

UserRouter.post('/Saved',Saved)
UserRouter.post('/ChekSave',ChekSave)
UserRouter.get('/GetAllSaved',GetAllSaved)
UserRouter.get('/getSavedForUser',getSavedForUser)
UserRouter.post('/DeletSave',RemoveSave)

UserRouter.post('/PostForOneUser',PostForOneUser)
UserRouter.post('/UpdateImageCove',upload.single('imageCov'),UpdateCove)
UserRouter.post('/UpdateImageUser',upload.single('imageProfile'),UpdateImageUser)
UserRouter.get('/getById/:key',getById)
UserRouter.get('/getAllPostsById/:key',getAllPostsById)
UserRouter.post('/AddSomeInformation',AddSomeInformation)
UserRouter.post('/Infolw',Infolw)
UserRouter.post('/getAllProblems',getAllProblems)


UserRouter.post('/AddPro',upload.array('images[]'),AddPro)

UserRouter.get('/getAllPro', getAllPro)
UserRouter.get('/getOnePro/:idPro', getProById)
UserRouter.get('/NotOnline', NotOnline)
UserRouter.get('/Online', Online)
UserRouter.post('/Update', UpdateSt)
UserRouter.post('/UpdatePassword', UpdatePass)
UserRouter.post('/AddProblems', AddProblems)
UserRouter.get('/deletAccount', deletAccount)

UserRouter.post('/getAllProByUser', getAllProByUser)

 UserRouter.post('/dletPro',deletPro)
UserRouter.post('/dletImagePro',deletImagePro)
UserRouter.post('/UpdatePro/:idPro',upload.array('images[]'),UpdatePro)

UserRouter.post('/SearchCat', SearchCat)
// Find User By Id =>
 UserRouter.post('/FindUsersById',FindUserById)
  UserRouter.post('/FindUsersByIdNew', FindUsersByIdNew)

// APP ChAt : 
UserRouter.post('/creatChat',creatChat)
UserRouter.post('/findUserChat',findUserChat)
UserRouter.post('/findOneChat',findOneChat)
// message : 
UserRouter.post('/getMessage',getMessages)
UserRouter.post('/creatMessage',upload.array('images[]'),creatMessage)

// get Ona chat BY IDchat  : 
UserRouter.post('/FindChatByIdChat',FindChatByIdChat)

// delet All Messages 
UserRouter.post('/DeletAllMessages',DeletAllMessages)


// get Notification 
UserRouter.post('/getNoti',getNoti)
UserRouter.post('/getNotiByUser',getNotiByUser)
// delet one Noti 
UserRouter.get('/deletNoti/:idNoti',deletNoti)

// send Demande : 
UserRouter.post('/Addamie',Addamie)

// get Demand => 
UserRouter.post('/getUserNotiAddamie',getUserNotiAddamie)
UserRouter.post('/Accpet',accpet)
UserRouter.post('/Refuse',Refuse)

//get Users Side => 
UserRouter.post('/getUserSide',getUserSide)

// get Users Send Invi => 
UserRouter.post('/getUsersSendInvi',getUsersSendInvi)

// annule Send => 
UserRouter.post('/AnulSend',AnulSend)

// Fr User One  => 
UserRouter.post('/FrUser',FrUser)



// delet One Problem
UserRouter.post('/deletOneProblem',deletOneProblem)
// delte All Problems
UserRouter.post('/deletAllProblem',deletAllProblem)


// DeletAllNoti comment like ... => 
UserRouter.post('/DeletAllNoti',DeletAllNoti)

// update User By Admin => 
UserRouter.post('/UpdtByAdmin',upload.single('NewImage'),UpdtByUser)

// delet User bY amdin => 
UserRouter.post('/deletOneUserByAdmin',deletOneUserByAdmin)

// delte oNE pRO By Admin => 
UserRouter.post('/delatOnePro',delatOnePro)

// delet noti Message +> 
UserRouter.post('/delatNotiMessage',delatNotiMessage)

// delet  NotiMessage By Id 
UserRouter.post('/delatNotiMessageOne',delatNotiMessageOne)

// creat Noti Call = > 
UserRouter.post('/CreatCallNoti',CreatCallNoti)

// creat Messge Call =>
UserRouter.post('/CreatCallMessage',CreatCallMessage)

// UserRouter.post('/ff',ff)

// CEART Story =>
UserRouter.post('/AddStory',upload.single('St'),AddStory)
 
// updat Mes => 
UserRouter.post('/UpdatMes',  upload.array('images') , UpdatMes )

// shwo Story => 
UserRouter.post('/showStory',showStory)

// get show By St  =>
UserRouter.post('/getShowSt',getShowSt)

UserRouter.post('/deletMes',deletMes)



 UserRouter.post('/deletSt', deletSt)
 UserRouter.post('/chekSt',  chekSt)





UserRouter.post('/de',de)




UserRouter.post('/serach/:data',serach)

UserRouter.get('/LogOut',LogOut)




export default UserRouter