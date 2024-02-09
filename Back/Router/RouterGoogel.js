
import passport from "passport";
import  express  from "express";
const GoogleRouter = express.Router()

GoogleRouter.get('/login/failed',async (req,res)=>{
   console.log('No N  npO No');
   res.status(401).json({
    done:false,
    message:'Failed'
  })
})

GoogleRouter.get('/login/done',async (req,res)=>{
  console.log('Yess Yes  Ys');
    if(req.user){
    res.status(200).json({
    done:true,
    message:'Done',
    user:req.user,
    token:req.token
  })
    }
})


GoogleRouter.get('/logOutGoogle',async (req,res)=>{
  res.logout()
  res.redirect('http://localhost:5173')
})

 GoogleRouter.get('/login/google',passport.authenticate('google',{scope:["profile","email"]}))
// GoogleRouter.get('/google/callback',passport.authenticate('google',{ 
//   successRedirect:"http://localhost:5173/dach",
//   failureRedirect:'login/failed'
// }))
GoogleRouter.get('/google/callback',passport.authenticate('google', { 
    successRedirect:"http://localhost:5173",
    failureRedirect: "/login/failed" }),
  // (req, res) => {
  //   // Successful authentication, redirect the user to the desired page
  //   res.redirect('/dash'); // Replace with your desired redirect URL
  // }
);

export default GoogleRouter