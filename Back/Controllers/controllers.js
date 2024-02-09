import bcrypt, { hash } from 'bcrypt';
 import  JWT from "jsonwebtoken";
 import UserModel from "../Model/User.js"
  import PostModel from "../Model/Post.js"
  import ComentModel from "../Model/Comment.js"
  import ProudcutModel from '../Model/Proudcut.js';
  import SaveModel from "../Model/Save.js"
  import ProblemsModel from "../Model/Problems.js"
  import ChatModel from '../Model/Chat.js';
  import MessageModel from '../Model/Message.js';
  import NotificationModel from "../Model/Notification.js"
  import InviModel from '../Model/Invi.js';
  import NotiModel from "../Model/Noti.js"
  // import NotiModel from '../Model/Noti.js';
import { sendConfrmationEmail,   ForgetPassword } from '../nodeMailer.js';
// import Message from '../Model/Message.js';
import e, { request } from 'express';

// import Homme from "../Images/Homme"
// console.log(Homme);

let numUserDeletAccount = 0
let Homme = "1699627185573_Homme.jpg"
let Femme = "1699627195783_Femme.jpg"
const chn = "jhgHUFHEJuhfjf6GFGF55jhjfffh876kjghgkfjr88GFG9DDFFFGGKD93837243434HFDFJfgfgFGhgdfddhHGh"
const imageCov = "1706356115845_BuCov.jpg"
let n = 0
// Register
 export const Sing = async (req,res)=>{
    const {body} = req
    const {email,phone,password,sexe} = body
    
 try{

        const tetsEmail = await UserModel.find({$or:[{email:email},{phone:phone}]})
     if(tetsEmail.length != 0 ){
         return res.json(401)
     }
     const nnn = await UserModel.find()
     const y = nnn.map((e,i)=>{
        return e.numAccount
     })
     console.log(y);
      


         bcrypt.hash(password, 12 , async (err, ha) => {
           if(err){
             return res.json(err)
           }
           let emailToken = ""
         for (let i = 0; i <25; i++) {
          emailToken += chn[Math.floor(Math.random()*chn.length)] 
          }

         const createUser = await UserModel.create({...body,numAccount:y== "-Infinity" ||y.length==0?1:Math.max(...y)+1,password:ha,
          isOnline:true,image:sexe=="man"?Homme:Femme,emailTk:emailToken,ImageCov:imageCov , story:[]})
        if(!createUser){
            return res.json('User Not Create')
        }
        // const {numAccount} = createUser
        //  n = numAccount
        sendConfrmationEmail(email,emailToken)
        return res.json({data:createUser,st:'yes'})

       }); 
 }catch(err){
    console.log("err is : ",err );
 }
}

// login 
export const Login = async (req,res)=>{
    const{body}  = req
    const{password,email} = body
 
    try{
         const check = await UserModel.find({email:email})
  
    if(check.length == 0){
        return res.json(401)
    }
       await check[0].updateOne({isOnline:true})
    const {_id,password:password_db,isActive:isActive} = check[0]

    bcrypt.compare(password,password_db,(err,respondse)=>{
     if(err){
         return res.json(err)
       }
       if(!respondse){
         return res.json('passwoed is wong')
       }

       if(isActive == false){
        return res.json(10)
       }
       const token = JWT.sign({id:_id},"keytoken")
       
       return res.json({...body,token:token})
    })
    }catch(err){
      console.log( "validation err is ", err);
    }

}
// get One User 
export const getUser = async (req,res) =>{
  const {headers} = req
  const {token} = headers

  if(token == undefined ) {
    return res.json(30)
  }
  
  const confi = JWT.verify(token,'keytoken')
  if(!confi){
     return res.json(40)
  }
  const {id} = confi
  const usr = await UserModel.findOne({_id:id})

  if(!usr){
    return res.json('user Not found')
  }
  const {Firends} = usr
  let Ar = []
   for (let i = 0; i < Firends.length; i++) {
     const getU =   await UserModel.findOne({_id:Firends[i]})
     Ar.push(getU)
   }

   if(Ar.length == 0 || Ar == " ") return res.json({message:true,user:usr})


  return res.json({message:true,user:usr,infoUserFrind:Ar})
} 

// logout 
export const LogOut = async (req,res)=>{
    const {headers} = req
    const {token} = headers
    const test = JWT.verify(token,'keytoken')
    if(!test){
      return res.json('err token')
    }
    const {id} = test
    const user = await UserModel.findOne({_id:id})
    if(!user){
       return res.json('UserNot found')
    }
    await user.updateOne({isOnline:false})
    return res.json('is Deconncted ! ')

  }




