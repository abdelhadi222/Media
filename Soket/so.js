import { Server } from "socket.io";

import express from "express";

// const app = express();
// const server = http.createServer(app);

const io = new Server({cors: 'http://localhost:5173'});
let onlineUsers = []

io.on("connection", (socket) => {
  // console.log('soeket => ',socket);

  try {
     console.log('New Connection => ', socket.id);
  } catch (err) {
    console.log('validation err is => ' , err );
  }

  socket.on("addNewUser",(userId)=>{
    console.log('Id Cnx =>',userId);
      !onlineUsers.some((e)=>e.UserId == userId) &&
      onlineUsers.push({
      UserId:userId,
      socketId:socket.id,
     })
     io.emit("getOnlineUsers",onlineUsers)
  })
  

  


  // add Message : 
  socket.on("sendMessage",(message)=>{ 
    console.log("m=>",message);
    const user = onlineUsers.find((user) => user.UserId == message.recipientId)

      console.log('User =>' , user);
    if(user){
      console.log('The message => ', message.newMessage);
      io.to(user.socketId).emit("getMessage",message.newMessage)
      io.to(user.socketId).emit("getNotifcation",{
        senderId : message.newMessage.Sender,
        isRead : false,
        date: new Date(),
        userR:user.UserId
      })
      console.log("message => ",message.newMessage.Sender);
    }
    // notification : 

  })



   // send Methode Two => 
    // socket.on('SendMessage',({senderId , reciverId , text})=>{
    //   console.log('S =>' , senderId);
    //   console.log('R =>' , reciverId);
    //   console.log('oN =>',onlineUsers);
      

    //    const user = onlineUsers.find((user) => user.UserId == reciverId);
    //    console.log('=>',user);

    //       if(user ) {
    //         io.to(user.socketId).emit('getMessage',{
    //          senderId,
    //          text
    //        });
    //       }
        
    // });



  // notification  Like Comment : 

   socket.on('sendNoti',({senderId,reciverId,Laste,ImageSender,num,First,type,idpost,mes,idChat})=>{
    if(reciverId == senderId) return
    console.log(reciverId);
    console.log('online => ',onlineUsers);
    const resiver = onlineUsers.find((user) => user.UserId == reciverId)
    if(!resiver){
      return
    }
    console.log( 'type   => ',reciverId );
    //  console.log( 'ResUser  => ', num);
    io.to(resiver.socketId).emit("getNoti",{
      senderId,
      First,
      Laste,
      ImageSender,
      num,
      reciverId,
      type,
      idpost,
      mes,
      idChat
    })
  })
 


  // Call =>  
  socket.on("CallUser",(data)=>{
    console.log("da => ",data);
    io.to(data.userToCall).emit('CallUser',{singnal:data.singnal,from:data.form})
  })

  socket.on('AnswerCall' , (data)=>
    io.to(data.to).emit('CallAccepted',data.singnal)
  )


    







socket.on('disconnect',()=>{
    onlineUsers = onlineUsers.filter((e)=> e.socketId != socket.id)
    io.emit("getOnlineUsers",onlineUsers)
    // socket.broadcast.emit("callEnd")
  })
});

io.listen(4000,()=>{
  console.log('serve is rannnig... ');
});