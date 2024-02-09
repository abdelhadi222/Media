import { faBell, faEnvelope, faSun,faMagnifyingGlass,faBellSlash,faBars,faUserGroup,faPhoneVolume , faPhoneSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Homme from  "../Images/Homme.jpg"
import { useContext } from 'react';
import { SocketContext } from "../Context/Socekt";
import {Save} from "../Context/Save"
import "../Compents/T&S.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { Peerr } from "../Context/Peer";
import { Windo } from "../Context/Windo";
import Lod2 from "../page/Lod2/Lod2";
 import {Meun} from "../Context/Meun"
import { Link, useNavigate } from "react-router-dom";
import { NotiMessage } from "../Context/NotiMessage";
import {New} from "../Context/New"

// import { AllUsers } from "../../../back/Controllers/controllers";
// import {ChatContext} from "../Context/Socekt";
//  import io from "socket.io-client";
export default function TopBar() {
      const [user,setUser] = useState('')
      const [vide,setVide] = useState(true)
      const [serch,setSerch] = useState('')
      const [no,setNo] = useState(false)
      const [allNoti,setAllnoti] = useState([])
      const [userSender,setUserSender] = useState([])
      const [numb,setNumb] = useState(0)
      const [openNotiLike,setOpenNotiLike] = useState(false)
      const [noti,setNoti] = useState([])
      const[inp,setInp] = useState('')
      const [relode,setRelode] = useState(false)
      const [invi,setInvi] = useState(false)
      const [hh,setHh] = useState(false)
      const [thiss,setThiss] = useState(false)
      const [kaka,setKaka] = useState(true)
      let newww = useContext(Meun)
      const nav = useNavigate();
        

           let pe = useContext(Peerr)
           console.log('pe=> ' , pe );
           let peer = pe.peer
   

           let ccc = useContext(Save)
           let size = useContext(Windo)
           let notiMessage = useContext(NotiMessage)


    
    //  useEffect(()=>{
    //      if(window.localStorage.getItem("Theme") == "black"){ 
    //       let Posts = document.querySelectorAll('.Post')
    //        Posts.forEach(function(element) {
    //           element.style.backgroundColor = '#7e7e7e';
    //           element.style.color = 'white';
    //         });
    //      }
    //  },[])

    


    
    const [openMessage,setOpenMessage] = useState(false)
        
         
    const [afchi,setAfchi] = useState(false)
    // let r = conta.sss
       useEffect(()=>{
         GetUser()

   },[no, ccc.tt])




   // Sockte => 
    const CSocket = useContext(SocketContext)
   let Soket = CSocket.socket




   useEffect(()=>{

    if(Soket == null || Soket.length < 1 ) return 
    
       Soket.on('getNoti',(data)=>{
        console.log('Data => => Data => =>  ' , data);
         setNoti((p)=>[...p,data])
         setNumb(p=> p + data.length)
       })
   },[Soket])

   let notii = noti.filter((e)=>{ 
    return e.type != 1000 && e.type != 3000
  })


    


   let getCall = noti.filter ((e)=>{ 
     return  e.type == 999
  })
  console.log('get Call =>' , getCall.length > 0 && getCall);
       let conta = useContext(Save)

      
       

  let acceptPeer= noti.filter ((e)=>{
    return e.type == 1000  
  })

  let isNew = useContext(New)

  console.log('Accpet Peer => ' , acceptPeer.length > 0 && acceptPeer);
  acceptPeer.length > 0 && pe.setAtherPeer(acceptPeer[0].num)
//   console.log('loflfoflfofloflfo =<' , acceptPeer.length > 0 && acceptPeer);
//   acceptPeer.length > 0 && pe.setTest(p=>!p)
// if(acceptPeer[0] && thiss) {
//      isNew.setYes(p=>!p)
// }
   

let refu = noti.filter((e)=>{
     return e.type == 1001
})
let inva = noti.filter((e)=>{
     return e.type == 4
})



let getNotiCanelAppel = noti.filter((e)=>{ 

    return e.type == 3000
})
       


  console.log(' getNotiCanelAppel => ' , getNotiCanelAppel.length > 0 && getNotiCanelAppel);


   async function getNoti(ida) {
      try {
          const res =await axios.post('http://localhost:5500/api/getNoti',{mab:ida})
       
          setAllnoti(res.data.allNoti)

        //   console.log("gzdyzteyzter=>" , res.data);
          setUserSender(res.data.arryOfUsersSender)
          setRelode(p=>!p)
      } catch (err) {
          console.log(err);
      }
   }


    //   const conta2  = useContext(ChatContext)
    //   const notificationFrom = conta2.notification
    //   console.log(" HI ZIAD => " , conta2.notification);





       async function GetUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
             setUser(res.data.user);
             getNoti(res.data.user._id)
             setAfchi(true)

        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }
    
   
     async function deltenoti(idNoti) {
        try {
            const res = await axios.get(`http://localhost:5500/api/deletNoti/${idNoti}`)
    
            setNo(p=>!p)
        } catch (err) {
           console.log(err); 
        }
        
     }
     function Theme() {
       if( window.localStorage.getItem('Theme') == "black") {

           window.localStorage.setItem('Theme',"white")
       }
        if( window.localStorage.getItem('Theme') == "white") {
     
           window.localStorage.setItem('Theme',"black")
         }

          document.querySelector('body').style = `background-color:${window.localStorage.getItem("Theme")};`
          document.querySelector('header').style = " background-color: rgb(130, 130, 130); "
          document.querySelector('.Side').style = "background-color: rgb(130, 130, 130); "

           let Posts = document.querySelectorAll('.Post')
           Posts.forEach(function(element) {
              element.style.backgroundColor = '#7e7e7e';
              element.style.color = 'white';
            });

        //     let Pro = document.querySelectorAll('.BoxPro')
        //     Pro.forEach(function(element) {
        //       element.style.backgroundColor = '#7e7e7e';
        //       element.style.color = 'white';
        //     });

        //     let Save = document.querySelectorAll('.ImageFromSave')
        //     Save.forEach(function(element) {
        //       element.style.backgroundColor = '#7e7e7e';
        //       element.style.color = 'white';
        //     });
        //     let mes = document.querySelectorAll('.MessageFromSave')
        //     mes.forEach(function(element) {
        //       element.style.backgroundColor = '#7e7e7e';
        //       element.style.color = 'white';
        //     });
            
        //     document.querySelectorAll('.MessageFromSave')

            

        //  console.log('sz => ',document.querySelectorAll('.Post'));

 }
     

   
   function ShowNoti( reciverId,First,type,ImageSender,num,senderId,imagepost) {

   
     let action ; 
     console.log('taype => ', type);
    if(type == 1){
        action = "Liked"
    }else if(type ==2){
        action = "Comment"
    }
    else if(type == 11){
        action = "DesLike"
    }
    // else if(type == 4) {
    //      return(
    //          <div className="nnb" style={{width:"100%",marginBottom:'20px'}}>
    //                <Link to={`Home/ShowProfile/${num}`} style={{color:'black',textDecoration:'none',display:'flex',gap:'10px'}}>
    //                  <img src={`http://localhost:5500/${ImageSender}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" />
    //                   <div style={{display:'flex',gap:'5px',alignSelf:'center'}}><h5  >{First}</h5>  <p >Send Invitation</p></div>
    //                 </Link>

    //                  <div style={{display:'flex',gap:'5px',justifyContent:'center',marginTop:'-5px'}}>
    //                     <button className="BuInvi acpte" onClick={()=>Accpet(senderId)}>Yes</button>
    //                     <button className="BuInvi refu" onClick={()=>Refuse(senderId)}   >No</button>
    //                 </div>
    //         </div>
    //      )
    // }
    else if(type == 302) {
        return (
            <Link to={`${num}`} className="NotiNew">
           <div style={{display:'flex',gap:'10px'}}>
               <img src={`http://localhost:5500/${ImageSender}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" />
              <p style={{alignSelf:'center'}}>{`${First} Accpet Your Invi`}</p>
           </div>
           <div>
            {/* <img src={`http://localhost:5500/${imagepost}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" /> */}
           </div>
          
        </Link>
        )
    }
    else if(type == 301) {
        return (
            <Link to={`${num}`} className="NotiNew">
           <div style={{display:'flex',gap:'10px'}}>
               <img src={`http://localhost:5500/${ImageSender}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" />
              <p style={{alignSelf:'center'}}>{`${First} Refuse Your Invi`}</p>
           </div>
           <div>
            {/* <img src={`http://localhost:5500/${imagepost}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" /> */}
           </div>
          
        </Link>
        )
    }
    else if(type == 4) {
        return (
        <Link to={`${num}`} className="NotiNew">
           <div style={{display:'flex',gap:'10px'}}>
               <img src={`http://localhost:5500/${ImageSender}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" />
              <p style={{alignSelf:'center'}}>{`${First}  His Send Invitaion`}</p>
           </div>
           <div>
            {/* <img src={`http://localhost:5500/${imagepost}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" /> */}
           </div>
          
        </Link>
        )
    }
    else if(type == 33) {
         return(
             <div className="nnb" style={{width:"100%",marginBottom:'20px'}}>
                   <div  style={{color:'black',textDecoration:'none',display:'flex',gap:'10px'}}>
                     <img src={`http://localhost:5500/${ImageSender}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" />
                      <div style={{display:'flex',gap:'5px',alignSelf:'center'}}><h5  >{First}</h5>  <p >Send Message</p></div>
                    </div>

            </div>
         )
    }
    else if(type == 111){
        action='Desave'
    }
     else if(type == 110){
        action = "Save"
    }
    else if (type == 999){
       return(
           <Link to={`${num}`} className="NotiNew">
           <div style={{display:'flex',gap:'10px'}}>
               <img src={`http://localhost:5500/${ImageSender}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" />
              <p style={{alignSelf:'center'}}>{`${First} is Call You `}</p>
           </div>
           <div>
            {/* <img src={`http://localhost:5500/${imagepost}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" /> */}
           </div>
          
        </Link>
      )
    }
    else if (type == 1001){
      return (
           <Link to={`${num}`} className="NotiNew">
           <div style={{display:'flex',gap:'10px'}}>
               <img src={`http://localhost:5500/${ImageSender}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" />
              <p style={{alignSelf:'center'}}>{`${First} refuse Your Call`}</p>
           </div>
           <div>
            {/* <img src={`http://localhost:5500/${imagepost}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" /> */}
           </div>
          
        </Link>
      )
    }
     else if (type == 1000) return
     else if (type == 3000) return
    return(
        <Link to={`${num}`} className="NotiNew">
           <div style={{display:'flex',gap:'10px'}}>
               <img src={`http://localhost:5500/${ImageSender}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" />
              <p style={{alignSelf:'center'}}>{`${First} ${action} Your Post`}</p>
           </div>
           <div>
            {/* <img src={`http://localhost:5500/${imagepost}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" /> */}
           </div>
          
        </Link>
    )
   }




   let notiMessag = noti.filter((e)=>{
        return e.type == 33 
   })

   let notiInviInsocket = noti.filter((e)=>{
     return e.type == 4 
   })

     let bbb = noti.filter((e)=>{
     return e.type == 301
   })

 






   const [allInvi,setAllInvi] = useState([])
   let [accpet,setAccpet]  = useState(false)
     useEffect(()=>{
        getInvi()
     },[accpet,relode])

     async function getInvi() {
        try {
            const res = await axios.post('http://localhost:5500/api/getUserNotiAddamie'
            ,{token:window.localStorage.getItem('token')})

            console.log("''''''''" , res.data.AllInviByUser);
            setAllInvi(res.data.AllInviByUser)
            //   setNumb(p=>p+res.data.AllInviByUser.length)
            //  conta.setSss(p=>!p)
            newww.setIsopen(p=>!p)
        } catch (err) {
            console.log(err);
        }
        
     }




        const [nnn,setNnn] = useState([])
        const [userNoti,setUserNoti] = useState([])

     useEffect(()=>{
        getNotiByUser()
     },[accpet,relode])

     async function getNotiByUser() {
        try {
            const res = await axios.post('http://localhost:5500/api/getNotiByUser'
            ,{token:window.localStorage.getItem('token')})

            setNnn(res.data.AllNotiByUser)
//   setNumb(p=>p+res.data.AllNotiByUser.length)
            setUserNoti(res.data.allInformation)
          
            newww.setIsopen(p=>!p)
            // conta.setSss(p=>!p)
        } catch (err) {
            console.log(err);
        }
        
     }
     console.log('hh => ',userNoti && userNoti.length);

        // const [night,setNight] = useState(false)
        // console.log(document.querySelector('header'));
        // night ?document.querySelector('body').style = "background-color: rgb(42, 42, 42);"  :document.querySelector('body').style = "background-color: rgb(255, 255, 255);" 
        // night ?document.querySelector('header').style = "background-color: rgb(42, 42, 42);"  :document.querySelector('header').style = "background-color: rgb(255, 255, 255);"
        //  night ?document.querySelector('.Side').style = "background-color: rgb(42, 42, 42);"  :document.querySelector('.Side').style = "background-color: rgb(255, 255, 255);"
        
        // useEffect(()=>{
        //     const socket = io('http://localhost:4000')
        //     // console.log('soket from top =>',socket);

        // },[])

         async function  Refuse(idU,index) {
     
            try {
                const res = await axios.post('http://localhost:5500/api/Refuse',{
                     idSende:idU,
                     userCnx:user._id
                })
      
                   
                      if(res.data == "Iniv Is Annule") { 
                        alert(`His Annule`) 
                           noti.splice(index,1)
                           setAccpet(p=>!p)
                           setRelode(p=>!p)
                        return  
                    }
                 
                Sokett(301,idU)
                //   let ne = noti.filter((e)=>{
                //           return e.senderId != idU
                //  })
                //  setNoti(ne)
                 noti.splice(index,1)
                setAccpet(p=>!p)
                setRelode(p=>!p)
            } catch (err) {
                console.log(err);
            }
            
         }


        async function Accpet(idCon,index) {
            
             try {
                 const res = await axios.post('http://localhost:5500/api/Accpet',{
                    userCnx:user._id,
                    IdUserConfirmation:idCon
                 })
                 if(res.data == "Iniv Is Annule") { 
                  alert(`His Annule`)  
                       setAccpet(p=>!p)
                 setRelode(p=>!p)
                 noti.splice(index,1)
                 return
                }
                 
                 console.log(res);
                  Sokett(302,idCon)
                 setAccpet(p=>!p)
                 setRelode(p=>!p)
                 noti.splice(index,1)
             } catch (err) {
                console.log(err);
             }
        }

     
        // let All = noti.length?noti.length:0  + allInvi.length?allInvi.length:0


     useEffect(()=>{
         GetAllUsers()
     },[relode])
       const[allUsers,setAllUsers] = useState([])

       async function GetAllUsers() {
          try {
            const res = await axios.get('http://localhost:5500/api/AllUsers')
             setAllUsers(res.data.Users);
        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }



    //  function search(data) {
    //     console.log(data)
    //    let d= data.filter((e)=>e.FirstName.toLowerCase().includes(inp)) 
    //    console.log('DDD =>' , d);
    //    return d 
    //  }

    // console.log("=> hhh => ",allUsers.filter((e)=>e.FirstName.toLowerCase().includes('ab')));

    async function DeletAllNoti() {
        try {
            const res = await axios.post('http://localhost:5500/api/DeletAllNoti',{idR:user._id})
            console.log(res);
            setRelode(p=>!p)
            setNoti([])
            setNumb(0)
        } catch (err) {
            console.log(err);
        }
     }

     function ty() {
      
        // ccc.setSss(p=>!p)
        newww.setIsopen(p=>!p)
        setInp('')
        // setAllUsers([])
     }
     console.log("8899=>",notiMessag);



   
      async function MessNoti() {
        setOpenMessage(p=>!p)
        setInvi(false)
         setOpenNotiLike(false)


        if(openMessage ) {
            try {
            const res = await axios.post('http://localhost:5500/api/delatNotiMessage',{token:window.localStorage.getItem('token')})
            console.log('dddd=>',res);
            setRelode(p=>!p)
            ccc.setTt(p=>!p)
            
            
        } catch (err) {
            console.log(err);
        }
        }
      }

      function  cah() {
        setInvi(p=>!p)
        setOpenMessage(false)
        setOpenNotiLike(false)
      }
       const contaz = useContext(Save);

      function ch2() {
         setOpenNotiLike(p=>!p)
         setInvi(false)
         setOpenMessage(false)
          if(bbb.length > 0) {
            console.log('Pour Voir =>' , bbb);
            console.log('Pour Voir2 =>' , ccc);
            ccc.setIh(p=>!p)
          //  for (let t = 0; t < noti.length; t++) {
          //     if(noti[t].type == 301){
          //       console.log('rrrrr');
          //        contaz.setSss(p=>!p)
          //        setRelode(p=>!p)
          //       return
          //     }

          //     if(noti[t].type == 302){
          //       console.log('rrrrr');
          //        contaz.setSss(p=>!p)
          //          setRelode(p=>!p)
          //       return
          //     }
            
            
          //  }
        }
      }
      function Sokett(type,U) {
        
         Soket.emit('sendNoti',{
                  senderId:user._id,
                  reciverId:U,
                  First:user.FirstName,
                  Last:user.LasteName,
                  ImageSender:user.image,
                  num:user.numAccount,
                  type,
              })
      }


        function SokettCall(type,idR,Peer,idChat) {
          
         console.log('Peer From Function Sokte' , Peer);
         Soket.emit('sendNoti',{
                  senderId:user._id,
                  reciverId:idR,
                  First:user.FirstName,
                  Last:user.LasteName,
                  ImageSender:user.image,
                  num:Peer,
                  idChat:idChat,
                  type,
              })
              if(Peer == 0 || Peer == '') {
                return setKaka(false)
              }
              isNew.setCode(true)
              setKaka(false)
              pe.setPeerSend(true) 
              pe.setAtherPeer(Peer)
            
              nav(`/Dash/Message/${idChat}`)
             
              
      }


      function freme(e) {
        window.location.pathname = `/dash/Message/${e}`
    
      }


      function Call(name,image,type,idR,idChat) {
          if(type == 999) {

              return(
                 <div className="CallFun">
                   
                      <div>
                         <img src={`http://localhost:5500/${image}`} style={{width:'50Px',height:'50px',borderRadius:'50%'}} alt="" />
                      </div>

                      <div>
                        <p>{name} is Call You </p>
                      </div>

                      <div>
                        <button className="grren" onClick={()=>SokettCall(1000,idR,pe.peerId,idChat)}><FontAwesomeIcon icon={faPhoneVolume} /></button>
                        <button className="Re"  onClick={()=> 
                            {window.location.reload()
                            SokettCall(1001,idR,'',idChat)}}><FontAwesomeIcon icon={faPhoneSlash} /></button>
                      </div>

                 </div>

              )
          }
      }
      function none() {
        console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');
        window.location.pathname = `/Dash/Message/${getNotiCanelAppel[0].idChat}`
        
        //  setVide(false)
      }

   


    return(
        <div className="top" style={{position:'relative'}}>
           
             <header style={{width:size.size>1000?"83%":"96%", left:size.size>1000 ?"17%":"40px"}}>
            
           
                 <div style={{width:'70%'}} className="ser">
                     <input type="search"  placeholder="Search" className="i" 
                     onChange={(e)=>setInp(e.target.value)}/>
                     {/* <button className="bnb">Search</button> */}
                     <div className="Icon">
                           <FontAwesomeIcon icon={faMagnifyingGlass} className="Icon" />
                     </div>

                    { inp.length > 0 ?
                        <div className="whh" >
                         {allUsers.length > 0 && inp.length > 0 ? allUsers.filter((e)=>e.FirstName.toLowerCase().includes(inp.toLowerCase()) || e.LasteName.toLowerCase().includes(inp.toLowerCase()) ).map((el,index)=>{
                            return <Link to={`/Dash/Home/ShowProfile/${el.numAccount}`} onClick={ty} key={index}  className="serchTop">
                                <div style={{display:'flex',gap:"10px"}}>
                                     <img src={`http://localhost:5500/${el.image}`} style={{width:"30Px",height:"30px",borderRadius:'50%'}}/>
                                    <p style={{alignSelf:'center'}}>{el.FirstName} {el.LasteName}</p>
                                   
                                </div>
                            </Link>
                            

                            
                         }):""}
                   </div>
                   :''
                    }
        
                           {kaka && (!getNotiCanelAppel || getNotiCanelAppel.length < 1) &&
                            <div className="ko">
                                  {Array.isArray(getCall) && getCall.length > 0 && getCall.map((e)=>{
                                      return Call(e.First,e.ImageSender,e.type,e.senderId,e.idChat)
                                  })}
                           </div>
                           }

                           {refu && refu.length > 0 && 
                             refu.map((e,i)=>{
                                 return <div className="lk13" key={i}>
                                       <p>{e.First} is Rfuse Your call</p>
                                   <button onClick={()=>freme(e.idChat)} className="BNBN">Ok</button>
                             </div>
                             })
                           }
                            {
                               getNotiCanelAppel && getNotiCanelAppel.length > 0  ?isNew.setCode(false)  :""

                            }

                           {
                            getNotiCanelAppel && getNotiCanelAppel.length > 0 && vide  &&
                             (pe.AtherPeer == "" ?console.log('MMMMMMOOOOOHHHHHAAA'):<div className="Ennf"><p>Apple is Canel by {getNotiCanelAppel[0].First} </p> <button onClick={()=>window.location.pathname = `/dash/Message/${getNotiCanelAppel[0].idChat}` }>Ok</button> </div>)
                           }
                     
                 </div>


                <div style={{display:'flex',justifyContent:"space-between", width:'30%',paddingTop:'7px'}} >
                       <div style={{display:'flex',gap:'30px',position:'relative'}} >

                        <div onClick={cah}>
                            <FontAwesomeIcon icon={faUserGroup} />
                            {  allInvi.length > 0 && notiInviInsocket.length > 0   &&<div className=" redd ">{notiInviInsocket.length + allInvi.length}</div> }
                             {  allInvi.length > 0 && notiInviInsocket.length  == 0   &&<div className=" redd ">{ allInvi.length}</div> }
                              {  allInvi.length == 0 && notiInviInsocket.length > 0   &&<div className=" redd ">{notiInviInsocket.length }</div> }
                            {/* { (Array.isArray(allInvi) && allInvi.length > 0) ||  (Array.isArray(notiInviInsocket) && notiInviInsocket.length>0)   &&<div className=" redd ">{notiInviInsocket.length + allInvi.length}</div> } */}
                            
                            {invi && <div className="hg">
                                           { allInvi && allInvi.length > 0  ? allInvi.map((e,i)=>{
                                 return <div key={i} className="Bgh" >
                                        <Link className="lklo" to={`Home/ShowProfile/${e.numAccount}`} style={{color:'black',textDecoration:'none',display:'flex',gap:'10px'}}>
                                              <img src={`http://localhost:5500/${e.image}`} style={{width:'30px',height:'30px',borderRadius:'10px'}} alt="" />
                                              <div className="lklo" style={{display:'flex',gap:'5px',alignSelf:'center'}}><h5  >{e.FirstName} {e.LasteName}</h5>  <p >Send Invitation</p></div>
                                        </Link>

                                       <div style={{display:'flex',gap:'5px',justifyContent:'center',marginTop:'5px'}}>
                                          <button className="BuInvi acpte" onClick={()=>Accpet(e._id,i)}>Yes</button>
                                          <button className="BuInvi refu" onClick={()=>Refuse(e._id,i)}   >No</button>
                                       </div>
                                     </div>
                            }):''}

                             {notiInviInsocket.length > 0 && notiInviInsocket.map((e,ind)=>{ 
                                return     <div key={ind} className="nnb" style={{width:"100%",marginBottom:'20px'}}>
                   <Link to={`Home/ShowProfile/${e.num}`} style={{color:'black',textDecoration:'none',display:'flex',gap:'10px'}}>
                     <img src={`http://localhost:5500/${e.ImageSender}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" />
                      <div style={{display:'flex',gap:'5px',alignSelf:'center'}}><h5  >{e.First}</h5>  <p >Send Invitation</p></div>
                    </Link>

                     <div style={{display:'flex',gap:'5px',justifyContent:'center',marginTop:'10px'}}>
                        <button className="BuInvi acpte" onClick={()=>Accpet(e.senderId)}>Yes</button>
                        <button className="BuInvi refu" onClick={()=>Refuse(e.senderId)}   >No</button>
                    </div>
            </div>
                             }) }
                         
                              

                            {allInvi.length < 1 && notiInviInsocket.length < 1 && <div style={{zIndex:'230',color:'black',position:'absolute',display:'flex',justifyContent:'center',alignItems:'center'}}> <div><FontAwesomeIcon icon={faBellSlash} />You Didin't Have Invitation  </div> </div>}

                            </div>}
                        </div>


                        
                        

                        <div onClick={MessNoti} >
                             <div className="Email">
                                <FontAwesomeIcon icon={faEnvelope} style={{cursor:"pointer"}} />
                                {allNoti.length > 0 || notiMessag.length > 0 ? <div className=" redd ">{allNoti.length + notiMessag.length}</div>:''}
                            </div>
                             {openMessage?<div className="Notification">
                                   
                                   {notiMessag.map((e,i)=>{
                                      return <div key={i} className="nnb" style={{width:"100%",marginBottom:'20px'}}>
                   <div  style={{color:'black',textDecoration:'none',display:'flex',gap:'10px'}}>
                   < Link to={`Home/ShowProfile/${e.num}`} style={{textDecoration:'none'}}>
                       <img src={`http://localhost:5500/${e.ImageSender}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" />
                   </Link>
                      <div style={{display:'flex',gap:'5px',flexDirection:'column'}}>
                            <h5  >{e.First} Send Message : </h5>  

                         {/* <div style={{color:'gray',fontSize:'12px',fontWeight:'bold'}}>" {e.mes.Message} "</div> */}
                         {e.mes.Message != '' && <div style={{color:'gray',fontSize:'12px',fontWeight:'bold'}}>" {e.mes.Message} "</div> }
                         {e.mes.Message == '' && <div style={{color:'gray',fontSize:'12px',fontWeight:'bold'}}>" His Send Picture or video "</div> }
                          {e.mes.Message == 'Call' && <div style={{color:'gray',fontSize:'12px',fontWeight:'bold'}}>" His Call You "</div> }
                      </div>
                    </div>

            </div>
                                   })}
                                 
                                { allNoti.length>0 && userSender.length >0 ? allNoti.map((e,i)=>{
                                    return <div key={i} className="nnb" style={{width:"100%",marginBottom:'20px'}}>
                   <div  style={{color:'black',textDecoration:'none',display:'flex',gap:'10px'}}>
                   < Link to={`Home/ShowProfile/${userSender[i].numAccount}`} style={{textDecoration:'none'}}>
                       <img src={`http://localhost:5500/${userSender[i].image}`} style={{width:'30px',height:'30px',borderRadius:'50%'}} alt="" />
                   </Link>
                      <div style={{display:'flex',gap:'5px',flexDirection:'column'}}>
                            <h5  >{userSender[i].FirstName} Send Message : </h5>  

                         <div style={{color:'gray',fontSize:'12px',fontWeight:'bold'}}>" {e.Message} "</div>
                      </div>
                    </div>

            </div>
                                }):''} 
                                 {allNoti.length == 0 && notiMessag.length == 0 && <div className="NoNoti"><div><FontAwesomeIcon icon={faBellSlash} />You not Notification</div></div> }
                            </div>
                           
                                :''}
                        </div>

                       


                        {/* <div onClick={Theme}>
                          <FontAwesomeIcon icon={faSun}  style={{cursor:"pointer"}}/>
                        </div> */}

                        
                            <div style={{position:'relative'}} onClick={ch2}>
                               {(Array.isArray(notii)&& notii.length > 0) || (Array.isArray(userNoti)&& userNoti.length > 0)   ? <div className="redd">{userNoti.length + notii.length} </div>:''}
                        
                                {/* {allInvi.length < 1 && noti.length > 1 && nnn.length> 1 && "" } */}
 

     {/* {allInvi && noti && userNoti ?(allInvi.length > 0 || noti.length > 0 || userNoti.length > 0?
        <div  className="redd">{allInvi.length + noti.length + userNoti.length}</div> 
        :''):''} */}

{/* {(  noti &&noti.length > 0 ) || ( userNoti && userNoti.length > 0 ) || ( allInvi && allInvi.length > 0 ) ?
      <div  className="redd">{parseInt(allInvi.length )+ parseInt(noti.length) + parseInt(noti.length)}</div> 
:''} */}
                                             
                                    
                                        

                                <FontAwesomeIcon icon={faBell}  style={{cursor:"pointer"}}/>
                    
                            </div>
                           
                        
                          


                    </div>


                      <div>
                        {openNotiLike?
                             <div className="NotiLike">

                                
                        
                              <div className="DivOfInvi">

             { nnn && nnn.length > 0   ? <button className="butDeletNoti" onClick={DeletAllNoti}> Delet All</button>:'' }
                               
                                   { noti && noti.length > 0 ? noti.map((e)=>{
                                     return ShowNoti(e.reciverId,e.First,e.type,e.ImageSender,e.num,e.senderId,e.imagepost)
                                  }):""}
                              </div>

                               {noti && noti.length == 0 && userNoti && userNoti.length == 0 && 'Notifction not exsit'}


                              <div className="DivOfInvi">
                                   { userNoti && nnn.length > 0 ? userNoti.map((e,i)=>{
                                     return  <div className="Bgha"  key={i}>
                                           <img src={`http://localhost:5500/${e.image}`} style={{width:'30px',height:'30px',borderRadius:'10px'}} alt="" />
                                         <div style={{alignSelf:'center',marginLeft:'5px'}}>
                                           <span>  {e.FirstName} </span>
                                           <span>{nnn[i].type == "1" && " Like Your Post "}</span>
                                           <span>{nnn[i].type == "2" && " Comment Your Post"}</span>
                                            <span>{nnn[i].type == "200" && " save Your Post"}</span>
                                           <span>{nnn[i].type == "11" && " DesLike Your Post"}</span>
                                            <span>{nnn[i].type == "201" && " DeSave Your Post"}</span>
                                            <span>{nnn[i].type == "301" && " send Invi"}</span>
                                            <span>{nnn[i].type == "302" && " Rfuse Invi"}</span>
                                            <span>{nnn[i].type == "303" && " Accpet Invi"}</span>
                                            <span>{nnn[i].type == "2000" && " Is Call you "}</span>
                                        </div>
                                     </div>
                                  }):''}
                                  {/* {  noti.length == 0  &&  userNoti.length == 0 &&  allInvi.length == 0   && <div><FontAwesomeIcon icon={faBellSlash} />You not Notification</div> } */}
                              </div>

                             </div>
                            :""}

                            
                      </div>

                       
                {
                    user?
                     <Link to={"Profile"} style={{textDecoration:'none',color:'black'}}>
                     <div style={{display:'flex'}}>
                        <img src={`http://localhost:5500/${user.image}`}  style= {{width:'40px',marginRight:"10px",marginLeft:"7px",height:'40px',borderRadius:'50%',marginTop:'-12Px'}} title="User"/>
                         {size.size>1050?<h4>{user.FirstName} {user.LasteName}  </h4>:''}
                      </div>
                     </Link>
                    :
                    <Lod2/>
                }
                </div>
             </header>

            
                <div style={{position:"absolute",left:'18%',marginTop:'35px',height:' fit-content',width:'45.5%',background:'rgb(207, 207, 207)'}}>
                     { serch.length > 0 && serch ? 
                        serch.map((e,i)=>{
                             return <div key={i} style={{width:'100%',display:'flex',height:' fit-content',background:'white'}}>
                                    <p>{e.FirstName} {e.LasteName}  </p>
                                    {/* <p>{e.image}</p> */}
                             </div>
                        })
                    :""}
                </div>
             
                
             
        </div>
    )
}




