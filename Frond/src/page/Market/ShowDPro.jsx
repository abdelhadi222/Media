import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from 'react';
import { SocketContext } from "../../Context/Socekt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft,faLocationDot,faCircleArrowRight,faPlus,faPhone,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
export default function ShowDPro() {
    const [pro,setPro] = useState('')
    const [num,setNum] = useState(0)
      const [test , setTest] = useState(false)
     const [user,setUser] = useState([])
     const [userCnx,setUserCnx] = useState([])
     const [isFrinde,setIsFrinde] = useState([])
     const [fri,setFri] = useState(false)

    const idPro = window.location.href.replace('http://localhost:5173/dash/market/ProById/','')
    console.log(idPro);
      console.log(idPro);
      useEffect(()=>{
          getOnePro()
          GetUser()
      },[test])

     async function getOnePro() {
        try {
            const res = await axios.get(`http://localhost:5500/api/getOnePro/${idPro}`,{headers:{token:window.localStorage.getItem('token')}})
            setPro(res.data.pro);
            setUser(res.data.pro.User[0])
            setTest(res.data.he)
            console.log('=== ' , res.data.isFrinde);
            setIsFrinde(res.data.isFrinde)
            console.log('Rah =>' , res.data.test);
            setFri(res.data.test)
        } catch (err) {
            console.log(err);
        }
      }

      let allImages = pro.Images
        
      function avance() {
        console.log(num);
        if(num < allImages.length-1){
           setNum(p=>p+1)
        }

        return
         
      }

      function NoAvnce() {
        if(num != 0){
           setNum(p=>p-1)
        }

        return
         
      }

      console.log(' user from Pro One => ' , user);


// let time = pro.creat
// console.log(time);
let nav = useNavigate()
 async function creatChat() {
  console.log('One ='  , user._id);
   
    
         try {
           const res = await axios.post('http://localhost:5500/api/creatChat',{
              idUserTwo:user._id,
              token:window.localStorage.getItem('token')

           })
           if(res.data == "Nothing") return
           if(res.status == 200) return  nav(`/dash/Message/${res.data.chat._id}`)
           console.log('res => ' , res );
         } catch (err) {
          console.log(err);
          
         }
     }




     
       async function GetUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
             setUserCnx(res.data.user);
        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }
    


//   const[allpro,setAllPro] = useState([])


//      async function GetAllPro() {
//   try {
//      const res = await axios.get('http://localhost:5500/api/getAllPro')
//      console.log("All Pro from Show ==>",res.data.AllPro);
//      setAllPro(res.data.AllPro)
//       // yyy = allpro.some((e)=> e.IdUser == user._id)
//     //  if(yyy) {
//     //    setTest(true)
//     //  }
//      console.log('yyy => is ==> ' , yyy);

