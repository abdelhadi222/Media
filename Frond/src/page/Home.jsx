import { useEffect, useState } from "react";
import AddPost from "../Compents/Post/AddPost";
import {Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserPlus,faMagnifyingGlass,faPaperPlane,faCloudArrowUp , faCircleXmark, faTrash,faEye,faXmark,faCircleLeft ,faPlus,faUsersSlash,faArrowLeft,faArrowRight,faCommentDots, faCircleCheck,faHourglassHalf,faEnvelopeCircleCheck ,faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NotiMessage } from "../Context/NotiMessage.jsx";
import StructurePost from "../Compents/Post/StructurePost.jsx";
import { useContext } from 'react';
import { SocketContext } from "../Context/Socekt.jsx";
import {Save} from "../Context/Save"
import Scol from "../page/Scol/Scol.jsx"
import  {Windo} from "../Context/Windo"
import {Indx} from "../Context/in.jsx"
import "../page/Home.css"



export default function Home() {
 const[user,setUser] = useState('')
  
   const[isShow,setIsShow] = useState(false)
    const[yes,setYes] = useState(false)
  const[showDiv,setShowDiv] = useState(false)
  const[showStdiv,setShowStdiv] = useState(false)
 const[alluser,setAlluser] = useState('')
  const[allpost,setAllpost] = useState('')  
  const[allpostSt,setAllpostSt] = useState(false)
  const [valide,setValide] = useState(false)
  const[userFr,setUserFr] = useState([])
  const[relode,setRelode] = useState(false)
  const [inp,setInp] = useState('')
    const[arrya,setArrya] = useState([])

      const[nst,setNst] = useState([])  
      const[sst,setSst] = useState([])
        const[imaSt,setImaSt] = useState([])
              const[idUsSt,setIdUsSt] = useState('')


       const[numSt,setNumSt] = useState(0)
       const [re,setRe] = useState(false)
   

  const [st,setSt] = useState('')
   const [stCo,setStCo] = useState('')
     const [shows,setShows] = useState([])

  let ina = useContext(Indx)

  let size = useContext(Windo)
  console.log("soze =>" , size.size);

  let NotiCon = useContext(NotiMessage)
  

  

  
console.log('Yas Ys YSy sys => ' , NotiCon);

       const conta = useContext(Save);
      const sss = conta.sss


   



     
  // contexet Socket : 
   const CSocket = useContext(SocketContext)
   let Soket = CSocket.socket

//    console.log('From Home User Online =>' , CSocket.onlineUsers);

    function Sokett(type,marsoule) {
         Soket.emit('sendNoti',{
                  senderId:user._id,
                  reciverId:marsoule,
                  First:user.FirstName,
                  Last:user.LasteName,
                  imageUserSender:user.image,
                  num:user.numAccount,
                  type,
              })
      }

   useEffect(()=>{
   GetAllUsers()
   GetAllPost()
  
   },[sss,conta.ih])

   useEffect(()=>{
        GetUser()
   },[sss,CSocket.onlineUsers,re , numSt])

  
//    useEffect(()=>{
//  getInviSender()
//    },[relode])


   
   const [allUsers,setAllUsers] = useState([])
     async function GetAllUsers() {
          try {
            const res = await axios.get('http://localhost:5500/api/AllUsers')
             setAlluser(res.data.Users);
             console.log('ALL +>' , res.data.Users);
             setAllpostSt(true)
        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }
   


     async function AddAime(t,idR,index) {

         try {
              const res = await axios.post('http://localhost:5500/api/Addamie',{
                 IdUserSender:user._id,
                 IdUserReciver:idR,
              })
              console.log("Add Amie =>",res);
              allUsers.splice(index,1)
              setValide(p=>!p)
              console.log('Uses => ',alluser);
              // if(user.noti==false){Sokett(t,idR)}
              Sokett(t,idR)
              
              setRelode(p=>!p)

         } catch (err) {
            console.log(err);
         }
     }

     console.log('fr =>' , userFr);



     

    

    //     const [userSendInvi,setUserSendInvi]=useState([])
    //       async function getInviSender() {
    //          try {
    //            const res = await axios.post('http://localhost:5500/api/getUsersSendInvi',{token:window.localStorage.getItem('token')})
   
    //            setUserSendInvi(res.data.UserSendInvi)
    //         } catch (err) {
    //         console.log('validation err is from Context',err);
    //         }
    //  }

     

   

       





            async function GetUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
             setUser(res.data.user);
             GetFrUser(res.data.user._id)
   
            
            //  console.log(res.data.user.);
             window.localStorage.setItem('num',res.data.user.numAccount)
            //  window.localStorage.setItem('Like',0)
             

        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }
''


        async function GetFrUser(idP) {
            console.log('r' , idP);
        try {
            const res = await axios.post('http://localhost:5500/api/FrUser',{idU:idP})
            console.log('res = = = > ' , res.data.infoUserFrind );
            
              setUserFr(res.data.infoUserFrind)
              if(res.data.infoUserFrind.length > 0){
               setYes(true)
              }
        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }
         


     


    async function GetAllPost() {
        try {
            const res = await axios.get('http://localhost:5500/api/getAllPost')
       
            setAllpost((res.data.Posts).reverse())
            
        } catch (err) {
            console.log('validation err is ',err);
        }
    }
    
    useEffect(()=>{
     GetAllUsersss()
    },[relode])

   
      async function GetAllUsersss() {
        try {
            const res = await axios.post('http://localhost:5500/api/getUserSide',{token:window.localStorage.getItem('token')})
              console.log('Inchaalh => ' , res.data.users);
            setAllUsers(res.data.users);
            
        } catch (err) {
            console.log('validation err is ',err);
        }
    }
 console.log("After ", userFr);
 
//     let hh = []
//    for (let i = 0; i < allUsers.length; i++) {
//         for (let j = 0; j < userSendInvi.length; j++) {
//              if(allUsers[i]._id == userSendInvi[j].IdUserReciver){
//                  allUsers.splice(i,1)
//              }
                 
//         }  
//    }
//    console.log("before " ,allUsers);

    //    console.log('HHHHHHH =<w Two => ' ,hh );


     async function AnummeSend(IdP) {
        try {
            const res = await axios.post('http://localhost:5500/api/AnulSend',{token:window.localStorage.getItem('token'),IdRec:IdP})
              console.log('jjjjjlh => ' , res);
            setRelode(p=>!p)
            conta.setSss(p=>!p)
            
        } catch (err) {
            console.log('validation err is ',err);
        }
    }

 console.log('Al  User =>' , allUsers);

  let nav= useNavigate()
      async function creatChat(id) {
     
         try {
           const res = await axios.post('http://localhost:5500/api/creatChat',{
    
              idUserTwo:id,
              token:window.localStorage.getItem('token')
            
           })
       
           nav(`/dash/Message/${res.data.chat._id}`)
         } catch (err) {
          console.log(err);
          
         }
     }


     function AddStory() {
        document.querySelector('.PageHomePr').classList.add('black')
        setShowDiv(true)
        setNumSt(0)
     }
         
      const imageOnChange = (e) => {
      setSt(e.target.files[0])
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        console.log('4444444',st);

        reader.onload = (ev) => {
            return setStCo(ev.target.result);
        };
    };

    async function sendSt(e) {
        e.preventDefault() ;

        if(stCo == '' && st == "")
        {
          alert('Pls Enter Your Story ')
         return
        }

        console.log(' st1 => ' , stCo);
        console.log(' st2 => ' , st);


        let data = new FormData()
        data.append('St',st)
        data.append('token',window.localStorage.getItem('token'))

        try {
           const res = await axios.post('http://localhost:5500/api/AddStory' , data)
           console.log("res = >" , res);
           document.querySelector('.PageHomePr').classList.remove('black')
           setShowDiv(false)
           setRe(p=>!p)
           setNumSt(0)
           setStCo('')
           setSt('')
          
        } catch (err) {
          console.log('validi =>' , err );
        }
      
    }
    

    // function shoo(ar) {
    //   console.log('TTTT' , ar );
    //   return (
       
    //   )
      
    // }

    function showSt(st,name,laste,ima,id) {
             document.querySelector('.PageHomePr').classList.add('black')
             console.log('rrrrrrrrrr' , id);
             setShowStdiv(true)
             setArrya(st)
             setNst(name)
             setSst(laste)
             setImaSt(ima)
             setIdUsSt(id)
                  // shoo(st)
             


    }

    function MAdd() {
      console.log(numSt);

      
         if( numSt  == arrya.length -1) 
         {
         //  document.querySelector('.IconSt2').classList.add('drop')
          return
         }
       
         //  document.querySelector('.IconSt1').classList.remove('drop')
         setNumSt(p=> p + 1)
         ShowAtherSt(arrya[numSt].userId)
         setRe(p=>!p)

         
    }
    function MUnis() {
       if( numSt  == 0 ) {
      //   document.querySelector('.IconSt1').classList.add('drop')
        return
       }

      //   document.querySelector('.IconSt2').classList.remove('drop')
         setNumSt(p=> p - 1)
         setRe(p=>!p)
    }


    function endSt() {
       document.querySelector('.PageHomePr').classList.remove('black')
       setShowStdiv(false)
       setNumSt(0)
    }


    function shwoMyst() {
         document.querySelector('.PageHomePr').classList.add('black')
    }


  async   function ShowAtherSt(us) {
   console.log('us =>' , us );
       try {
          const res = await axios.post('http://localhost:5500/api/showStory',{token:window.localStorage.getItem('token'),numSt:numSt,userSt:us})
          console.log(res);
       } catch (err) {
         console.log('vali =>' , err);
       }
    }

      async   function getShowSt() {
           setIsShow(true)
           setShowStdiv(false)
       try {
          const res = await axios.post('http://localhost:5500/api/getShowSt',{token:window.localStorage.getItem('token'),numSt:numSt})
          console.log(res);
          setShows(res.data.Sh)
       } catch (err) {
         console.log('vali =>' , err);
       }
    }


    async function deletSt() {
      console.log('µµµµµµµµµµµµµµµµ');
      try {
         const res = await axios.post('http://localhost:5500/api/deletSt',{token:window.localStorage.getItem('token'),numSt:numSt})
         console.log( " Delet  St => ", res);
         setRe(p=>!p)
         arrya.splice(numSt,1)
         setNumSt(0)
         alert('Story is Delet !! ')
      } catch (err) {
         console.log(err);
      }
    }


    console.log('dddd ', st.slice(4,10));
  

    function te(ar) {
       let y = ar.some((e)=> e == user._id)
       return y 
    }
   

console.log('StStsttSstS 1 ', stCo);
console.log('StStsttSstS 2 ', st);
let ya 
if(st.type) {
   ya = st.type.includes('video')
}

console.log('yya =>' , ya);

//    useEffect(() => {
 
//     const chek = async () => {
//       try {
//         const res = await axios.post('http://localhost:5500/api/chekSt',{token:window.localStorage.getItem('token')});
//          console.log('ZZZZZZZZZ',res);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//       // chek()

//    //  const interval = setInterval(() => {
//    //    chek();
//    //  }, 60000); 


//    //  return () => clearInterval(interval);
//   }, [])


  console.log('USESR Fr  =>  ' , userFr);


    return (
      <div  style={{width:'100%'}} className="PageHomePr" >
         {allpostSt?
             <div  className="kjkj" >
            

             {size.size < 1000 &&  <div className="FrndsFromHoma">
                   <h3 style={{textAlign:'center'}}>Your Friends </h3>
                  {userFr.length > 0 ? <div>
                 </div>:<div className="NotFr">  <FontAwesomeIcon icon={faUsersSlash} />  You  Have Not A Frindes </div>
                 }
                 

                 <div>
                    {/* {userFr && userFr.map((e,i)=>{
                        return <Link to={`ShowProfile/${e.numAccount}`}    key={i} style={{display:'flex',gap:"20px",textDecoration:'none',color:'black'}}>
                                  
                                <div style={{position:'relative'}}>
                                  {CSocket.onlineUsers.length > 0 && CSocket.onlineUsers.map((el,index)=>{
                                     return  e._id == el.UserId ?<div key={index} className="BoxGreenn"></div>:''
                                  })}
                                   <img src={`http://localhost:5500/${e.image}`} style={{width:"40px",height:'40px',borderRadius:'50%'}} alt="" />
                                </div>
                                 <p style={{alignSelf:'center'}}>{e.FirstName} {e.LasteName}</p>
                           </Link>
                          
                    })} */}

                
                         <div style={{display:'flex',gap:'10px'}}>
                           {Array.isArray(userFr) && yes && userFr.length > 0 && inp.length == 0 ? userFr.map((e,i)=>{
                        return <Link to={`ShowProfile/${e.numAccount}`}    key={i} style={{display:'flex',gap:"20px",textDecoration:'none',color:'black',margin:'10px 0'}}>
                                <div style={{position:'relative'}}>
                                  
                                     {CSocket.onlineUsers.length > 0 && CSocket.onlineUsers.map((el,index)=>{
                                        return  e._id == el.UserId ?<div key={index} className="BoxGreenn"></div>:''
                                     })}
                                   <img src={`http://localhost:5500/${e.image}`} style={{width:"50px",height:'50px',borderRadius:'50%'}} alt="" />
                                </div>
                           </Link>
                          

                    }):""}
                      </div>
                  

                    {userFr && inp.length > 0 ?
                       userFr.filter((el)=>el.FirstName.toLowerCase().includes(inp.toLowerCase()) || el.LasteName.toLowerCase().includes(inp.toLowerCase()) ).map((e,index)=>{
                         return  <Link to={`ShowProfile/${e.numAccount}`} key={index} style={{display:'flex',gap:'5px',justifyContent:'space-between',textDecoration:'none',color:'black',background:'#e0e0e0',borderRadius:'7px',marginTop:'6px',padding:'4px'}}>
                             <div style={{display:'flex',gap:'5px'}}>
                                  <div style={{position:'relative'}} key={index}>
                                  
                                     {CSocket.onlineUsers.length > 0 && CSocket.onlineUsers.map((el,index)=>{
                                     return  e._id == el.UserId ?<div key={index} className="BoxGreenn"></div>:''
                                  })}
                                   <img src={`http://localhost:5500/${e.image}`} style={{width:"40px",height:'40px',borderRadius:'50%'}} alt="" />
                                </div>
                                 <p style={{alignSelf:'center'}}>{e.FirstName} {e.LasteName}</p>
                             </div>

                             <div  style={{alignSelf:'center'}} onClick={()=>creatChat(e._id)}>
                                 <p className="ChtFromHome"> <FontAwesomeIcon icon={faCommentDots} style={{marginRight:'5px'}} />Chat</p>
                             </div>
                         </Link>
                       })
                    :""}


                 </div>

                     
              </div>
               }          
   



             <div className="DivOneFromHome">
              <div className="whha">
                  <div style={{position:'relative'}}>
                     <div style={{width:'45px',height:'45px',borderRadius:'50%'}} onClick={()=>showSt(user.story,user.FirstName,user.LasteName,user.image,user._id)} >
                       <img src={`http://localhost:5500/${user.image}`} alt="" style={{width:'45Px',height:'45px',borderRadius:'50%', border:Array.isArray(user.story) && user.story.length > 0 ?'2px solid blueviolet':''}} />
                     </div>
                   <div className="vvv" onClick={AddStory}><FontAwesomeIcon icon={faPlus} style={{fontSize:'10px'}} /></div>
                  </div>

                    <div>
                        {userFr.length > 0 && userFr.map((e)=>{
                     return Array.isArray(e.story)  && e.story.length > 0  ? 
                        <div onClick={()=>{
                           showSt(e.story,e.FirstName,e.LasteName,e.image)
                           ShowAtherSt(e._id)
                        }}>
                         
                            <img src={`http://localhost:5500/${e.image}`} alt="" style={{width:'45Px',height:'45px',borderRadius:'50%' , border:'2px solid blueviolet'}} />
                        </div>:''
                  })}
                     </div>

                 
              </div>
              {showDiv && <div className="yahoo">
                <div className="buuab" onClick={()=>{setShowDiv(false)
                   document.querySelector('.PageHomePr').classList.remove('black')  }} style={{position:'absolute',right:'-10px',top:'-10px',zIndex:'2000',width:'20px',height:'20px',background:'red',borderRadius:'50%',display:'flex',justifyItems:'center',justifyContent:'center',color:'white'}}><FontAwesomeIcon icon={faXmark} style={{cursor:'pointer',alignSelf:'center'}} /></div>
                   {/* <div onClick={endSt} style={{position:'absolute',right:'-10px',top:'-10px',zIndex:'2000',width:'20px',height:'20px',background:'red',borderRadius:'50%',display:'flex',justifyItems:'center',justifyContent:'center',color:'white'}}></div> */}

                  <div style={{display:'flex',flexDirection:'column',gap:'7px'}}>
                     <label > Add Your Sotry  Image Or Video:  </label>
                     <div className="fffg">
                        <div style={{width:'100%',position:'absolute',left:'0%',top:'5%',color:'white',fontSize:'22px',display:'flex',gap:'15px'}} >
                           <div className="BoxUplo"><FontAwesomeIcon icon={faCloudArrowUp} /></div>
                           {/* <div style={{padding:'5px'}}>text</div>  */}
                        </div>
                         <input type="file" onChange={imageOnChange} name="St"  />
                     </div>
                  </div>

                  <div style={{width:'80%',height:'80%',position:'relative',marginTop:'-25px'}}>
                    {st && stCo && (ya ?<video src={stCo} controls style={{width:'100%',height:"100%",marginTop:'35px'}}></video>: <img src={stCo} alt="" style={{width:'90%',height:'320px',marginTop:'30px'}} />)}
                    {stCo && <p onClick={()=>{setStCo('')
                     setShowDiv(false)
                     document.querySelector('.PageHomePr').classList.remove('black')
                     setSt('')}} style={{position:'absolute',right:"40px",top:'26px',width:'20px',height:'20px',background:'red',borderRadius:'50%',display:'flex',justifyItems:'center',justifyContent:'center',color:'white'}}><FontAwesomeIcon icon={faXmark} style={{cursor:'pointer',alignSelf:'center'}} /></p>}
                  </div>

                  <div className="ButtoAddSt">
                    <button onClick={sendSt} >Done !</button>
                  </div>

              </div>}

              {/* here */}

              {
                showStdiv &&
          <div className="BoxStShow" style={{height:Array.isArray(arrya) && arrya.length >0?'360px':'fit-content'}}>
             {Array.isArray(arrya) && arrya.length >0 ?
                <div>
                  <div style={{position:'relative'}} >

                    <div onClick={endSt} style={{position:'absolute',right:'-10px',top:'-10px',zIndex:'2000',width:'20px',height:'20px',background:'red',borderRadius:'50%',display:'flex',justifyItems:'center',justifyContent:'center',color:'white'}}><FontAwesomeIcon icon={faXmark} style={{cursor:'pointer',alignSelf:'center'}} /></div>

              
                      <div style={{width:'100%',margin:'0 auto',height:'340px',position:'relative'}} >

                        <div style={{display:'flex',gap:'40px',position:'absolute',width:'100%',padding:'5px',
                      height:'fit-content',background:'white',color:'black'}}>
                            <div><img src={`http://localhost:5500/${imaSt}`} alt="" style={{width:'30PX',height:'30px',borderRadius:'50%',position:"absolute"}} /></div>
                            <div style={{marginTop:'7px'}}>
                               {nst} {sst}
                            </div>
                        </div>

                        {
                         Array.isArray(arrya) && arrya.length >1 && <div style={{display:'flex',justifyContent:"space-between",alignItems:'center',height:'100%',zIndex:'1',position:'absolute',marginTop:'20px'}}>
                          <div className="IconSt1" onClick={MUnis}> <FontAwesomeIcon icon={faArrowLeft}  /></div>
                          <div className="IconSt2" onClick={MAdd} >  <FontAwesomeIcon icon={faArrowRight}  /></div>
                        </div>
                        }

                        {arrya[numSt].type == 'Vd'?<video autoPlay src={`http://localhost:5500/${arrya[numSt].st}`}style={{width:'100%',height:'97%',marginTop:'30px'}} ></video>:<img src={`http://localhost:5500/${arrya[numSt].st}`} alt="" style={{width:'100%',height:'100%',marginTop:'30px'}} />}
                          
                      </div>

                         {
                           user._id == arrya[0].userId ?
                            <div style={{zIndex:'2000',position:'absolute',width:'100%',display:'flex',padding:'5px',justifyContent:'space-between',alignItems:'center',background:'white',marginTop:'15px'}}>

                               <div onClick={getShowSt}><FontAwesomeIcon icon={faEye} /></div>

                              <div onClick={deletSt} style={{cursor:'pointer',width:"20px",height:'20px',display:'flex',justifyContent:'center',alignItems:'center'}}><FontAwesomeIcon icon={faTrash} /></div>
                           </div>
                           :''
                         }
                      

                    
                  </div>
                </div>
             :<div style={{padding:'10px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <p style={{marginBottom:'10px'}}>Story Not Exsit</p>
                <div className="Anu" onClick={()=>{
                  setShowStdiv(false)
                  document.querySelector('.PageHomePr').classList.remove('black')
                }}><FontAwesomeIcon icon={faCircleXmark} /></div>
                <button className="bghaa" onClick={()=> {
                  setShowStdiv(false)
                   setShowDiv(true)
                }}>Add Stort here ! </button>
             </div>} 
                
        </div>
              }

                 {isShow && 
                     <div className="ALSH ">
                        <button onClick={()=>{
                           setIsShow(false)
                           setShowStdiv(true)
                        }}><FontAwesomeIcon icon={faCircleLeft} size="xl" color="blueviolet" /></button>
                         { Array.isArray(shows) && shows.length > 0 ? shows.map((e,i)=>{
                            return  <div key={i} className="sh">
                                <div><img src={`http://localhost:5500/${e.image}`} alt=""  style={{width:'40px',height:'40px',borderRadius:'50%'}}/></div>
                                <div style={{alignSelf:'center'}}>{e.FirstName} {e.LasteName}</div>
                            </div>
                         }):<p style={{marginTop:'10px'}}>No Bady show Your Story</p>
                            
                         }
                     </div>
                  }
                <AddPost/>
                        <div>
                    {allpost ? allpost.map((e,i)=>{
                        return  <div key={i}>
                            
                                   <StructurePost Fname={e.FirstName} Lname={e.LasteName} numUser={user.numAccount}
                                   imageUser={e.imageUser} imageComment={user.image} message={e.msg} idUserPost={e.IdUser} id={e._id}  idUser={user._id}
                                   IdUser={user._id} imagePost={e.imagePost} li={e.Likes} saved={e.IsSave} idpost={e._id} User={e._id} num={e.num} VideoPost ={e.VideoPost} />
                                </div>
                    }):<div className="hg1" style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'
                    }}>publiction Not exsit</div>}
                </div>
             </div>






             <div style={{width:'30%',display:'flex',flexDirection:'column',gap:'20px'}}>
                <div className="DivTwoFromHome">
                    {
                       allUsers && allUsers.map((e,i)=>{
                            return e != '' ?
                               <div key={i} style={{display:'flex',justifyContent:"space-between",marginBottom:'10PX',height:' fit-content'}}>

                                    <Link to={`ShowProfile/${e.numAccount && e.numAccount}`} style={{textDecoration:'none',color:'black'}}>
                                      <div style={{display:"flex",gap:'20px'}}>
                                         <img src={`http://localhost:5500/${e.image}`} style={{width:"50px",height:'50px',borderRadius:'50%'}}/>
                                         <p style={{alignSelf:'center'}}>{e.FirstName} {e.LasteName}</p>
                                      </div>
                                    </Link>
                                    {e.type =="111"?<div style={{alignSelf:'center'}} onClick={()=>AnummeSend(e._id)}><p className="Anul"><FontAwesomeIcon icon={faXmark}  /></p></div>:<div className="ButtonsenInvi"  style={{alignSelf:'center',fontSize:'12px'}}  onClick={()=>AddAime(4,e._id,i)}><FontAwesomeIcon icon={faUserPlus} /></div>}
                            </div>
                            :""
                        })
                    }

                </div>




            {size.size > 1000 &&  <div className="FrndsFromHoma">
                   <h3>Your Friends </h3>
                  {userFr.length > 0 ? <div>
                   <FontAwesomeIcon icon={faMagnifyingGlass} className="III"/>  <input type="text" placeholder="Search For Friend" 
                   onChange={(e)=>setInp(e.target.value)} className="serchForFrind"/>
                 </div>:<div className="NotFr">  <FontAwesomeIcon icon={faUsersSlash} />  You  Have Not A Frindes </div>
                 }
                 

                 <div>
                    {/* {userFr && userFr.map((e,i)=>{
                        return <Link to={`ShowProfile/${e.numAccount}`}    key={i} style={{display:'flex',gap:"20px",textDecoration:'none',color:'black'}}>
                                  
                                <div style={{position:'relative'}}>
                                  {CSocket.onlineUsers.length > 0 && CSocket.onlineUsers.map((el,index)=>{
                                     return  e._id == el.UserId ?<div key={index} className="BoxGreenn"></div>:''
                                  })}
                                   <img src={`http://localhost:5500/${e.image}`} style={{width:"40px",height:'40px',borderRadius:'50%'}} alt="" />
                                </div>
                                 <p style={{alignSelf:'center'}}>{e.FirstName} {e.LasteName}</p>
                           </Link>
                          
                    })} */}

                       {userFr && inp.length == 0 ? userFr.map((e,i)=>{
                        return <Link to={`ShowProfile/${e.numAccount}`}    key={i} style={{display:'flex',gap:"20px",textDecoration:'none',color:'black',margin:'10px 0'}}>
                                <div style={{position:'relative'}}>
                                  
                                     {CSocket.onlineUsers.length > 0 && CSocket.onlineUsers.map((el,index)=>{
                                        return  e._id == el.UserId ?<div key={index} className="BoxGreenn"></div>:''
                                     })}
                                   <img src={`http://localhost:5500/${e.image}`} style={{width:"40px",height:'40px',borderRadius:'50%'}} alt="" />
                                </div>
                                 <p style={{alignSelf:'center'}}>{e.FirstName} {e.LasteName}</p>
                           </Link>
                          

                    }):""}

                    {userFr && inp.length > 0 ?
                       userFr.filter((el)=>el.FirstName.toLowerCase().includes(inp.toLowerCase()) || el.LasteName.toLowerCase().includes(inp.toLowerCase()) ).map((e,index)=>{
                         return  <Link to={`ShowProfile/${e.numAccount}`} key={index} style={{display:'flex',gap:'5px',justifyContent:'space-between',textDecoration:'none',color:'black',background:'rgb(204 164 211)',borderRadius:'7px',marginTop:'6px',padding:'4px'}}>
                             <div style={{display:'flex',gap:'5px'}}>
                                  <div style={{position:'relative'}} key={index}>
                                  
                                     {CSocket.onlineUsers.length > 0 && CSocket.onlineUsers.map((el,index)=>{
                                     return  e._id == el.UserId ?<div key={index} className="BoxGreenn"></div>:''
                                  })}
                                   <img src={`http://localhost:5500/${e.image}`} style={{width:"40px",height:'40px',borderRadius:'50%'}} alt="" />
                                </div>
                                 <p style={{alignSelf:'center'}}>{e.FirstName} {e.LasteName}</p>
                             </div>

                             <div  style={{alignSelf:'center'}} onClick={()=>creatChat(e._id)}>
                                 <p className="ChtFromHome"> <FontAwesomeIcon icon={faCommentDots} style={{marginRight:'5px'}} />Chat</p>
                             </div>
                         </Link>
                       })
                    :""}


                 </div>

                     
              </div>
               }
             </div>

        </div>
         :<Scol/>}
      </div>
    )
}