// this is for confirmation Email with google : 
  export const UpdateUser= async(req,res)=>{
    const {params} = req
    const {emailTk} = params
    try {
    const find = await UserModel.findOne({emailTk:emailTk})
    if(!find){
      return res.json('not found from confirmatin email')
    }
    const{_id} = find

   await  find.updateOne({isActive:true})
    find.save()
    const token = JWT.sign({id:_id},"keytoken")
    return res.json({user:find,token:token})
    } catch (err) {
       console.log(err);
    }
  }




  // forget Password : 
  export const Forget = async (req,res)=>{
    const {body} = req
    const {email} = body
    const chekEmail  = await UserModel.findOne({email:email})
    if(!chekEmail){
      return res.json(404)
    }
     const {emailTk}= chekEmail
     ForgetPassword(email,emailTk)
     return res.json(20)
    
  }

  // Update Password  in forget Password :

  export const UpdatePassword = async (req,res)=>{
   const {params,body} = req
   const {emailTk} = params
   const {password,con} = body
   if(password == '') {
    return res.json('Can You Send The Null Value')
   }
   
   const check = await UserModel.findOne({emailTk:emailTk})
   if(!check) {
    return res.json('Not Found')
   }

   const {_id} = check
  bcrypt.hash(password, 12 , async (err, ha) => {
    if(err){
      console.log('validation err from bycrbte Update password in email',err);
    }
    await check.updateOne({password:ha})
    const token = JWT.sign({id:_id},'keytoken')
     return res.json({message:'Done',token:token})
  })   
  }


  // all User : 
  export const AllUsers = async (req,res)=>{
      try{
        const All = await UserModel.find()
        if(!All){
           return res.json('Users Not Found')
        }
         return res.json({Users:All})
      }catch(err){
         console.log('validtion err from All Users',err)
      }
  }
  // getUserSide 

  export const getUserSide = async (req,res)=>{
     const{body} = req
     const {token} = body

     const VerfiyToken = JWT.verify(token,"keytoken")
    const {id} = VerfiyToken

    const getAllUsers = await UserModel.find()
    const getUserCnx = await UserModel.findOne({_id:id})
    const{Firends} = getUserCnx

    let ar = getAllUsers.filter((e)=>{
      return  e._id != id
    })


    


     

    for (let i = 0; i < ar.length; i++) {
       for (let j = 0; j < Firends.length; j++) {
             if(ar[i]._id == Firends[j]){
               ar.splice(i,1)
             }
       }
    }



       const getAllRe = await InviModel.find({IdUserReciver:id})
       

        for (let i = 0; i < ar.length; i++) {
       for (let j = 0; j < getAllRe.length; j++) {
             if(ar[i]._id == getAllRe[j].IdUserSender){
   
               ar.splice(i,1)
             }
       }
    }




  const getUserlesB3tlhoum = await InviModel.find({IdUserSender:id})


   let userSendInvi = []
  if(getUserlesB3tlhoum.length > 0 ) {

     for (let i = 0; i < getUserlesB3tlhoum.length; i++) {
    const {IdUserReciver} = getUserlesB3tlhoum[i]
    let hh  = await UserModel.findOne({_id:IdUserReciver})
    // console.log('HH =<' , IdUserReciver );
    if(hh == null) continue
    userSendInvi.push(hh)

  }
  }

  // console.log('zeeee=> ',userSendInvi);




 if(userSendInvi.length > 0 ) {
         for (let i = 0; i < ar.length; i++) {
        for (let j = 0; j < userSendInvi.length; j++) {
          if(ar[i].numAccount == userSendInvi[j].numAccount){

             ar[i] = ""
            //  ar.splice(i,1)
           }
    }
  }
 }

  
    if(userSendInvi.length > 0) {
       for (let i = 0; i < userSendInvi.length; i++) {
        userSendInvi[i].type = '111'
        
    }
    }
   let f = [...userSendInvi,...ar]




    return res.json({users:f})


     

  //   let final = []
  //  if(Firends.length > 0) {
  //     for (let i = 0; i < ar.length; i++) {
  //      for (let j = 0; j < Firends.length; j++) {
  //            if(ar[i]._id != Firends[j]){
  //              final.push(ar[i])
  //            }
  //      }
  //   }
  //  }



  //   const getUserlesB3tlhoum = await InviModel.find({IdUserSender:id})



  // let userSendInvi = []
  // if(getUserlesB3tlhoum.length > 0 ) {
  //    for (let i = 0; i < getUserlesB3tlhoum.length; i++) {
  //   const {IdUserReciver} = getUserlesB3tlhoum[i]
  //   let hh  = await UserModel.findOne({_id:IdUserReciver})
  //   userSendInvi.push(hh)

  // }
  // }
 


  // if(userSendInvi.length > 0 ) {
  //    for (let i = 0; i < final.length; i++) {
  //   for (let j = 0; j < userSendInvi.length; j++) {
  //      if(final[i].numAccount == userSendInvi[j].numAccount){
  //         final.splice(i,1)
  //      }
  //   }
  // }
  
  //   for (let i = 0; i < userSendInvi.length; i++) {
  //       userSendInvi[i].type = '111'
        
  //   }
  //  let f = [...userSendInvi,...final]


  //   return res.json({users:f})
  // }
 
  //  if(userSendInvi.length <1 && Firends.length == 0 ) {
  //    return res.json({users:ar})
  // }
  // else if(userSendInvi.length >0 && Firends.length < 1 ) {
  //   let y = [...userSendInvi,...ar]
  //   console.log('y' , y );
  //    return res.json({users:y})
  // }


  } 
// AnulSend => 
 export const AnulSend = async(req, res)=>{
   const {body} = req 
   const {token,IdRec}= body
  
    const VerfiyToken = JWT.verify(token,"keytoken")
    const {id:IdSender} = VerfiyToken

   const de = await  InviModel.findOneAndDelete({IdUserSender:IdSender,IdUserReciver:IdRec})
   return res.json('Done !! ')
 }
// add post 
  export const AddPost = async (req,res)=>{
    const {body,headers,file} = req
    const{token} = headers

    console.log('TTTTTTTTTTTTTTTTT');
    console.log('File Is => ' , file);

    
     let uu = ''
    if(file) {
        uu = file.filename.includes('video') || file.filename.includes('mp4') ;
    }

    //  if(file) {
    //     uu = file.mimetype.includes('video');
    //     if(uu) {
    //       ty = 'Vd'
    //     }
    //     else{
    //       ty = 'Im'
    //     }
    // }

    
    const VerfiyToken = JWT.verify(token,"keytoken")
    const {id} = VerfiyToken
    const getUserCreate = await UserModel.findOne({_id:id})
    const {numAccount,image:imageUser,FirstName,LasteName} = getUserCreate
    if(!getUserCreate){
        return res.json('user Not found from Add Post')
    }
      if(uu) {
         const createPost = await PostModel.create({imageUser:imageUser,FirstName:FirstName,LasteName:LasteName,msg:body.msg,IdUser:id,num:numAccount,Likes:0,comment:0,
         VideoPost:file?file.filename:''   })
         if(!createPost){
          return res.json('Post Not Create')
        }
         return res.json({post:createPost})
      }
      else{
          const createPost = await PostModel.create({imageUser:imageUser,FirstName:FirstName,LasteName:LasteName,msg:body.msg,IdUser:id,num:numAccount,Likes:0,comment:0,
         imagePost:file?file.filename:''})
         if(!createPost){
          return res.json('Post Not Create')
        }
         return res.json({post:createPost})
      }

      // imagePost:file?file.filename:''

     

  }
// get AllPosts
  export const getAllPosts = async (req,res)=>{
      try {
        const getAll = await PostModel.find()
        if(!getAll || getAll.length==0){
          return res.json('Posts Is Found')
        }
        return res.json({Posts:getAll})
      } catch (err) {
        console.log('validation err from Get All Posts',err)
      }
  }
// add Like
//   export const AddLike = async (req,res)=>{ 
//     const {headers} =req
//     const {id} = headers
//     try {
//        const getPost=await PostModel.findOne({_id:id})
//        if(!getPost) return res.json('Post Not Found ')
//        const {Likes} = getPost
//       await getPost.updateOne({Likes:Likes+1})
//       return res.json(getPost)
//     } catch (err) {
//        console.log("validation err is ",err);
//     }
//   }

