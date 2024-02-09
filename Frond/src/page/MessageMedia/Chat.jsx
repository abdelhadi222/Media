import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser,faPaperPlane,faFaceSmile,faDeleteLeft,faTrash,faFileCirclePlus,faMicrophone,faPhone,faPhoneVolume ,faVideo,faVideoSlash,faPhoneSlash} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react"

 import { SocketContext } from "../../Context/Socekt";
 import EmojiPicker from 'emoji-picker-react';
 import { NotiMessage } from "../../Context/NotiMessage";

 import {New} from "../../Context/New"
//  import Peer from "peerjs";
import { Peerr } from "../../Context/Peer";
// import Peer from "peerjs";
import { useNavigate } from "react-router-dom";
// import { creatMessage } from "../../../../Back/Controllers/controllers";


//  import Peer from 'simple-peer';
// import Peer from 'simple-peer';
// import SimplePeer from 'simple-peer'


//  import {ChatContext} from "../../Context/Socekt.jsx";
// import Peer from 'peerjs';

export default function Chat() {
      const [relode,setRelode]=useState(false)

      let [trt,setTrt] = useState(false)
         let [dl,setDl] = useState(false)
       let [num,setNum] = useState(0)
    const [tab,setTab]=useState([])
     const [chat,setChat]=useState('')
     let nav= useNavigate()

     const [uplode,setUplode]=useState([])

    const [idMessage,setIdMessage]=useState('')
    const [getIdMessage,setGetIdMessage]= useState(false)
    const [www,setWww]= useState(false)

    const [message,setMessage]=useState([])
    const [userChating,setUserChating]= useState([])
    const [rec,setRec]= useState([])
    const [userCnx,setUserCnx]=useState("")
    const [getMesa,setGetMesa] = useState(true) 
    const [newMessage,setNewMessage] = useState({})
    const [messageUserCnx,setMessageUserCnx] = useState([])
        const [voice,setVoice] = useState(false)
    const [idUserCnx,setIdUserCnx] = useState([])
    const[user,setUser] = useState('')
    const [delet,setDelet] = useState(false) 
     const [noti,setNoti] = useState([]) 
     const [image,setImage] = useState([]) 
      const [messageSok,setMessageSok] = useState(null) 
      const [emoji,setEmoji] = useState(false)
       const [messageAndemo,setMessageAndemo] = useState([])
      const [valemoji,setValemoji] = useState('')
            // const [code,setCode] = useState(false)

      const [stream,setStream] = useState("")
      const [receivingCall,setReceivingCall] = useState(false)
      const [caller,setCaller] = useState('')
      const [callerSingal,setCallerSingal] = useState()
      const [accpet,setAccpet] = useState(false)
       const [idToCall,setIdToCall] = useState('')
       const [callEnd,setCallEnd] = useState(false)
       let [cami,setCami] = useState(true)
       const [showCamera,setShowCamera] = useState(true)

              // const [seconde,setSeconde] = useState('00')
              // const [munit,setMunit] = useState('00')
              let seconde = "00"
              let munit= "00"

       const myVideo = useRef(null)
       let userVideo = useRef(null)
       let connectionRef = useRef()

         let isNew = useContext(New)

      //  let conta = useContext(Meun)

      let ShoProgressImage = image.length > 0 && image.map((img,i)=>{
        return <div key={i} >
              {img.type.includes('video')?
               <div style={{padding:'10px',marginTop:'20px',borderRadius:'30px',display:'flex',gap:'40px',width:'100%',background:'white ', height:'140px'}}>
                    <div style={{alignSelf:'center'}}>
                <video controls src={URL.createObjectURL(img)} style={{width:'100Px' ,height:'100px' ,borderRadius:'50%'}} alt="" />
             </div>
             <div  style={{width:'100%'}}>
               <p style={{margin:'10px 0'}}>{img.name}</p>
               <p style={{margin:'10px 0'}}>{(img.size / 1024) < 900 ? (img.size / 1024).toFixed(2) + " Kb":(img.size / (1024 * 1024)).toFixed(2) + " Mb"} </p>
               <div className="proGress">
                  <div className="span">{uplode} %</div>
                  <span style={{width:`${uplode}%`}}></span>
                </div>
             </div>
               </div>
              :
              <div style={{padding:'10px',marginTop:'20px',borderRadius:'30px',display:'flex',gap:'40px',width:'100%',background:'white ', height:'140px'}}>
                   <div style={{alignSelf:'center'}}>
                <img src={URL.createObjectURL(img)} style={{width:'100Px' ,height:'100px' ,borderRadius:'50%'}} alt="" />
             </div>
             <div  style={{width:'100%'}}>
               <p style={{margin:'10px 0'}}>{img.name}</p>
               <p style={{margin:'10px 0'}}>{(img.size / 1024) < 900 ? (img.size / 1024).toFixed(2) + " Kb":(img.size / (1024 * 1024)).toFixed(2) + " Mb"} </p>
               <div className="proGress">
                  <div className="span">{uplode} %</div>
                  <span style={{width:`${uplode}%`}}></span>
                </div>
             </div>
              </div>
              
              }
        </div>
      })
      


    const scrol = useRef()

    // let conta = useContext(ChatContext)
    

    let setCon = useContext(NotiMessage)
    console.log('+==+',setCon);
     
        


     const key = window.location.href.replace('http://localhost:5173/dash/Message/','')
   
     useEffect(()=>{
         getChat()
      //  getUser()
     },[relode])

       useEffect(()=>{
        scrol.current?.scrollIntoView({behavior : "smooth"}) 
       },[messageUserCnx])
     async function getChat() {

        try {
            const res = await  axios.post(`http://localhost:5500/api/FindChatByIdChat`,{IdChat:key})
            console.log('rrr aaa = ' , res.data);
            setChat(res.data.chat)
            setTab(res.data.chat.members)
            console.log('hhh =>' , res.data.chat);
            
            // function : 
            getUser(res.data.chat.members)
            
         
        } catch (err) {
            console.log(err);
        }
       
     }

     let idCallTo = tab.filter((e)=>{
        return e != user._id
     }).join('')

     console.log('tttkkklkfld =>' ,idCallTo);


     useEffect(()=>{
          GetUser()
     },[getMesa])
     useEffect(()=>{
           getMessage()
     },[delet,getMesa])
     


     async function UpdatMes(e) {
      setImage([...image,...e.target.files])
      let ya = e.target.files
      let index = ''
 
          console.log('rrrrrrrrrporouyurtrtrtrssssssssssssssssssssss');
          let data = new FormData()
  
        data.append("ChatId",key)
        data.append("token",window.localStorage.getItem('token'))
        data.append("IdM",idMessage)
        for (let i = 0; i < ya.length; i++) {
          index = i
          data.append('images',ya[i])
           
        }
        try {
        const res = await axios.post('http://localhost:5500/api/UpdatMes', data ,
         {
           onUploadProgress:(progressEvent) => {
            //  const lod = progressEvent.loaded
            //  const total = progressEvent.total
            let p = Math.floor(( progressEvent.loaded * 100 ) / progressEvent.total)
            setUplode(p)
            // if(p % 20 == 0) {
            //     setUplode(p)
            //     // console.log('Ind' , index);
            //     // image.splice(index,1)
              
               
            // }
            //  setUplode(Math.floor(( progressEvent.loaded * 100 ) / progressEvent.total))
           },
        })
        console.log('Inde ' , index);
        console.log('ùùùùùùùùùù');
          console.log(res);
          setGetMesa(p=>!p)
         
         
          // image.splice(index,1)
          // if(n == 1 || n == 0) {
          //   setImage([])
          // }
         
          setGetIdMessage(false)
          setIdMessage("")

          setTimeout(() => {
             setImage([])
          }, 1500);


        } catch (err) {
          console.log(err);
        }
        

     }
     
     async function CreatMessage() {
      // if(getIdMessage && idMessage != ""){
      //    UpdatMes()
      //    return
      // }
        // if(message == "" && image.length == 0 && !www) {
        //      return
        // }
      

        let data = new FormData()
        data.append('message',message)
        data.append("ChatId",key)
  
        for (let i = 0; i < image.length; i++) {
          data.append('images[]',image[i])
        }
        console.log(image);
        console.log('rrr');
        try {
            const res = await axios.post('http://localhost:5500/api/creatMessage',data
            ,{headers:{token:window.localStorage.getItem('token')}})
            setMessage("")
            console.log('NnnNnNnnnNnNn + +++ = = +> ',res);
            setNewMessage(res.data.MessageCreat)
            console.log("Is Res Data MessCreat =>  iD => " , res.data.MessageCreat._id);
            console.log("Is Res Data MessCreat =>  iD => " , res.data);
            if(res.data.b){
               setIdMessage(res.data.MessageCreat._id)
               setGetIdMessage(true)
            }

            setImage([])
            setGetMesa(p=>!p)
            setEmoji(false)
            if(!res.data.b){
              Sokett(33,res.data.MessageCreat)
            }
            
             console.log(image);
             
             

        } catch (err) {
            console.log(err);   
        }
     }

   


      //   let AllImages = image.length>0 && image.map((e,i)=>{
      //        return  <div  key={i} style={{position:'relative'}}>
      //    <FontAwesomeIcon icon={faRectangleXmark}   style={{color:'red',position:"absolute",right:"0px",top:"0px"}} />
      //    <img src={URL.createObjectURL(e)} alt=""    style={{width:"100px",height:"100px",borderRadius:'8px'}}/>
      //  </div>
      //    })
  

    


     async function getUser(IdS) {

           try {
            const res = await  axios.post(`http://localhost:5500/api/FindUsersById`,{tab:IdS,token:window.localStorage.getItem('token')})
            // console.log('from Chat User =>>>=>>>',res.data);
            setUserChating(res.data.UserChating)
     
            setUserCnx(res.data.UserCnx)
        } catch (err) {
            console.log(err);
        }
        
     }

   

      async function GetUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
             setUser(res.data.user);
         
             

        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }

     async function getMessage() {
        try {
            const res = await axios.post('http://localhost:5500/api/getMessage',{idChat:key},
            {headers:{token:window.localStorage.getItem('token')}})
        
           
    
            setMessageUserCnx(res.data.AllMessage)
            setIdUserCnx(res.data.IdUserCnx)
            // setMessageUserChating(res.data.messageUserChating)
            // setGetMesa(p=>!p)
        } catch (err) {
            console.log(err);
        }


        
     }


       async function DeletMessages() {
          try {
             const res = await axios.post('http://localhost:5500/api/DeletAllMessages',{idChat:key})
        
             setDelet(p=>!p)
          } catch (err) {
            console.log((err));
          }
       }


     // socket : 

   //  const [socekt,setSocekt] = useState()
    
   //   useEffect(()=>{
   //      console.log("Before creating new socket");
   //       const newSocket = io('http://localhost:4000')
   //       setSocekt(newSocket)
         

   //       return ()=> {
   //          newSocket.disconnect()
   //       }
   //   },[userCnx])

   //    const [onlineUsers,setOnlineUsers] = useState([])
   //   useEffect(()=>{
   //      if(socekt == null) return
   //       socekt.emit("addNewUser",user._id)
   //       socekt.on('getOnlineUsers',(res)=>{
   //          setOnlineUsers(res)
   //       })
   //       return ()=>{
   //          socekt.off("getOnlineUsers")
   //       }
   //   },[socekt])

    

   //  const [onlineUsers,setOnlineUsers] = useState([])

    const sok =  useContext(SocketContext)
    const socekt = sok.socket
    console.log('Sok from Chat =>' , socekt);

    if(socekt.length > 0) {
      console.log('Jajjajajaja');
        setTrt(p=>!p)
    }
  
 
      
   // useEffect(()=>{
   //  const recipientId = tab.filter((e)=> e != user._id).join('')
   //   if(!socekt || socekt.length < 1) return
      
   //  socekt.emit('SendMessage',{
   //    senderId:user._id,
   //    reciverId:recipientId,
   //    text:newMessage
   //  })
   //   console.log(
   //      'message send Fro Soket '
   //     )
   // },[newMessage,socekt])
   
 
   // useEffect(()=>{
   //     if(!socekt || socekt.length < 1) return
   // socekt.on('getMessage',(data)=>{
   //    console.log('One =>', data.senderId);
   //       console.log('TWo =>', data.text);

   //       console.log(' Data =>' , data);
   //       setMessageSok({
   //           Sender : data.senderId,
   //           text : data.text.Message,
   //       })
   //   })
   // },[newMessage])




   // useEffect(()=>{
   //  console.log('*****TTTyyyyTTTT******');
   //  console.log('iiha => ',messageSok);
   //       messageSok && 
   //       tab?.members.includes(messageSok.Sender) &&
   //       setMessageUserCnx(p=>[...p,messageSok.text])
   // },[messageSok])

    
   
   

      // send Message : 

      useEffect(()=>{
        if(socekt == null || socekt.length  < 1) return
         

            let recipientId = tab.filter((e)=>{
            return e != user._id
        }).join('')    

         socekt.emit("sendMessage",{newMessage,recipientId,key})
         setRelode(p=>!p)
     },[newMessage])

     // get Message  
     useEffect(()=>{
 
         if(socekt == null || socekt.length  < 1 ) return
      
           socekt.on('getMessage',(res)=>{
            console.log('rse rse rse rse ====> ' , res);
            // if(key != res.key) return 
            console.log('Firts => ',messageUserCnx);
         //     if (!Array.isArray(messageUserCnx)) {
         //     console.error('userChating is not an array');
         //     return;
         //   }
         setMessageUserCnx((p)=>[...p, res]);
             console.log('Message cnx => ',messageUserCnx);
          
        })
        // Notification : 
         socekt.on("getNotifcation",(res)=>{
            console.log('res in notification is =>' , res.userR);
          const isOpen = tab.some( id => id == res.senderId)
            // const isOpenTwo = tab.some( id => id == res.userR)
          console.log(isOpen);
           if(isOpen   ){
             setNoti(p=> [{...res,isRead:true},...p])  
           }else{
              setNoti(p=> [res,...p])
              
           }

       

       
          
        })
  
      // conta.setNotification(noti)

        return ()=>{
        socekt.off('getMessage')
        socekt.off('getNotifcation')
        }
     },[socekt,tab])

      // setCon.setNotiMessage(noti)
     console.log("Noti => => => Noti =>" , noti);
     
   

  //  function gggg() {
   
  //     // callUser(idCallTo)
  //  }



      let Images =  image.length > 0 && image.map((e,i)=>{
            return <div key={i}>
                   <img src={`http://localhost:5500/${e}`} alt="" />
            </div>
       })

