// import { createContext, useEffect, useState } from "react";
// import {io} from "socket.io-client";
// export const ChatContext = createContext();




import { createContext, useEffect, useState } from "react";
 import io from "socket.io-client";
 import axios from "axios";

export  const SocketContext = createContext()

export default function ChatContextProvider({children}) {

   const [socket,setSocket] = useState([])

   // const [uu,setuu] = useState(false)
    const [id,setId] = useState('')
    const [user,setUser] = useState('')
     const [changeSokt,setChangeSokt] = useState(false)


   


         useEffect(()=>{
            GetUser()
         },[])
        async function GetUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
            //  setUser(res.data.user);
            console.log(res.data.user._id);
             setId(res.data.user._id);
             setUser(res.data.user)
        
            //  console.log(res.data.user._id);
             
            
            //  console.log('User =>',res.data.user);
        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }


   // useEffect(()=>{
   //       console.log(" ** Before **");
   //       const newSocket = io('http://localhost:4000')
   //       setSocket(newSocket)
         

   //       return ()=> {
   //          newSocket.disconnect()
   //       }
       
   // },[userId])



   //   useEffect(()=>{
   //    if (socket.connected) {
   //      console.log('yes From context');
   //      socket.emit('addNewUser', userId);
   //     } else {
   //        console.error('Socket connection not established.');
   //     }

   //    },[userId])




   //  const [socekt,setSocekt] = useState()

     useEffect(()=>{
      if(!id) return
        console.log("Before creating new socket");
         const newSocket = io('http://localhost:4000')
         setSocket(newSocket)
         console.log("After =>",newSocket);
      
         return ()=> {
            newSocket.disconnect()
         }
     },[id])

   const [onlineUsers,setOnlineUsers] = useState([])
     console.log('r=>',onlineUsers);
     
     useEffect(()=>{
        if(socket == null || !id  ) return
         socket.emit("addNewUser",id)
         socket.on('getOnlineUsers',(res)=>{
            setOnlineUsers(res)
         })
         return ()=>{
           socket.off("getOnlineUsers")
         }
     },[socket,changeSokt])
   
   

   return <SocketContext.Provider value={{socket,onlineUsers,setOnlineUsers,changeSokt,setChangeSokt}}>{children}</SocketContext.Provider>
}