// export const MunisLike = async (req,res)=>{ 
//     const {headers} =req
//     const {id} = headers
//     try {
//        const getPost=await PostModel.findOne({_id:id})
//        if(!getPost) return res.json('Post Not Found ')
//        const {Likes} = getPost
//       await getPost.updateOne({Likes:Likes-1})
//       return res.json(getPost)
//     } catch (err) {
//        console.log("validation err is ",err);
//     }
//   }

  //Likes : 

 export  const Likes = async (req,res)=>{
  const{body} = req
  const {idPost,idUser} = body



  const getPOST = await PostModel.findOne({_id:idPost})
  const {LikeArray} = getPOST
  const {Likes , IdUser } = getPOST



  if(Likes == 0) {
    await getPOST.updateOne({Likes:Likes+1}) 
    await getPOST.updateOne({LikeArray:[...LikeArray,idUser]}) 
  }
  

    const test = LikeArray.some( (e) => e == idUser)

    if(test){
      await getPOST.updateOne({Likes:Likes-1})
      let ar = LikeArray.filter((e)=>{
         return e != idUser
      })

      await getPOST.updateOne({LikeArray:ar}) 
      // await NotiModel.creatNoti({})

     if(idUser != IdUser){
       let o =  await NotiModel.create({IdUserSender:idUser,IdUserReciver:IdUser,type:'11'})

     }
   
      return res.json(7)
    }

    await getPOST.updateOne({Likes:Likes+1}) 
    await getPOST.updateOne({LikeArray:[...LikeArray,idUser]}) 

     if(idUser != IdUser){
      let  o = await NotiModel.create({IdUserSender:idUser,IdUserReciver:IdUser,type:'1'})

     }

    

    return res.json('Like Done')

  }
  // check Post Save => 
  export  const ChekSave = async (req,res)=>{
    const {body} = req
    const {IdUser,IdPost} = body


    const getPost = await PostModel.findOne({_id:IdPost})
    if(!getPost) return res.json('Not fond post')

    const {SaveArray} = getPost

    // const getU = await UserModel.findOne({numAccount:IdUser})
    // console.log(getU);

    const Verfy = SaveArray.some((e)=> e == IdUser)


    if(Verfy){
      return res.json(true)
    }
    else{
      return res.json(false)
    }
   }
   // get All Noti By User  => 

  export const getNotiByUser = async (req,res)=>{
   const {body} = req
   const {token} = body

   const getIdUsr= JWT.verify(token,'keytoken')
      const {id} = getIdUsr

      const getNoti = await NotiModel.find({IdUserReciver:id})
      if( !getNoti){
        return res.json('Noti Amie Not exsit')
      }

     let Ar = [ ]
    for (let i = 0; i < getNoti.length; i++) {
        const {IdUserSender} = getNoti[i]
      let getuser =  await UserModel.findOne({_id:IdUserSender})
      if(!getuser) return res.json('User Not Found from Get Noti Amie')
      Ar.push(getuser)
    }

      return res.json({AllNotiByUser:getNoti,allInformation:Ar})
  }


   // add Comment
  export const CreateComment = async (req,res)=>{
     const {body,headers} = req
     const {id,token}=headers
     try {
        const getIdUsr = JWT.verify(token,"keytoken")
        const {id:IdUse} = getIdUsr
        const findUser = await UserModel.findOne({_id:IdUse})
        if(!findUser) return res.json('user Not found ')
        const {image} = findUser
        
           const getPost = await PostModel.findOne({_id:id})
           const {IdUser:idU} = getPost

        const createCom = await ComentModel.create({IdUser:IdUse,IdPost:id,imageUser:image ,Comment:body.comment})
        if(!createCom){
          return res.json('Comment nit creat')
        }
      const getp= await PostModel.findOne({_id:id})
      const {comment,IdUser} = getp
        await  getp.updateOne({comment:comment + 1})
       if(idU != IdUse){
            await NotiModel.create({IdUserSender:IdUse,IdUserReciver:IdUser,type:'2'})
       }
        return res.json("Comment Is Creat Done!!")

     } catch (err) {
      console.log(err);
     }
  }



  export const getAllComment= async (req,res)=>{
     const {headers} = req
     const {id} = headers
     try {
       const getAllComent = await ComentModel.find({IdPost:id})
       if(!getAllComent){
        return res.json(' getAllComent not Found')
       }
       res.json({AllComent:getAllComent})
     } catch (err) {
       console.log(err);
     }
  }

  export const DeletOne = async (req,res)=>{
     const {body}= req

     const {id:idPost,token} = body
 
     try {
      const t = JWT.verify(token,'keytoken')
      const {id:idU} = t
        const getPost = await PostModel.findOne({_id:idPost})
        if(!getPost){
          return res.json('Post Not Found')
        }
        
        const {IdUser} = getPost
         if(IdUser != idU) {
          return res.json('this Post not For You')
         }
        await ComentModel.deleteMany({IdPost:idPost})
      
         const delet = await PostModel.findOneAndDelete({_id:idPost})
         if(!delet){
          return res.json('is Not delte Post')
         }
            const delteSave = await SaveModel.deleteOne({IdPost:idPost})
         return res.json('Post is Delet ')
     } catch (err) {
      console.log(err);
     }
  }

  
  export const Saved=async (req,res)=>{
     const {body} =req
     const {id,token} = body
     try {
      const t = JWT.verify(token,'keytoken')
      const {id:idU} = t

      const getPost = await PostModel.findOne({_id:id})
           const {imagePost,msg,LasteName,FirstName,imageUser,VideoPost,IdUser,num,_id:idPost}= getPost
      if(!getPost) return res.json('Post Not found ')

      if(IdUser == idU) return
        
       
        
      const save = await SaveModel.create({IdUser:IdUser,IdPost:idPost,
    Message:msg,VideoPost:VideoPost,LasteName:LasteName,FirstName:FirstName,imageUser:imageUser,imagePost:imagePost,num:num,UserSave:idU})

    const {SaveArray} = getPost
    const tet = SaveArray.some((e)=>e==idU)
    if(!tet)
    {
        await getPost.updateOne({SaveArray:[...SaveArray,idU]})
    }
    // const Ar = SaveArray.
     
      if(!save) return res.json('is not saved')
       await NotiModel.create({IdUserSender:idU,IdUserReciver:IdUser,type:'200'})
      return res.json({saved:save})
     } catch (err) {
      console.log(err);
     }
  }

  export const GetAllSaved = async (req,res)=>{
    try {
      const getAllsave = await SaveModel.find()
      if(!getAllsave){
        return res.json('not found')
      }
      return res.json({AllSaved:getAllsave})
    } catch (err) {
      console.log(err);
    }
  }


  export const getSavedForUser = async(req,res)=>{
     const {headers} = req
     const{token} = headers
     const getIDUser = JWT.verify(token,'keytoken')
     const {id} = getIDUser
     const getSaveUser = await SaveModel.find({UserSave:id})
     if(!getSaveUser){
       return res.json('User Have Not Save')
     }
     return res.json({allSave:getSaveUser})
    }

export const RemoveSave = async (req,res)=>{
    const {body} = req
    const {idPost , idUser} = body
    try {
        const srechfromSave = await SaveModel.findOneAndDelete({IdPost:idPost})
        const getpost = await PostModel.findOne({_id:idPost})
        
        let {IdUser:ff}=getpost
        if(!getpost) return res.json('post Not found')
        await getpost.updateOne({IsSave:false})

        const {SaveArray} = getpost
        const ne = SaveArray.filter((e)=> e != idUser)
         await   getpost.updateOne({SaveArray:ne})

        if(!srechfromSave){
          return res.json('Post Is NoT delet from Save')
        }
          await NotiModel.create({IdUserSender:idUser,IdUserReciver:ff,type:'201'})
        return res.json({message:'isDelet'})
        
      
    } catch (err) {
    console.log(err);
    }
}


export const PostForOneUser = async (req,res)=>{
  const{body} = req
  const {token} = body

    try {
      const getIdUser = JWT.verify(token,'keytoken')
      const {id:IdU} = getIdUser
      const getPosts = await PostModel.find({IdUser:IdU})
      if(!getPosts){
            return res.json('Posts Not found')
      }
      return res.json({PostUser:getPosts})
        
    } catch (err) {
        console.log(err);
    } 
}


