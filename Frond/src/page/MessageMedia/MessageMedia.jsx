import { useContext, useEffect, useState } from "react"
import "../../page/MessageMedia/MessageMedia.css"
import axios from "axios"
import { Save } from "../../Context/Save";
import { SocketContext } from "../../Context/Socekt";
 import {io} from "socket.io-client";
 import {Windo} from "../../Context/Windo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSms,faCommentSlash,faUsersSlash} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
export default  function MessageMedia(){
   const [chat,setChat] = useState('')
   const [getNewchat,setGetNewchat] = useState(false)
   const [tab,setTab] = useState([])
   const [change,setChange] = useState(false)
   const[user,setUser] = useState('')
   const[noti,setNoti] = useState([])
   const[lasteMe,setLasteMe] = useState([])
      const[relode,setRelode] = useState(false)
   const nav = useNavigate()


   let size = useContext(Windo)


  useEffect(()=>{
       getAllChatUser()
       GetUser()

  },[getNewchat,relode])

  let conta = useContext(Save)


  async function getAllChatUser() {
    try {
      const res =await axios.post('http://localhost:5500/api/findUserChat',{token:window.localStorage.getItem('token')})
    
      setChat(res.data.chatUser)
      setLasteMe(res.data.lasteMesArr)
      // console.log('rrr=>jdj=>',res.data.chatUser);
      // console.log('chat =>' , res.data.chatUser);
      // console.log('rt => ', res.data.UsersInformation);
      // console.log('eee=>',res.data.UsersInformation);
      console.log('DATA +>' , res.data);
      console.log('Tab =>' ,res.data.UsersInformation );
      console.log('Chat',res.data.chatUser);
      setTab(res.data.UsersInformation)
      



 

    } catch (err) {
      console.log(err);
    }
    setChange(p=>!p)
  }


let booj=[]
let abd=[]
let [allNoti,setAllnoti] = useState('')
let [userSender,setUserSender] = useState('')
 
 async function getNoti(ida) {
      try {
          const res =await axios.post('http://localhost:5500/api/getNoti',{mab:ida})
       
          setAllnoti(res.data.allNoti)
        //   console.log("gzdyzteyzter=>" , res.data);
          setUserSender(res.data.arryOfUsersSender)

      } catch (err) {
          console.log(err);
      }
   }
//  useEffect(()=>{
//       getUserByid()
//  },[change])

  // async function getUserByid() {
  // console.log("from dakhl =>",tab);
  //  for (let i = 0; i < tab.length; i++) {

  //     try {
  //     const res = await axios.post(`http://localhost:5500/api/FindUsersById`,{
  //       ids:tab[i]
  //     })
  //     console.log(res);
  //     fintab.push(res.data.User)
      
  //   } catch (err) {
  //     console.log(err);
  //   }

    
  //  }
  //  console.log("fina => ",fintab);
  // }

       const [userFr,setUserFr] = useState([])
      async function GetUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
             setUser(res.data.user);
             setUserFr(res.data.infoUserFrind)
             getNoti(res.data.user._id)
        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }

     async function creatChat(id) {
      console.log(id);
         try {
           const res = await axios.post('http://localhost:5500/api/creatChat',{
    
              idUserTwo:id,
              token:window.localStorage.getItem('token')
            
           })
       
           nav(`${res.data.chat._id}`)
         } catch (err) {
          console.log(err);
          
         }
     }

//  async function  ff() {
//       try {
//            const res = await axios.post('http://localhost:5500/api/ff')
//          } catch (err) {
//           console.log(err);
          
