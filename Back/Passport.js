import GoogleStrategy from "passport-google-oauth20"
GoogleStrategy.Strategy

import UserModel from "./Model/User.js"
import passport from "passport"
// import JWT  from "jsonwebtoken"
// let y  = GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;





const  GOOGLE_CLIENT_ID = "1075750884438-othljd23ln4nceje68n5gs2qs9k8fv96.apps.googleusercontent.com"
const  GOOGLE_CLIENT_SECRET = "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"

 export const pas =   passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },

  async (accessToken, refreshToken, profile,done)=> {
    const DefualtUser = {
      FirstName:`${profile.name.givenName}`,
      LasteName : `${profile.name.familyName}`,
      email:profile.emails[0].value,
      image: profile.photos[0].value,
      googleId:profile.id
    }

console.log("profilr is , ",profile,done)
 try {
    const UserFind = await  UserModel.findOne({ GoogleId: profile.id })

        if( UserFind) {
             return done(null,UserFind)
        }

   let num = await UserModel.find()

     const nnn = await UserModel.find()
     const y = nnn.map((e,i)=>{
        return e.numAccount
     })
     console.log(y);
      

   console.log('length : ',num.length);
   let User =   await UserModel.create({...DefualtUser,GoogleId:profile.id,isOnline:true,password:"null", numAccount:y== "-Infinity" ||y.length==0?1:Math.max(...y)+1})
   console.log("User IS : ",User);
 if(UserFind && UserFind[0] ) return done(null,UserFind && UserFind[0])
  if(User && User[0] ) {
     return done(null,User && User[0])
 
  

  }


  // const {_id} = UserFind
  // const token = JWT.sign({id:_id},"keytoken")

} catch (err) {
  console.log('err from google sing is ',err)
}
  }

 
));


passport.serializeUser((User,cb)=>{
  console.log('serializeUser : ',User)
  cb(null,id)
})

passport.deserializeUser(async(id,cb)=>{
  const user = await UserModel.findOne({where:{id}})
  .catch((err)=>console.log('err is deserializeUser',err))
  cb(err,null)
    console.log('DeserializeUser : ',user)
  if(user) cb(null,user)
})