export const getPostById = async (req,res)=>{
   const {params} = req
   const {Key} = params
    try {
       const getOnePost = await PostModel.findOne({_id:Key})
       if(!getOnePost){
        return res.json('Not Found ')
       }
       return res.json({post:getOnePost})
    } catch (err) {
      console.log(err);
    }
}

export const UpdateImageUser = async (req,res)=>{
   const {file,headers} = req

   const {token} = headers
   const {filename}= file
   const getIdUser =JWT.verify(token,'keytoken')
   const {id} =getIdUser
   const getUser = await UserModel.findOne({_id:id})
  let y =  await getUser.updateOne({image:filename})


   const getAllPostUser =  await PostModel.find({IdUser:id})
  for (let i = 0; i < getAllPostUser.length; i++) {
     await getAllPostUser[i].updateOne({imageUser:filename})
    }



    const getAllCommentUser =  await ComentModel.find({IdUser:id})
    for (let i = 0; i < getAllCommentUser.length; i++) {
     await getAllCommentUser[i].updateOne({imageUser:filename})
    }

     
     const getAllSave =  await SaveModel.find({IdUser:id})
    for (let i = 0; i < getAllSave.length; i++) {
     await getAllSave[i].updateOne({imageUser:filename})
    }

    //  const getAllPro =  await ProudcutModel.find()
    //   for (let i = 0; i < getAllPro.length; i++) {
    //       if(getAllPro[i].UserId[0]._id == id) {
    //         await getAllPro[i].updateOne({imageUser:filename})
    //       }
    // }


  if(!y){
    return res.json('not Uodate')
  }
  return res.json('Is Update')
}

export const UpdateCove = async(req,res)=>{
     const {file,headers} = req

   const {token} = headers

   const {filename}= file
   const getIdUser =JWT.verify(token,'keytoken')
   const {id} =getIdUser
   const getUser = await UserModel.findOne({_id:id})
  let y =  await getUser.updateOne({ImageCov:filename})
  if(!y){
    return res.json('not Uodate')
  }
  return res.json('Is Update')
}


export const getById = async (req,res)=>{
  const {params,headers} = req
  const {key} = params
   const {token} = headers

   console.log('K' , key )


      // this For User Cnx  => 
      const getIdUser = JWT.verify(token,'keytoken')
      const {id:IdCnx} = getIdUser
      const getUserCnx = await UserModel.findOne({_id:IdCnx})
      const {Firends:FrUserCnx} = getUserCnx

      // this is For Profile User Show => 
  const getUser = await UserModel.findOne({numAccount:key})
  if(!getUser){
     return res.json('not Found')
  }
  const {Firends} = getUser

  let InfoFr = []
  for (let i = 0; i < Firends.length; i++) {
    let y = await UserModel.findOne({_id:Firends[i]})
     InfoFr.push(y)
  }


  let check 

  let gg = FrUserCnx.some((e)=> e == getUser._id)

  if(gg){
     check = 'Is Frinde'
  }else{
    check = 'Is  Not Frinde'
  }

  if(IdCnx == getUser._id) {check = 'Me'}

const allUserSende  = await InviModel.find({IdUserSender:IdCnx})
const fi = allUserSende.filter((e)=>{
  return  e.IdUserReciver == getUser._id
})

if(fi.length > 0) {
   check = 'Is Send'
}



const allRe  = await InviModel.find({IdUserReciver:IdCnx})
const fia = allRe.filter((e)=>{
  return  e.IdUserSender == getUser._id
})

if(fia.length > 0) {
   check = 'Accpet'
}








  return res.json({user:getUser,info:InfoFr,check:check})
}

export const de = async(req,res)=>{
   const u =await  MessageModel.deleteMany()
   return res.json('Is Delet')
}

export const getAllPostsById = async (req,res)=>{
  const {params} = req
  const {key} = params

  const getUser = await UserModel.findOne({numAccount:key})
   if(!getUser){
    return res.json('User Not Found')
   }
  const {_id} = getUser
 
  const getPost = await PostModel.find({IdUser:_id})
  if(!getPost){
    return res.json('Post Not Found ')
  }
  return res.json({posts:getPost})
}

export const AddSomeInformation =  async (req,res)=>{
   const{body,headers}=req

   const {Ville,Work,Pays,AcademicLevel} = body
   const {token} = headers
   const getUserId = JWT.verify(token,"keytoken");
   const {id} = getUserId


   const getUser = await UserModel.findOne({_id:id})
   if(!getUser){
    return res.json('User Not Found ')
   }
  getUser.Ville = Ville;
  getUser.Pays = Pays;
  getUser.Work = Work;
  getUser.AcademicLevel = AcademicLevel;
  const final = await getUser.save();
      return res.json({UserInformation:final})

}
export const serach = async (req,res)=>{
   const {params} =req
  
   const {data} = params

   const se = await UserModel.find({FirstName:data})
   if(!se){
    return res.json('not Found ')
   }


   return res.json({data:se})
}


export const AddPro = async (req,res)=>{
   const {body,headers,  files}= req
   const{token} = headers
   const {Titel,des,Price,adr,category} = body


   try {
    
    const ar = files.map((e)=>{
      return e.filename
    })
  

for (let i = 0; i < ar.length; i++) {
 for (let j = i+1; j < ar.length; j++) {
   if(ar[i]==ar[j]){
       ar.splice(j,1)
   }
 }
}

let one = ar.filter((e,i)=>{
   return i==0
})




   const getIdUser = JWT.verify(token,'keytoken')
   const {id} = getIdUser

   const getUser = await UserModel.findOne({_id:id})
   if(!getIdUser){
    return res.json('User Not Found From AddPro ')
   }

    const {image} = getUser

   const crePr = await ProudcutModel.create({User:getUser,IdUser:id,
  Price:Price,adr:adr,Images:ar,imagePro:one.join(''),Titel:Titel,des:des,category:category[0],imageUser:image})
    if(!crePr){
      return res.json('Pro Not Creat')
    }

    return res.json({pro:crePr})
   } catch (err) {
     console.log("err is  : ",err);
   }
}



export const getAllPro = async (req,res)=>{
     try {  
          const getAllPr = await ProudcutModel.find()
          if(!getAllPr){
            return res.json('Pro Not Exsit')
          }
          return res.json({AllPro:getAllPr})
     } catch (err) {
      
     }
}

export const getAllProByCat = async (req,res)=>{
  const {headers} = req
  const {category}= headers  
   try {
     const get = await ProudcutModel.findOne({category:category})
     if(!get){
      return res.json('This category is Vide')
     }
     return res.json({ProByCat:get})
   } catch (err) {
    
   }
}

export const deletPro = async(req,res)=>{
   const {body} = req
   const {token,proId} = body

   const ch = JWT.verify(token,'keytoken')
   const {id} = ch

  const getPr = await ProudcutModel.findOne({_id:proId})

  if(!getPr) {
    return res.json('Pro Not Exist')
  }


  const {IdUser} = getPr



  if(IdUser != id){
  return res.json('This Pro is Not For You')
  }

  await ProudcutModel.deleteOne({_id:proId})
return res.json('Is Delat Pro ')

}