console.log(tab)
console.log(user._id);
  console.log('Manini=>' , chat._id);


          function Sokett(type,me) {
            if(socekt == null || socekt.length < 1) return
            let y = tab.filter((e)=> e != user._id).join('')
             console.log('Manini=>' , chat._id);
        socekt.emit('sendNoti',{

                  senderId:user._id,
                  reciverId:y,
                  First:user.FirstName,
                  Last:user.LasteName,
                  ImageSender:user.image,
                  num:user.numAccount,
                  mes:me,
                  idChat:chat._id,
                  type,
                  
              })
      }

      let [peerId,setPeerId] = useState('')
       const peerInst = useRef(null)
      //  const remoteVideoRef = useRef(null)
      //  const currentUserVideoRef = useRef(null)
         const currentUserVideoRef = useRef(null);
         const remoteVideoRef = useRef(null);
      
       let pe = useContext(Peerr)
        let peer = pe.peer


        useEffect(()=>{
          console.log('Run');

        peer.on('call', (call) => {
    console.log('Call is => ', call);
    let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      if(currentUserVideoRef.current) {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
      }
      call.answer(mediaStream);
      call.on('stream', function (remoteStream) {
        if(remoteVideoRef.current) {
             remoteVideoRef.current.srcObject = remoteStream;
             remoteVideoRef.current.play();
        }
     
      });
    });
  });


  
            console.log('MOha333');


          peerInst.current = peer
        }, [pe.atherPeer , pe.test,isNew.code,pe.peerSend])


        useEffect(()=>{
            if(pe.atherPeer != '') {
               call(pe.atherPeer)
            }
        },[pe.atherPeer,pe.bo])

        const call = (remotePeerId)=> {
         
          console.log('rerererererererere ' , remotePeerId);
            //  setCode(true)
            //  setTrt(p=>!p)
            let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia({video:true , audio:true} , (mediaStream)=> {

              if(currentUserVideoRef.current){
                currentUserVideoRef.current.srcObject = mediaStream
                 currentUserVideoRef.current.play()
              }

              // console.log("media => " , mediaStream);
              // console.log('From funCtion => ' , remotePeerId);
              // console.log("perTtzretzret => " ,peerInst.current.call());

              const call = peerInst.current.call(remotePeerId,mediaStream)

              console.log('Done 1 ' , call);
     
              
         call.on('stream', function (remoteStream) {
           console.log('Received remote stream during call:', remoteStream);
            if(remoteStream  && remoteVideoRef.current) { 
              console.log(remoteVideoRef);
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
  
        });

          

  
  
               console.log('Done 2');
            })

            // Sokett(999,"Call You")

            // {remotePeerId.length < 1 ?"":Sokett(999,"Call You")}
            console.log('fone');
        }




                    console.log('My Id Peer =>' , peerId);

      //  console.log('Emo =>' , valemoji);
      // const myVideo = useRef()
      let [na,setNa] = useState('')
      let [id,setId] = useState('')
 

    //  let isNew = useContext(New)
  // useEffect(()=>{
    
  //  if(pe.atherPeer.length > 0) {
  //   console.log("'''''''eeeeeeeeeeeedddddddddddddddd");
  //   console.log('PPPPPPPooooPPPPooo =>' , pe.atherPeer);

  //        setCode(true)  
  //       call(pe.atherPeer)
  //  }
  // },[pe.atherPeer])

  // function Time() {
  //    setInterval(() => {
  //         setSeconde(p=> parseInt(p)+1)
  //    }, 1000);
  // }

  // if(pe.atherPeer.length != 0 ) {
   
  //     // setCode(true) 
  //     // setAccpet(true) 
  //       call(pe.atherPeer)
  //         // setAccpet(true) 
  //         // Time()

     

  // }
  let intervalId
  function Time() {
   
      intervalId = setInterval(() => {
        if(document.querySelector('.Se').innerHTML== 60){
             document.querySelector('.Mu').innerHTML =  parseInt(document.querySelector('.Mu').innerHTML)+1
             document.querySelector('.Se').innerHTML = "00"
        }
          document.querySelector('.Se').innerHTML =  parseInt(document.querySelector('.Se').innerHTML)+1
     }, 1000); 


   

     return (<p><span className="Mu">{munit}</span>:<span className="Se">{seconde}</span></p>)
  }


  async function CreatCallNoti() {
    try {
        let res  =await axios.post('http://localhost:5500/api/CreatCallNoti',{idRec:idCallTo,idSen:user._id})
        console.log("Is Res => ",res);
    } catch (err) {
      console.log('validation err is =>' , err);
    }
  }

  async function CreatCallMessage() {
    try {
        let res  =await axios.post('http://localhost:5500/api/CreatCallMessage',{idChat:chat._id,idSen:user._id,mes:'Call'})
        console.log("Is Res => ",res);
    } catch (err) {
      console.log('validation err is =>' , err);
    }
  }

  function test() {
    console.log('hgdhcgdhfgdfdf');
     let t  = sok.onlineUsers.some((e)=>e.UserId == idCallTo)
     if(t) {
         isNew.setCode(p=>!p)
         Sokett(999,"Call You")
         return
     }
     isNew.setCode(p=>!p)
     CreatCallNoti()
     CreatCallMessage()
     
  }


      function SokettCall(type,Peer) {
         socekt.emit('sendNoti',{
                  senderId:user._id,
                  reciverId:idCallTo,
                  First:user.FirstName,
                  Last:user.LasteName,
                  ImageSender:user.image,
                  num:Peer,
                  idChat:chat._id,
                  type,
              })
              
      }

      let [mv,setMv] = useState('')

      let audoiAr = useRef([])
      let mediaReref = useRef([])

     async function StrVoice() {
        setVoice(p=>!p)
        const stre = await navigator.mediaDevices.getUserMedia({audio:true})

        const mediaRe = new MediaRecorder(stre) ; 

  
        mediaRe.ondataavailable = (e) => {
           console.log('e.data => ',e.data);
           if(e.data.size > 0) {
            console.log('1');
             audoiAr.current.push(e.data)
           }
        }

        mediaRe.onstop = () => { 
           console.log('2');
           const audioBlob = new Blob(audoiAr.current , {type:'audio/wav'})
           const audioUrl = URL.createObjectURL(audioBlob)
           console.log('Url => ',audioUrl);
           setRec(p=> [...p,audioUrl])
           CreatMessageVoice(audioUrl)
           
            
        }
        mediaReref.current = mediaRe
        mediaRe.start()
      }

      function canVoice() {
        CreatMessage()
          if(mediaReref.current && mediaReref.current.state === "recording"){
            console.log(rec);
             mediaReref.current.stop()
             setVoice(false)
            
             
          }
      }

   async   function CreatMessageVoice(m) {
        
                // if( m == "") return
         console.log('Meeeesssssggggg =>'  , m);

        let data = new FormData()
        data.append('message',m)
        data.append("ChatId",key)
        // for (let i = 0; i < image.length; i++) {
        //   data.append('images[]',image[i])
        // }
        // console.log(image);
        // console.log('rrr');
        try {
            const res = await axios.post('http://localhost:5500/api/creatMessage',data
            ,{headers:{token:window.localStorage.getItem('token')}})
            setMessage([])
            console.log('NnnNnNnnnNnNn + +++ = = +> ',res);
            setNewMessage(res.data.MessageCreat)
            setImage([])
            
            setGetMesa(p=>!p)
            setEmoji(false)
            Sokett(33,res.data.MessageCreat)
            
             console.log(image);
             
             

        } catch (err) {
            console.log(err);   
        }

      
        
      }


      function end() {
          if(mediaReref.current && mediaReref.current.state === "recording"){
            console.log(rec);
             mediaReref.current.stop()
             setVoice(false)
            
             
          }
      }


    // async  function de() {
    //      try {
    //       let res  = await axios.post('http://localhost:5500/api/de')
    //       console.log("Is Res => ",res);
    //   } catch (err) {
    //   console.log('validation err is =>' , err);
    // }
    //   }

    async function deletMes(ida) {
       try {
          const res = await axios.post('http://localhost:5500/api/deletMes',{idM:ida})
          console.log(res);
          setGetMesa(p=>!p)
          setDl(false)
       } catch (err) {
        console.log(err);
       }
    }


    return(
        <div className="pageMessage">
          {/* <button onClick={de}>ffff</button> */}
           {isNew.code  ?
             
                  // (stream && code && 
                    <div style={{textAlign:'center',height:'fit-content',borderRadius:'30px',background:'white',padding:'10px',display:'flex',flexDirection:'column'}}>
                     
                      { pe.atherPeer != '' &&  pe.peerId !=''   ?  <div style={{paddingTop:'20px',display:'flex',flexDirection:'column'}}>
                          <div className="vvvA" > <video ref={currentUserVideoRef} style={{position:'relative',margin:'0 auto',width:'500px',height:'200PX',marginTop:'10px'}}/></div>
                           <div className="V1"><img src={`http://localhost:5500/${user.image}`} alt=""  style={{width:'30px',height:'30px',borderRadius:'10px'}}/><h3 style={{alignSelf:'center'}}>{user.First} {user.LasteName}</h3>
                           </div> 
                        </div> :''
                    
                      }

                       
                         { pe.atherPeer != '' && pe.peerId!=''   ? 
                           <div style={{paddingTop:'20px',display:'flex',flexDirection:'column'}}> 
                              <video  ref={remoteVideoRef}  style={{position:'relative',margin:'50px auto',width:'300px',height:'200px' ,zIndex:'1000'}} />
                              <div className="V2"><img src={`http://localhost:5500/${userChating.image}`} alt=""  style={{width:'30px',height:'30px',borderRadius:'10px'}}/><h3 style={{alignSelf:'center'}}>{userChating.First} {userChating.LasteName}</h3></div>
                           </div>
                         :<img src={`http://localhost:5500/${userChating.image}`} style={{width:"200px",height:'200px',borderRadius:"50%",margin:'0 auto'}} />}

                     {/* // <div >
                  //  {accpet ?(!cami ? <div style={{width:'100%',height:'100%',position:'relative'}}> <video playsInline muted  ref={myVideo} autoPlay style={{width:'100%',height:'300px',borderRadius:'30px'}}  /> </div>: <img src={`http://localhost:5500/${user.image}`} style={{width:'200px',height:'200px',borderRadius:'50%'}}/>):''}
                  //   </div> */}

                    
                     {/* <div>
                         <img src={`http://localhost:5500/${userChating.image}`} alt="" style={{width:"200px",height:'200px',borderRadius:'50%'}} />
                       </div> */}

                       { pe.atherPeer != '' ?<p>{Time()}</p>: <div>
                           <div>Call in progress </div>
                          <section className="dots-container">
                          <div className="dot" />
                           <div className="dot" />
                             <div className="dot" />
                             <div className="dot" />
                            <div className="dot" />
                        </section>

                            
                        </div>} 

                      

{/* 
                         <div style={{display:'flex',justifyContent:'center',marginTop:'50px'}}>
                         {!cami ?<button onClick={()=>setCami(p=>!p)} className="cami" ><FontAwesomeIcon icon={faVideoSlash} /></button>:<button onClick={()=>setCami(p=>!p)} className="cami" ><FontAwesomeIcon icon={faVideo} /></button>}
                         <button className="EndCall" onClick={()=>{nav(`/Dash/Message/${chat._id}`)
                          isNew.setCode(p=>!p)
                           pe.setAtherPeer('')
                           isNew
                           setRelode(p=>!p) }}><FontAwesomeIcon icon={faPhoneSlash} /></button>
                         </div> */}
                          <button className="EndCall" onClick={()=>
                          {SokettCall(3000,'')
                          window.location.pathname = `/dash/Message/${chat._id}`
                          pe.setAtherPeer('')
                          clearInterval(intervalId);
                          isNew.setCode(false)
                          }}><FontAwesomeIcon icon={faPhoneSlash} /></button>

                          {/* <button onClick={()=>pe.setCa(p=>!p)}>va</button> */}
                          

                    </div>
                  //  )



                //  (accpet  && !callEnd && 
                //    <video playsInline ref={userVideo} autoPlay style={{width:'300px'}} />
                //  )

                //  {accpet && !callEnd ? <button onClick={leaveCall}>End Call</button>:<p onClick={()=>callUser(idCallTo)}>Call</p>}
             
           :
             
                <div>
                    <div className="idvChat">
                 <div className="headrzChat">

                      <div style={{position:'relative'}}>
                        <img src={`http://localhost:5500/${userChating.image}`} 
                        style={{width:'30px',height:'30PX',borderRadius:'50%',alignSelf:'center'}} alt="" />
                          {sok.onlineUsers.length > 0 && sok.onlineUsers.map((e,i)=>{
                         return userChating._id == e.UserId?<div key={i} className="BoxGreen"></div>:""
                          })}
                      </div>

                      <div className="Bold">{userChating.FirstName} {userChating.LasteName}</div>
                 </div>

                  <div style={{width:'50%',textAlign:'right',alignSelf:'center',padding:'15px'}}>
                         <FontAwesomeIcon icon={faEraser} onClick={()=>setDelet(p=>!p)} />
                         {
                            delet?
                            <div className="delett" onClick={DeletMessages}>
                                <p>Delet All Message </p>
                               <FontAwesomeIcon icon={faDeleteLeft} />
                             </div>
                            :""
                         }
                  </div>
                  
             </div>

              

               



             <div className="mainOfMessage" style={{position:"relative"}}>
             

                 {/* {stream && code && <video playsInline muted  ref={myVideo} autoPlay style={{width:'410Px',borderRadius:'30px'}} />}

                 {accpet  && !callEnd && 
                   <video playsInline ref={userVideo} autoPlay style={{width:'300px'}} />
                 }

                 {accpet && !callEnd ? <button onClick={leaveCall}>End Call</button>:<p onClick={()=>callUser(idCallTo)}>Call</p>} */}

                 {/* {
                  receivingCall && !accpet  ?
                    <div>
                        <h1>{na} is CaLL ... </h1>
                         <button onClick={answerCall}>Answer here</button>
                    </div>
                  :""
                 } */}


                 <div style={{width:"100%",height:'fit-content',display:'flex',flexDirection:'column'}}>
                    {messageUserCnx.length > 0  && messageUserCnx.map((e,i)=>{
                    return idUserCnx == e.Sender?
                     <div style={{display:'flex',justifyContent:'end'}} key={i} ref={scrol}>
                        <div key={i}  style={{display:'flex',gap:'7px',marginBottom:'10px'}}>
                             <div>
                               
                                <div style={{display:'flex',gap:'16px'}}>
                                   {dl &&  <div className="delMes" onClick={()=>deletMes(e._id)}><FontAwesomeIcon   icon={faTrash} /></div>}
                                   {e.Message != "" && e.Message != "Call" && !e.Message.includes('http') && <p onClick={()=>setDl(p=>!p)} className="Mees" >{e.Message}</p>}
                                    
                                </div>
                                {e.Message != "" && e.Message == "Call" && <div className="fouzo"><FontAwesomeIcon style={{color:'white'}} icon={faPhoneSlash} /> Connection attempt {userChating.LasteName}</div>}
                                {/* {e.Message != "" && e.Message.includes('http') && <div className="f"><audio src={e.Message} controls   type="audio/mpeg"></audio></div>} */}
                                <div style={{marginBottom:'15px',textAlign:'end'}}>
                                   {e.ImageMessge.length>0 && e.ImageMessge.map((el,index)=>{
                                  return <img key={index} src={`http://localhost:5500/${el}`} style={{width:"200px",height:'200px',marginRight:'5px',borderRadius:'8px'}} />
                                 })}
                                </div>

                                <div style={{marginBottom:'15px'}}>
                                    {Array.isArray(e.VideoMessage) && e.VideoMessage.map((ele,indexx)=>{
                                  return <video controls key={indexx} src={`http://localhost:5500/${ele}`} style={{width:"100%",height:'200px',marginRight:'5px',borderRadius:'8px'}} />
                                })}
                                </div>

                             </div>

                             <div>
                                   { e.Message == "" && (e.VideoMessage.length>0   || e.ImageMessge.length > 0)  &&  <img src={`http://localhost:5500/${userCnx.image}`} style={{borderRadius:'50%',width:'30px',height:"30px"}} alt="" />}
                                   { e.Message != ""  &&  <img src={`http://localhost:5500/${userCnx.image}`} style={{borderRadius:'50%',width:'30px',height:"30px"}} alt="" />}
                                  {/* {e.Message != '' && <img src={`http://localhost:5500/${userCnx.image}`} style={{width:'30px',height:"30px",borderRadius:'50%'}} alt="" />} */}
                             </div>

                        </div>
                          
                     </div>
                    :
                      <div key={i} style={{display:'flex',gap:'15px'}} >
                          { e.Message == "" && (e.VideoMessage.length>0   || e.ImageMessge.length > 0)  &&  <img src={`http://localhost:5500/${userChating.image}`} style={{borderRadius:'50%',width:'30px',height:"30px"}} alt="" />}
                           { e.Message != ""  &&  <img src={`http://localhost:5500/${userChating.image}`} style={{borderRadius:'50%',width:'30px',height:"30px"}} alt="" />}
                          <div style={{display:'flex',flexDirection:'column'}}>
                            {e.Message != "" && e.Message != "Call" && !e.Message.includes('http')  && <p className="MeesConter" >{e.Message}</p>}
                             {e.Message != "" && e.Message == "Call" && <div className="fouzoo"> <FontAwesomeIcon style={{color:'red',marginRight:"10px"}} icon={faPhoneVolume} />Incoming call from {userChating.LasteName}</div>}
                              {/* {e.Message != "" && e.Message.toString().includes('http') && <div className="f"> <audio src={e.Message} controls   type="audio/mpeg"></audio> </div>} */}
                          <div style={{marginBottom:'15px'}}>
                                   {Array.isArray(e.ImageMessge) && e.ImageMessge.map((el,index)=>{
                                  return <img key={index} src={`http://localhost:5500/${el}`} style={{width:"200px",height:'200px',marginRight:'5px',borderRadius:'8px'}} />
                                 })}
                                </div> 

                                  <div style={{marginBottom:'15px'}}>
                                    { Array.isArray(e.VideoMessage) && e.VideoMessage.length>0 && e.VideoMessage.map((ele,indexx)=>{
                                  return <video controls key={indexx} src={`http://localhost:5500/${ele}`} style={{width:"100%",height:'200px',marginRight:'5px',borderRadius:'8px'}} />
                                })}
                                </div>
                          </div>
                          
                    </div>
                     

                 })
                
                 
                }
              
                
                 </div>
                 


              
             </div>
             




             <div >
                 {!voice &&
                        <div className="inputSendMessage">
                  {emoji && <div className="emo"><EmojiPicker onEmojiClick={(e)=>
                    {
                    // setValemoji(e.emoji) 
                    // setEmoji(p=>!p)
                    setMessage(p=>[...p,e.emoji].join(''))
                    // setMessageAndemo(p=> [...p,message,valemoji])
                  }} /></div>
                    } 

                <div style={{width:'50%'}}>
                  
                    <input type="text" placeholder="Wirte Message" value={message} 
                    onChange={(e)=>setMessage(e.target.value)} />
                </div>

                <div className="IconCreatMessage" onClick={()=>setEmoji(p=>!p)}>
                   <FontAwesomeIcon icon={faFaceSmile} />
                </div>

                <div className="IconCreatMessage" onClick={CreatMessage} >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>

                <div className="UplodeIMessges">
                         <FontAwesomeIcon icon={faFileCirclePlus}  style={{zIndex:'2',position:'absolute',left:'25%',top:"25%"}}/>
                       <input type="file"  multiple name="images" onChange={UpdatMes} onClick={()=>{
                         setWww(true)
                         CreatMessage()
                       }}  />
                       
                </div>

                <div className="Call" onClick={()=>{
                  //  call(pe.atherPeer)
                  console.log('yahoo');
                   test()
                  //  call(pe.atherPeer)
                  //  isNew.setCode(p=>!p)
                  //  setCode(p=>!p)
                  //  Sokett(999,"Call You")
                }}>
                    <FontAwesomeIcon icon={faVideo} />
                </div>


                {/* <div className="Call"  onClick={StrVoice}>
                   <FontAwesomeIcon icon={faMicrophone} />
                </div> */}

            </div>
                 }

                 {/* {voice &&
                    <div className="inputSendMessage">
                       <div className="IconCreatMessage"><FontAwesomeIcon icon={faTrash} /></div>
                       <div><p>Voice Engister</p></div>
                       <div onClick={end} className="IconCreatMessage"><FontAwesomeIcon icon={faPaperPlane} /></div>
                    </div>
                 } */}
                  </div>
                </div>
           }

        <div>
          {/* <button onClick={()=>}>Done</button> */}
             {ShoProgressImage}
        </div>


        </div>
    )
}