//   } catch (err) {
//     console.log(err);
//   }
// }

  

      // contexet Socket : 
   const CSocket = useContext(SocketContext)
   let Soket = CSocket.socket

    function Sokett(type) {
         Soket.emit('sendNoti',{
                  senderId:userCnx._id,
                  reciverId:user._id,
                  First:userCnx.FirstName,
                  Last:userCnx.LasteName,
                  imageUserSender:userCnx.image,
                  num:userCnx.numAccount,
                  type,
              })
      }


 async function AddAime(t,idR) {
  console.log(idR);

         try {
              const res = await axios.post('http://localhost:5500/api/Addamie',{
                 IdUserSender:userCnx._id,
                 IdUserReciver:idR,
              })
              console.log("Add Amie =>",res);              
              Sokett(t,idR)
              setTest(p=>!p)


         } catch (err) {
            console.log(err);
         }
     }



       async function AnummeSend(IdP) {
        try {
            const res = await axios.post('http://localhost:5500/api/AnulSend',{token:window.localStorage.getItem('token'),IdRec:IdP})
              console.log('jjjjjlh => ' , res);
            setTest(p=>!p)
        } catch (err) {
            console.log('validation err is ',err);
        }
    }


      async function Accpet() {
             try {
                 const res = await axios.post('http://localhost:5500/api/Accpet',{
                    userCnx:userCnx._id,
                    IdUserConfirmation:user._id
                 })
                 
                 console.log(res);
                 setTest(p=>!p)

             } catch (err) {
                console.log(err);
             }
        }

    return (
        <div className="container" style={{padding:"20px"}}>
        

         {/* <div className="flx"> */}
               {pro?
                 <div className="imaaaage" style={{backgroundImage:`url(http://localhost:5500/${allImages[num]})`}} >
                  <p className="numberOfLength"> {num+1} / {pro.Images.length}</p>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:"100%"}}>
                    <div className="IconNex"><FontAwesomeIcon onClick={NoAvnce} icon={faCircleArrowLeft} className="dakhlIcon1" size="xl"/></div>
                    <div className="IconNex"><FontAwesomeIcon onClick={avance} icon={faCircleArrowRight} size="xl "  className="dakhlIcon2"  /></div>
                  </div>
                
              </div>
               :""}

  {/* {pro &&<p className="numberOfLength"> {num+1} / {pro.Images.length}</p>} */}
              <div className="Information" style={{padding:"20px",width:'100%',background:'white',minHeight:"400px",margin:"0 auto",borderRadius:' 0px 0px 8px 8px '}}>


                   <div style={{display:'flex',justifyContent:'space-between',marginBottom:'45px'}}>
                       <h1>{pro.Titel}</h1>
                       <h2>category : {pro.category}</h2>
                   </div>  

   <div style={{color:'rgb(188, 188, 188)',marginBottom:'15px'}}><FontAwesomeIcon icon={faLocationDot}  style={{marginRight:'10px',color:'rgb(188, 188, 188)'}}/>{pro.adr}</div>

                     <div className="des">
                      <h4>Description :</h4>
                      <p style={{marginTop:'7px'}}>{pro.des}</p>
                  </div>    


                    

                    
                           <div className="des">
                      <h4 style={{marginBottom:'15px'}}>Informayion for User :</h4>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                      <div>
                              <Link to={`${user.numAccount}`} style={{textDecoration:'none',color:'black'}}>
                            
                                <div style={{display:'flex',gap:'10px'}}>
                         <img src={`http://localhost:5500/${user.image}`} style={{width:'40PX',height:'40px',borderRadius:'50%'}} alt="" />
                           <div style={{display:'flex',gap:'4px',alignSelf:'center'}}>
                              <h5> { user.FirstName}</h5>
                              <h5> { user.LasteName}</h5>
                           </div>
                      </div>
     
                         </Link>
                          <p style={{margin:'10px',marginLeft:'-5px'}}><FontAwesomeIcon icon={faPhone} /> :  {user.phone}</p>
                          <p style={{margin:'10px',marginLeft:'-5px'}}><FontAwesomeIcon icon={faEnvelope} /> :  {user.email}</p>
                      </div>


                      {
                        !fri ? (isFrinde.length < 1 ? <div className="AddFrindesFromShowPro" onClick={()=>AddAime(4,user._id)}>
                        <p>Flow <FontAwesomeIcon icon={faPlus} /></p>
                      </div>:'')
                      :''
                      }

                      {
                        !fri && (isFrinde.length > 0  && typeof isFrinde == 'object' ? <p className="ProDelet" onClick={()=>AnummeSend(user._id)}>cancel invitation</p>:"")
                      }
                       {
                        !fri && (isFrinde == 'Yes'?<p className="buG" onClick={Accpet}>Accpet Invitation</p>:'')
                       }

                      

                        {fri == '' && ''}
                      </div>
                     
                  </div>   


                  

        
              
           
                 
                
                 

                    

                    <div className="Fin" style={{display:'flex',justifyContent:'space-between',marginTop:'50px'}}>
                      <h4 style={{color:'green',alignSelf:'center'}}>Price : {pro.Price} $ </h4>
                    

                    { 
                      test && <button className="ppp" onClick={creatChat}>
                                Contact Me
                                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                </svg>
                             
                               </button>
                           
                            // <button className="ProDelet ">Delet Pro</button>    
                    }


                  </div> 

          <div className="df" style={{marginTop:'50px',color:'#c5c5c5',justifyContent:'space-between'}}>
              <div>
              {pro?
               <p>Date Creat : {pro.creat.split('').slice(0,10).join('')}</p>
            :""}
            </div>


               <div>
              {pro?
              <p>Time : { pro.creat.split('').slice(-13,-5).join('')}</p>
            :""}
            </div>
          </div>




              </div>
         </div>

        // </div>
    )
}