export const getProById = async (req,res)=>{
   const {params,headers} = req 
   const{idPro} = params
      const {token} = headers
      const getId  = JWT.verify(token,'keytoken')
      const {id} = getId
  

   try {
     const getOne  = await ProudcutModel.findOne({_id:idPro})
     const {IdUser} = getOne

     let he 
     if(IdUser == id) {
        he = false
     }
     else{
      he=true
     }

     if(!getOne){
       return res.json('Prouduct is Not Found ')
     }
     

     let userCnx = await UserModel.findOne({_id:id})
     let {Firends} = userCnx

     let test = Firends.some((e)=> e == IdUser)
    
     if(IdUser == id){
      test = 'nul'
     }



       const getAllInvi = await InviModel.find({IdUserSender:id})

       let filter = getAllInvi.filter((e)=>{
         return e.IdUserReciver == IdUser
       })


       if(filter.length < 1) {
         const getAllInvi = await InviModel.find({IdUserReciver:id})
          let y  = getAllInvi.filter((e)=>{
         return e.IdUserSender == IdUser
       })
        if(y.length > 0) {
           filter = 'Yes'
        }
       }
    
     return res.json({pro:getOne,he:he,test:test,isFrinde:filter})
  } catch (err) {
      return res.json(err)
   }
}


export const  NotOnline= async (req,res)=>{
   const {headers} = req
      const {token} = headers
      const getId  = JWT.verify(token,'keytoken')
      const{id} = getId
      const getUser = await UserModel.findOne({_id:id})
      await getUser.updateOne({isOnline:false})
      return res.json('Is Not Online')
} 
export const Online = async (req,res)=>{
     const {headers} = req
      const {token} = headers
      const getId  = JWT.verify(token,'keytoken')
      const{id} = getId
      const getUser = await UserModel.findOne({_id:id})
      await getUser.updateOne({isOnline:true})
      return res.json('Is  Online')
}


export const UpdateSt = async (req,res)=>{
   const {body,headers} = req
   const { FirstName,LasteName,email,DateN,confirmPassword } = body

   const {token} = headers

   const getIdUser = JWT.verify(token,'keytoken')
   const {id} = getIdUser

   const getAllPost =  await PostModel.find({IdUser:id})
    for (let i = 0; i < getAllPost.length; i++) {
      const y =  await getAllPost[i].updateOne({FirstName:FirstName,LasteName:LasteName})
      getAllPost[i].save()
    }

  const getAllSave =  await SaveModel.find({IdUser:id})
    for (let i = 0; i < getAllSave.length; i++) {
      const y =  await getAllSave[i].updateOne({FirstName:FirstName,LasteName:LasteName})
      getAllSave[i].save()
    }


   const getU = await UserModel.findOne({_id:id})
   if(!getU) {
    return res.json('UserNot Found ')
   }

   const {password} = getU
  

    bcrypt.compare(confirmPassword,password,async (err,respondse)=>{
         if(err){
         return res.json(err)
       }
       if(!respondse){
         return res.json('passwoed is wong')
       }
  
      //  getU.FirstName = FirstName
      // getU.LasteName=LasteName
      // getU.email=email
      // getU.DateN=DateN
  await getU.updateOne({FirstName:FirstName,LasteName:LasteName,email:email,
  DateN:DateN})
  getU.save()

  console.log(getU);
  return res.json('Is Update Done !!!')
    })
}



export const UpdatePass = async (req,res)=>{
  const {body,headers} = req
  const {token} = headers
  const {oldPassword,newpassword,confirmPassword}=body
  
 
    const getIdUser = JWT.verify(token,'keytoken')
   const {id} = getIdUser
   const getU = await UserModel.findOne({_id:id})
   if(!getU) {
    return res.json('UserNot Found ')
   }
   const {password} = getU


    bcrypt.compare(oldPassword,password,(err,respondse)=>{
      if(err) {
         console.log(err)
         return res.json('err',err)
      }

      if(!respondse) {
        return  res.json('Password Old Is Not true')
      }

       bcrypt.hash(newpassword,12,async(err,hach)=>{
        if(err){
          return res.json('err from hash Update',err)
        }
        await  getU.updateOne({password:hach})
        return res.json('is Update Password')
      }) 
     
    })
}

export const AddProblems = async (req,res)=>{
    const {body,headers} = req
    const {token} = headers
    const {Problems} = body
    const getIdUser = JWT.verify(token,'keytoken')
   const {id} = getIdUser
   const  creatProblems = await ProblemsModel.create({IdUser:id,Problems:Problems})
   if(!creatProblems){
      return res.json('Problem NOt Craet')
   }
   return res.json('Problem is creat ')
}


export const deletAccount = async (req,res)=>{
    const {headers} = req 
    const {token} = headers
    const getIdUser = JWT.verify(token,'keytoken')
   const {id} = getIdUser
   const  User = await UserModel.findOne({_id:id})
   let [Firends] = User

    for (let i = 0; i < Firends.length; i++) {
      let y = await UserModel.findOne({_id:Firends[i]})
      let newF = y.Firends.filter((e)=>{
        return e != User._id
      })
       await y.updateOne({Firends:newF})
    }
   if(!User){
      return res.json('User Not Found ')
   }
   await SaveModel.deleteMany({IdUser:id})
   await PostModel.deleteMany({IdUser:id})
   await ProudcutModel.deleteMany({IdUser:id})
   await ProblemsModel.deleteMany({IdUser:id})
    const checkChat = await ChatModel.deleteMany({
           members:{$in:[id]}
        }) 
   await User.deleteOne({_id:id})
  return res.json('Usr Is Delet')

}


export const SearchCat = async(req,res)=>{
  const {body} = req
  const {cat,value} = body

  try {
    const allCat = await ProudcutModel.find({category:cat})
    if(!allCat || allCat.length==0){
      return res.json('This Cat Is Vide')
    }

    return res.json({cat:allCat})
  } catch (err) {
    console.log(err);
  } 
}

export const getAllProByUser = async(req,res)=>{
    const {body} = req  
    const {token} = body

    const getIdUser = JWT.verify(token,'keytoken')
    const {id} = getIdUser

    const getProById = await ProudcutModel.find({IdUser:id}) 


    if(!getProById){
          return res.json('Prouduct not Exsit In This User')
    }
    return res.json({proByUser:getProById})
  }


  export const deletImagePro = async(req,res)=>{
          const {body} = req
          const {index,idPro} = body


          const getPro = await ProudcutModel.findOne({_id:idPro})
          if(!getPro){
            return res.json('Pro Not Exist')
          }
          const {Images} = getPro
             Images.splice(index,1)
   
           await getPro.updateOne({Images:Images})
           if(index == 0){
            await getPro.updateOne({imagePro:''})
           }
     
         return res.json('is Delat Image')
  }


  export const UpdatePro = async(req,res)=>{
        const {params,body,files}=req
        const {Titel,des,adr,Price} = body 
        const {idPro} = params

        const getPro = await ProudcutModel.findOne({_id:idPro})
        if(!getPro)
        {
          return res.json('Pro Not Exist ')
        }

      const neAr = files.map((e)=>{
      return e.filename
    })

        const {Images} = getPro
        let FinalArr = [...Images,...neAr]

        await getPro.updateOne({imagePro:FinalArr[0],Images:FinalArr,Titel:Titel,des:des,adr:adr,Price:Price})
        return res.json(' User Is Update')

  }