//          }
//   }

     
    // const [socekt,setSocekt] = useState()
    
    //  useEffect(()=>{
    //     console.log("Before creating new socket");
    //      const newSocket = io('http://localhost:4000')
    //      setSocekt(newSocket)
         

    //      return ()=> {
    //         newSocket.disconnect()
    //      }
    //  },[user])

    //   const [onlineUsers,setOnlineUsers] = useState([])
    //  useEffect(()=>{
    //     if(socekt == null) return
    //      socekt.emit("addNewUser",user._id)
    //      socekt.on('getOnlineUsers',(res)=>{
    //         setOnlineUsers(res)
    //      })
    //      return ()=>{
    //         socekt.off("getOnlineUsers")
    //      }
    //  },[socekt])

    const sok =  useContext(SocketContext)
    const socekt = sok.socket
    console.log('Sok from Chat =>' , socekt);
   

     console.log('User Frinde From Cgat => ' , userFr);

          console.log('ttttt=>',  tab );


           useEffect(()=>{

    if(socekt == null || socekt.length < 1 ) return 
    
       socekt.on('getNoti',(data)=>{
        console.log('Data => ' , data);
         setNoti((p)=>[...p,data])
       })
   },[socekt])
   console.log('=>=>=>==>=<+<=++=>=>',noti);

  //  let no = noti.length >0 && noti.filter((e)=>{
  //   return e.type == 33
  //  })

  //  console.log('eerrttyy=>',noti);

  async function deletNOti(id) {
    console.log('ssss',id);
    try {
      const res = await axios.post('http://localhost:5500/api/delatNotiMessageOne',{idU:id})
      console.log('dddd',res);
      setRelode(p=>!p)
      abd=[]
      booj=[]
      conta.setSss(p=>!p)
      
    } catch (err) {
      console.log(err);
    }
  }
  let tes = false

  let uuu 



      return(
        <div className="PageMessage" style={{flexDirection:size.size > 1000 ? "row":'column'}} >


          {size.size < 1000 &&
            <div className="AllFrindesOnline" style={{width:size.size > 1000?'23%':'100%'}}>
            <h3 style={{textAlign:'center',margin:'5px 0 10px 0',padding:'6px',background:'rgb(225, 225, 225)',borderRadius:'10px'}}>My Frindes</h3>
              <div>
                    { Array.isArray(userFr) && userFr.length > 0 ? userFr.map((e,i)=>{
                        return <div  onClick={()=>creatChat(e._id)}  key={i} style={{display:'flex',gap:"20px",textDecoration:'none',color:'black'}}>
                                  
                                <div style={{position:'relative'}}>
                                  {sok.onlineUsers.length > 0 && sok.onlineUsers.map((el,index)=>{
                                     return  e._id == el.UserId ?<div key={index} className="BoxGreenn"></div>:''
                                  })}
                                   <img src={`http://localhost:5500/${e.image}`} style={{width:"40px",height:'40px',borderRadius:'50%'}} alt="" />
                                </div>
                                 <p style={{alignSelf:'center'}}>{e.FirstName} {e.LasteName}</p>
                           </div>
                          

                    }):<div 
                    style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}
                    ><FontAwesomeIcon icon={faUsersSlash} style={{marginRight:'10px'}} />Frindes No Exsit</div>}
                 </div>

          </div>
         }

          <div className="AllChat" style={{width:size.size > 1000?'75%':'100%'}}>
               {/* <button onClick={ff}>ffff</button> */}
        
               {chat.length>0  && tab.length > 0 ? chat.map((e,ind)=>{
                      booj=[]
                      abd=[]
                      console.log('Ind =>' , ind);
                 
                     return <div key={ind} onClick={()=>deletNOti(tab[ind]._id)}>
                              <Link to={`${e._id}`}  style={{textDecoration:'none',color:'black'}}>
                                   <div className="ChatAp">
                                  <div style={{position:'relative'}}>
                                       {sok.onlineUsers.length>0  && sok.onlineUsers.map((el,index)=>{
                                         return    tab[ind]._id == el.UserId ? <div key={index} className="BoxGreenn"></div>:""
                                         })}
                                        <img src={`http://localhost:5500/${tab[ind].image}`} style={{position:'relative',borderRadius:'50%',width:"50px",height:'50Px'}}/>
                                  </div>
                                  <div>
                                <h3>{tab[ind].FirstName} {tab[ind].LasteName}</h3>
                              { uuu = allNoti.length>0 && allNoti.some((e)=>e.UserCreatMessage == tab[ind]._id)}


                               {/* { lasteMe[ind] ?<div className="BoxOfMes">{ lasteMe[ind].Message}</div >:<div className="BoxOfMes">Creat New Message</div>} */}
                               {noti.length>0 && noti.map((el)=>{
                                  return el.senderId == tab[ind]._id  &&  
                                  booj.push(el) 
                               })}
                               {/* {booj.length > 0 && abd.length < 1  &&<div className="BoxOfMes" style={{color:'black',fontWeight:'bold',marginTop:'-10px'}}>His Send {booj.length+allNoti.length} New Message </div>} */}
                               


                               {allNoti.length>0 && allNoti.map((n)=>{
                                 return n.UserCreatMessage == tab[ind]._id && 
                                 abd.push(n)
                               })}
                                {abd.length > 0 &&booj.length < 1   &&<div className="BoxOffMes" style={{color:'black',fontWeight:'bold',marginTop:'-20px'}}>His Send {abd.length} New Message </div>}

                                {booj.length > 0 && abd.length > 0  &&<div className="BoxOfMes" style={{color:'black',fontWeight:'bold',marginTop:'-20px'}}>His Send {booj.length+allNoti.length} New Message </div>}

                                {booj.length > 0 && abd.length < 1  &&<div className="BoxOfMes" style={{color:'black',fontWeight:'bold',marginTop:'-20px'}}>His Send {booj.length+allNoti.length} New Message </div>}
                                
                                {booj.length < 1 && allNoti.length < 1 &&  
                                ( lasteMe[ind] && lasteMe[ind].Message != '' ? <div className="BoxOfMes">{ lasteMe[ind].Message}</div > :"")}

                                
                                
                                                              {booj.length < 1 && allNoti.length < 1 && 
                                ( lasteMe[ind] && lasteMe[ind].ImageMessge.length > 0  ?<div className="BoxOfMes"> Image </div >:"")}

                                                                                              {booj.length < 1 && allNoti.length < 1 && 
                                (  lasteMe[ind] && lasteMe[ind].VideoMessage.length > 0  && <div className="BoxOfMes"> Video</div >)}

                                {booj.length <1 && allNoti.length>0 && !uuu &&(lasteMe[ind] ?<div className="BoxOfMes">{ lasteMe[ind].Message}</div >:<div className="BoxOfMes">Creat New Message</div>)}
                                {!lasteMe[ind] ? <p className="BoxOfMes" >Creat First Message</p>:''}

                                  </div>
                                  </div>
                              </Link>
                            </div>
            }):<div className="NoChat"  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <FontAwesomeIcon icon={faCommentSlash} /> No Chat Exsit</div>} 
          
          </div>


         {size.size > 1000 &&
            <div className="AllFrindesOnline" style={{width:size.size > 1000?'23%':'100%'}}>
            <h3 style={{textAlign:'center',margin:'5px 0 10px 0',padding:'6px',background:'rgb(225, 225, 225)',borderRadius:'10px'}}>My Frindes</h3>
              <div>
                     {  Array.isArray(userFr) && userFr.length > 0 ? userFr.map((e,i)=>{
                        return <div  onClick={()=>creatChat(e._id)}  key={i} style={{display:'flex',gap:"20px",textDecoration:'none',color:'black'}}>
                                  
                                <div style={{position:'relative'}}>
                                  {sok.onlineUsers.length > 0 && sok.onlineUsers.map((el,index)=>{
                                     return  e._id == el.UserId ?<div key={index} className="BoxGreenn"></div>:''
                                  })}
                                   <img src={`http://localhost:5500/${e.image}`} style={{width:"40px",height:'40px',borderRadius:'50%'}} alt="" />
                                </div>
                                 <p style={{alignSelf:'center'}}>{e.FirstName} {e.LasteName}</p>
                           </div>
                          

                    }):<div 
                    style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}
                    ><FontAwesomeIcon icon={faUsersSlash} style={{marginRight:'10px'}} />Frindes No Exsit</div>}
                 </div>

          </div>
         }
           
        </div>
      )
}