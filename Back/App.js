import express from "express";
import http from "http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserRouter from "./Router/Router.js";
import cors from "cors"
import passport from "passport";
import cookieSession from "cookie-session";
import GoogleRouter from "./Router/RouterGoogel.js";
// import socketio from "socket.io"
// import { Socket } from "socket.io";

const PORT = 5500


const app = express()

app.use(bodyParser.json())
http.createServer(app)
app.use(cors());
//  {origin: "*",credentials:true}
// {origin: "*",credentials:true}
app.use(express.static('images'))
app.use(bodyParser.json());

// web socket : 
// const serve = http.createServer(app)
// const io = Socket(serve)


// cookie : 
app.use(cookieSession({
  name: 'session',
  keys: ["keyCookie"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


// passport : 
app.use(passport.initialize());
app.use(passport.session());
 

app.use('/api/',UserRouter)
app.use('/auth/',GoogleRouter)





mongoose.connect("mongodb://127.0.0.1:27017/media")
.then(()=>{
    console.log('Data base Done!');
}).catch((er)=>{
    console.log("validation err is ",er);
})
app.listen(PORT,()=>{
   console.log(`PORT IS ${PORT}`)
})