// // FindUserById =>
 export const FindUserById = async (req,res)=>{
   const {body} = req
   const {tab,token} = body

   const getIdUserCnx = JWT.verify(token,'keytoken')
   const {id}= getIdUserCnx

   let neAr = tab.filter((e)=>{
     return e != id
   }).join("")
  
   const getUserChating = await UserModel.findOne({_id:neAr})
   if(!getUserChating){
     return res.json('User Not Found')
   }
   const getUserCnx = await UserModel.findOne({_id:id})
   if(!getUserCnx){
     return res.json('User Not Found')
   }
   return res.json({UserChating:getUserChating,UserCnx:getUserCnx})

// try {
//     const getU = await UserModel.findOne({_id:key})
//     console.log(getU);
//     if(!getU){
//       return res.json('User Not found ')
//     }

//     return res.json({User:getU})
// } catch (err) {
//    console.log(err);
// }

 }

  //chat App : 

  export const creatChat = async(req,res)=>{
     const {body} = req
     const {token,idUserTwo} = body
    

   const get = JWT.verify(token,'keytoken')
   const {id}= get
   

      try {
        if(id == idUserTwo) return res.json('Nothing')
        const checkChat = await ChatModel.findOne({
           members:{$all:[id,idUserTwo]}
        }) 
        if(checkChat) return res.json({chat:checkChat})



        const creatChat = await ChatModel.create({members:[id,idUserTwo]})
        return res.json({chatCreat : creatChat})
        
      } catch (err) {
         console.log(err);
      }
  }

  export const findUserChat = async (req,res)=>{
    const {body} =req
    const {token} = body


   const get = JWT.verify(token,'keytoken')
   const {id}= get

    const getCht = await ChatModel.find({
      members:{$in:[id]}
    })


    let newAr = []
    for (let i = 0; i < getCht.length; i++) {
       getCht[i].members.map((e)=>{
         return  e!=id&&newAr.push(e)
       })
    }


    let fi = []

    for (let i = 0; i < newAr.length; i++) {
          const {_id} = getCht[i]
        // if(_id == null) continue
     let get = await UserModel.findOne({_id:newAr[i]})
 
     
     if(get) {
      get.IdChat = _id
      get.save()
      fi.push(get)
     }


    }
      let yi = []
      for (let i = 0; i < getCht.length; i++) {
        let g = await MessageModel.find({IdChat:getCht[i]._id})
        yi.push(g[g.length-1])
        
      }
    return res.json({chatUser:getCht,idUserCnx:id,UsersInformation:fi,lasteMesArr:yi})

  }


  export  const findOneChat = async (req,res)=>{
     const {body} = req
     const {idOne , idTwo} = body
      try {
        const checkChat = await ChatModel.findOne({
           members:{$all:[idOne,idTwo]}
        }) 
        return res.json({chatOne:checkChat})
        
      } catch (err) {
         console.log(err);
      }
  }

  //  message : 

  export const creatMessage = async(req,res)=>{
      const {body,headers,files} = req
      const {token} = headers
      const {message,ChatId } = body

      let b = false

      console.log('Files' , files);
      console.log('Mess' , message);


      const getIdUsr= JWT.verify(token,'keytoken')
      const {id} = getIdUsr




      let arr = files.map((e)=>{
         return e.filename
      }) 

      let desVideo = arr.filter((e)=>{
         return e.slice(-3) == "mp4"
      })
      
      let desImages = arr.filter((e)=>{
         return e.slice(-3) != "mp4"
      })

      if(files.length == 0 && message == "") {
         b = true
      }
      console.log(b);


    
      
      const creatMessage = await MessageModel.create({Sender:id,IdChat:ChatId,Message:message,
      ImageMessge:desImages,VideoMessage:desVideo})
      if(!creatMessage ){
        return res.json('Messga not creat ')
      }
        const getChat = await ChatModel.findOne({_id:ChatId})

        let ar = getChat.members.filter((e)=>{
          return e != id
        }).join('')

      if(!b){
           const creatNoti = await NotificationModel.create({Mabaoute:ar,IdChat:ChatId,UserCreatMessage:id,Message:message})
           return res.json({MessageCreat : creatMessage,b:b} )
      }
      return res.json({MessageCreat : creatMessage,b:b} )
  }


  // get Noti 
export   const getNoti = async (req,res)=>{
       const {body} = req 
       const {mab} = body


      // const getIdUsr= JWT.verify(token,'keytoken')
      // const {id} = getIdUsr
      //  const findUser =  await UserModel.findOne({_id:id})
      //  if(!findUser){
      //   return res.json('User Nout Found fro noti')
      //  } 

       const getNoti = await NotificationModel.find({Mabaoute:mab})
       if(!getNoti) return res.json('Not i not found ')


      let ar = []
      for (let i = 0; i < getNoti.length; i++) {
        const y = await UserModel.findOne({_id:getNoti[i].UserCreatMessage})
        ar.push(y)
      }

      

        return  res.json({allNoti:getNoti,arryOfUsersSender:ar})
  }

  // export const ff = async(req,res)=>{
  //    await NotificationModel.deleteMany()
  // }


  export const getMessages = async(req,res)=>{
          const  {headers,body} =req
          const {idChat} = body
          const {token} = headers

            const getIdUsr= JWT.verify(token,'keytoken')
            const {id} = getIdUsr
      
          
          const getChat = await MessageModel.find({IdChat:idChat})
  
          if(!getChat){
            return res.json('chat NOt Found ')
          }
          // console.log("All Chat =< ", getChat[0]);
          //   console.log("All Message of This Chat ==> : ",getChat);
          // let messageUserCnx = getChat.filter((e)=>{
          //          return e.Sender == id 
          // })
          //  let messageUserChating = getChat.filter((e)=>{
          //          return e.Sender != id 
          // })
           
          return res.json({IdUserCnx:id,AllMessage:getChat})
  }


  // Find Chat by Id Chat : 
  export const FindChatByIdChat = async (req,res)=>{
     const {body} = req 
     const {IdChat} = body
     const getOneChat = await ChatModel.findOne({_id:IdChat})
     if(!getOneChat){
       return res.json('Chat Is Not Found')
     }
     return res.json({chat:getOneChat})
  }

  // delet All Messages : 

  export const DeletAllMessages = async (req,res) =>{
    const {body} = req
    const {idChat} = body

     await MessageModel.deleteMany({IdChat:idChat})
     return res.json('Messages Is Delet ')
     
  }

  // delet One Noti 
export const deletNoti = async(req,res)=>{
   const {params} = req
   const {idNoti} = params

  await NotificationModel.deleteOne({_id:idNoti})
  return res.json('Noti Delet ')
}
 
// AddAmie => 

export const Addamie = async (req,res)=>{
    const{body} = req
    const {IdUserSender,IdUserReciver} = body
   

    const  creatInvi = await InviModel.create({IdUserSender:IdUserSender,IdUserReciver:IdUserReciver})
    if(!creatInvi)
    {
      return res.json('Invi Cretz')
    }
    return res.json({InviCreat:creatInvi})
}

export const getUserNotiAddamie = async (req,res)=>{
   const {body} = req
   const {token} = body

   const getIdUsr= JWT.verify(token,'keytoken')
      const {id} = getIdUsr

      const getInvi = await InviModel.find({IdUserReciver:id})
      if( !getInvi){
        return res.json('Noti Amie Not exsit')
      }

     let Ar = [ ]
    for (let i = 0; i < getInvi.length; i++) {
        const {IdUserSender} = getInvi[i]
      let getuser =  await UserModel.findOne({_id:IdUserSender})
      if(!getuser) return res.json('User Not Found from Get Noti Amie')
      Ar.push(getuser)
    }
      return res.json({AllInviByUser:Ar})
      


}


// accpet => 
export const accpet = async (req,res)=>{
   const {body} = req
   const {IdUserConfirmation,userCnx} = body

  
      const getUserSender  = await UserModel.findOne({_id:IdUserConfirmation})
      const getUset = await UserModel.findOne({_id:userCnx})
      const{Firends,numAccount} = getUset


         const get = await InviModel.find({IdUserReciver:userCnx})
        let y = get.filter((e)=>{
        return  e.IdUserSender == IdUserConfirmation
      })

     

       if(y.length < 1 || !y[0]._id) return res.json('Iniv Is Annule')

       await InviModel.deleteOne({_id:y[0]._id})

      await getUset.updateOne({Firends:[...Firends,IdUserConfirmation]})
      await getUserSender.updateOne({Firends:[...Firends,userCnx]})

  

    

      // await InviModel.findOneAndDelete({})

      return res.json('User Add In  Firends')


}


// annule iNvi => 
export const Refuse = async (req,res)=>{
  const{body} = req

  const{idSende,userCnx} = body


  // const getIdUsr= JWT.verify(token,'keytoken')
  //     const {id} = getIdUsr




  const get = await InviModel.find({IdUserReciver:userCnx})


      let y = get.filter((e)=>{
        return  e.IdUserSender == idSende
      })


      if(y.length < 1 || !y[0]._id) return res.json('Iniv Is Annule')
      await InviModel.deleteOne({_id:y[0]._id})

      return res.json('Is Annule Invitaion')

}


// get User send Invi => 
export const getUsersSendInvi  = async(req,res)=>{
   const{body} = req
    const {token} = body
     const getIdUsr= JWT.verify(token,'keytoken')
      const {id} = getIdUsr

      const getInviSend = await InviModel.find({IdUserSender:id})

      let u = []
      for (let i = 0; i < getInviSend.length; i++) {
        const {IdUserReciver} = getInviSend[i]
       let y =  await UserModel.findOne({_id:IdUserReciver})
       u.push(y)
        
      }

     return res.json({UserSendInvi:u})
}



export const FrUser = async(req,res)=>{
   const{body} = req 
   const {idU} =  body
   

   const getsert = await UserModel.findOne({_id:idU})
   const{Firends} = getsert

    let Ar = []
   for (let i = 0; i < Firends.length; i++) {
     const getU =   await UserModel.findOne({_id:Firends[i]})

     Ar.push(getU)
   }



   if(Ar.length == 0 || Ar=='') return

   

   return res.json({infoUserFrind:Ar})

}



export const DeletAllNoti = async (req,res)=>{
   const {body} = req
   const {idR} = body

   const get = await NotiModel.deleteMany({IdUserReciver:idR})
   return res.json('=> Delet All no <=')
}



export const Infolw  = async (req,res)=> {
    const {body}  = req
    const {idUserShow, token} = body 

      const getIdUsr= JWT.verify(token,'keytoken')
      const {id} = getIdUsr

      const getUserCnx = await UserModel.findOne({_id:id})
      const {Firends} = getUserCnx

      const getUserSohww = await UserModel.findOne({numAccount:idUserShow})
      const {Firends:FrUserShow} = getUserSohww
       
      // user Cnx 
      let newForUserCnx = Firends.filter((e,i)=>{
         return  e != getUserSohww._id
      })
       await getUserCnx.updateOne({Firends:newForUserCnx})


       // ather User
           let newForUserShow = FrUserShow.filter((e,i)=>{
         return  e != id
      })
       await getUserSohww.updateOne({Firends:newForUserShow})


       return res.json(' => Is In folow <=')
}

export const getAllProblems = async (req,res)=>{
   try {
      const getAllProblems  =  await ProblemsModel.find()
      if(!getAllProblems) return res.json('Not Found Problrems')

        let ArUsers = [] 
        for (let i = 0; i < getAllProblems.length; i++) {
           const {IdUser} = getAllProblems[i];
            let OneUser =  await UserModel.findOne({_id:IdUser})
            ArUsers.push(OneUser)  
        }

       return res.json({Problems:getAllProblems,UserPro:ArUsers})
   } catch (err) {
      console.log(err);
   }
}



export const deletOneProblem = async(req,res)=>{
   const {body} = req 
   const {idProblem} = body
   await ProblemsModel.deleteOne({_id:idProblem})
   return res.json('Is delet Problem')
}

export const deletAllProblem = async(req,res)=>{
   await ProblemsModel.deleteMany()
   return res.json('Is delet All Problems')
}

export const  FindUsersByIdNew = async (req,res)=>{
    const {body} = req
    const {idUesr} =body

    const getUser = await UserModel.findOne({_id:idUesr})
    return res.json({User:getUser}) 
}


export const UpdtByUser = async (req,res)=>{
    const {body,file} = req

    const {idUser,role} =body


    try {
      const User = await UserModel.findOne({_id:idUser})
       const {image} = User
       await User.updateOne({isAdmin:role=="Admin"  ?true:false,image:file?file.filename:image})
       return res.json('Is Uodate Admin ')
    } catch (err) {
       console.log(err);
    }




}



export const deletOneUserByAdmin = async (req,res)=>{
     const{body} = req
     const {idUser} = body 

     console.log('O',idUser);
      
     let User = await UserModel.findOne({_id:idUser})
     let {Firends} = User
   

    for (let i = 0; i < Firends.length; i++) {
      let y = await UserModel.findOne({_id:Firends[i]})
      let newF = y.Firends.filter((e)=>{
        return e != User._id
      })
       await y.updateOne({Firends:newF})
    }

   if(!User){
      return res.json('User Not Found ')
   }

   await SaveModel.deleteMany({IdUser:idUser})
   await PostModel.deleteMany({IdUser:idUser})
   await ProudcutModel.deleteMany({IdUser:idUser})
   await ProblemsModel.deleteMany({IdUser:idUser})
    const checkChat = await ChatModel.deleteMany({
           members:{$in:[idUser]}
        }) 
     const getUser =  await UserModel.deleteOne({_id:idUser})
     return res.json('Is Delet By Admin')

}

export const delatOnePro = async(req,res)=>{
   const {body} = req
   const {idPro} = body

 
  try {
      const delet = await ProudcutModel.deleteOne({_id:idPro})
     return res.json('Is DeLT pro By Admin ')
  } catch (err) {
    console.log(err);
  }
}


export const delatNotiMessage = async(req,res)=>{
   const {body} = req
   const {token} = body

   const getIdUsr= JWT.verify(token,'keytoken')
      const {id} = getIdUsr
      await NotificationModel.deleteMany({Mabaoute:id})
      return res.json('=> Done <=')
}


export const delatNotiMessageOne = async(req,res)=>{
   const {body} = req 
   const {idU} = body


   const et = await NotificationModel.deleteMany({UserCreatMessage:idU})

   return res.json(' Do do do ')
}


export const CreatCallNoti = async (req,res)=>{
     const {body} = req
     const {idRec,idSen} = body


     const creatN = await NotiModel.create({IdUserSender:idSen,IdUserReciver:idRec,type:"2000"}) 
     if(!creatN) return res.json('Is Not Craet noti Call')
     return res.json('Is Cret noti Call ')
}

export const CreatCallMessage = async (req,res)=>{
     const {body} = req
     const {idChat,idSen,mes} = body



     let creaM = await MessageModel.create({Sender:idSen,IdChat:idChat,Message:mes})
     if(!creaM){
       return res.json('Message Call is nOt Creat')
     }
     return res.json('iS Creat Message cALL')
} 


export const AddStory = async  (req,res)=>{
    const {body ,file} = req
    const {token} = body
    console.log('rrrrrrrrrrr');


      let ty = ''
      let uu = ''
    if(file) {
        uu = file.mimetype.includes('video');
        if(uu) {
          ty = 'Vd'
        }
        else{
          ty = 'Im'
        }
    }

 try {
      let GetId = JWT.verify(token,"keytoken")
    const {id} = GetId
  

    const getUser =  await UserModel.findOne({_id:id})
    if(!getUser) return res.json('User not Found')

      let {story:ss,_id} = getUser

         let ob = {st:file.filename,show:[],userId:_id,type:ty,creat:new Date}
      // let ar = {st:file.filename,show:[]}
   

      await getUser.updateOne({story:[...ss,ob]})
      getUser.save()

      console.log('Is Done m');

      return res.json('St Add ')
      
 } catch (err) {
    console.log('er =>' , err);
 }
      
  }

  export const showStory = async (req,res) =>{
     const {body} = req   
     const { token ,numSt , userSt}= body


     
     let getIdUser = JWT.verify(token,'keytoken')
     const {id} = getIdUser

    if(id == userSt) {
      return
    }

     let getUser = await UserModel.findOne({_id:userSt})
     let {story:s} = getUser
      //  console.log(getUser.story.show);
      // console.log('r' , s.show);
   if(s[numSt].show.length > 0) { 
        let y = s[numSt].show.some((e)=> e == id)

        if(y) {
             return res.json('Is Exsit')
       }

       await getUser.updateOne({story:[...s,s[numSt].show.push(id)]})
             getUser.save()

             return res.json('Is Done Show ')
   }
   else{
      //  let y = s[numSt].show.some((e)=> e == id)
      // console.log(y);

      //   if(y) {
      //        return res.json('Is Exsit')
      //  }

       await getUser.updateOne({story:[...s,s[numSt].show.push(id)]})
             getUser.save()

             return res.json('Is Done Show ')
   }


}

export const getShowSt = async (req,res)=>{
   const {body} = req
   const {token , numSt} = body

     let getIdUser = JWT.verify(token,'keytoken')
     const {id} = getIdUser

        let getUser = await UserModel.findOne({_id:id})
        const {story} = getUser

        let ShowUsers = [] 

      for (let i = 0; i < story[numSt].show.length; i++) {
        let y = await UserModel.findOne({_id:story[numSt].show[i]})
        ShowUsers.push(y)
      }

      return res.json({Sh:ShowUsers})

}

export const deletSt = async (req,res)=>{
   const {body} = req
   const {token , numSt} = body




     let getIdUser = JWT.verify(token,'keytoken')
     const {id} = getIdUser

        let getUser = await UserModel.findOne({_id:id})
        const {story} = getUser
        

       let u =  story.splice(numSt,1)


       let AR = story.filter((e)=>{
         return  e.st != u.st
       })



       await getUser.updateOne({story:AR})

       return res.json('Is Done delelt story ')

}


export const chekSt = async(req,res)=>{
   const {body} = req
   const {token} = body


    
   const get = JWT.verify(token,'keytoken')
   const {id} = get

   const getUser = await UserModel.findOne({_id:id})

   const{story} = getUser
   let y = new Date
   let i =  y.toString().slice(0,10)
  //  console.log('One => ',i.slice(-2) > story[0].creat.toString().slice(8,10) );
  // console.log('one => ' , story[0].creat.toString().slice(15,24));
  // console.log('Two => ' ,  i.toString().slice(-2) );
    // console.log('Two => ' , i );
   
  

  if(story.length > 0) {
     for (let i = 0; i < story.length; i++) {
      
        
     if( parseInt(i.toString().slice(-2) ) + 1   == parseInt(story[i].creat.toString().slice(8,10)) ){
       story.splice(i,1)
     }
    
  }
  }
  let ar = [...story]

  await getUser.updateOne({story:ar})

  return res.json('done')

}

export const UpdatMes = async (req,res)=>{
  const {body , files} = req
  // let {data} = body

    const get = JWT.verify(body.token,'keytoken')
    let {id} = get

  // const {idM  , message } = data

 try {
     console.log('µµµµµµµµµµµ' , body);

    let arr = files.map((e)=>{
         return e.filename
      }) 

      let desVideo = arr.filter((e)=>{
         return e.slice(-3) == "mp4"
      })
      
      let desImages = arr.filter((e)=>{
         return e.slice(-3) != "mp4"
      })


  let getM = await MessageModel.findOne({_id:body.IdM})
  let {IdChat}= getM
  await getM.updateOne({Message:body.message,ImageMessge:desImages,VideoMessage:desVideo})

    const getChat = await ChatModel.findOne({_id:IdChat})

        let ar = getChat.members.filter((e)=>{
          return e != id
        }).join('')

        const creatNoti = await NotificationModel.updateOne({Mabaoute:ar,IdChat:IdChat,UserCreatMessage:id})

  return res.json('Is FFFFFFFFFFFFFFFFF')
 } catch (err) {
    console.log(err);
 }

}


export const deletMes = async (req,res)=>{
  const {body} = req
  const {idM} = body
  const get = await MessageModel.deleteOne({_id:idM})
  return res.json('Is Delet Message')
}




























































































































































