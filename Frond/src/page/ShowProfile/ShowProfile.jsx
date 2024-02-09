import "../Profile/Profile.css"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import StructurePost from "../../Compents/Post/StructurePost";
import Lod2 from "../Lod2/Lod2"
import Loding from "../Loding/Loding";
import { useContext } from "react";
import { Save } from "../../Context/Save";
import { Link } from "react-router-dom";
import { faPlus,faUserMinus,faWindowMinimize} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocketContext } from "../../Context/Socekt";
import {Meun} from "../../Context/Meun"

export default function Profile() {
    const [user,setUser] = useState('')
    const [userFr,setUserFr] = useState([])
    const [onePost,setOnePost] = useState('')
    const [lod2,setLdo2] = useState(true)
    const [chek,setChek] = useState('')
    const [userCnx,setUserCnx] = useState([])

    let ccc = useContext(Save)
    let newww = useContext(Meun)

let key = window.location.href.slice(-1)
   useEffect(()=>{
      GetUser()
      GetPostForOne()
      GetCnxUser()
  
    },[newww.isopen,key])

      


console.log('Kry = ' , key );
  // let key = window.location.href.replace('http://localhost:5173/Dash/Home/ShowProfile/','')
 console.log(key);


       async function GetCnxUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
             setUserCnx(res.data.user);
             console.log('User Fro ' , res.data.user);
        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }

 
   
        async function GetUser() {
            setLdo2(false)
            console.log('Get uSER');
        try {
            const res = await axios.get(`http://localhost:5500/api/getById/${key}`,{headers:{token:window.localStorage.getItem('token')}})
             setUserFr(res.data.info)
             setUser(res.data.user);
             console.log('3333 ' ,res);

             console.log('Res =>' , res.data)
             setChek(res.data.check)
             console.log('Soution =>  ' , res.data.check);
             
        } catch (err) {
            console.log('validation err is from Context',err);
        }
        setLdo2(true)
     }

      

     async function GetPostForOne() {
         try {
            const res = await axios.get(`http://localhost:5500/api/getAllPostsById/${key}`)
            setOnePost(res.data.posts);
       
         } catch (err) {
           console.log(err); 
         }
     }

     console.log('from show ',onePost);



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



       async function  Refuse() {

            try {
                const res = await axios.post('http://localhost:5500/api/Refuse',{
                     idSende:user._id,
                     userCnx:userCnx._id
                })
                console.log("No => ",res);
                //   let ne = noti.filter((e)=>{
                //           return e.senderId != idU
                //  })
                //  setNoti(ne)
                // ccc.setSss(p=>!p)
              newww.setIsopen(p=>!p)

            } catch (err) {
                console.log(err);
            }
            
         }


             async function AnummeSend() {
        try {
            const res = await axios.post('http://localhost:5500/api/AnulSend',{token:window.localStorage.getItem('token'),IdRec:user._id})
                // ccc.setSss(p=>!p)
                  newww.setIsopen(p=>!p)
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
                  newww.setIsopen(p=>!p)
                    //    ccc.setSss(p=>!p)
      
             } catch (err) {
                console.log(err);
             }
        }



         async function AddAime() {

         try {
              const res = await axios.post('http://localhost:5500/api/Addamie',{
                 IdUserSender:userCnx._id,
                 IdUserReciver:user._id,
              })
              console.log("Add Amie =>",res);

              Sokett(4)
               newww.setIsopen(p=>!p)
            //   ccc.setSss(p=>!p)


         } catch (err) {
            console.log(err);
         }
     }



     async function Inflow() {
        try {
            const res = await axios.post('http://localhost:5500/api/Infolw',
            {token:window.localStorage.getItem('token'),idUserShow:key})
            console.log('r = ',res);
            //    ccc.setSss(p=>!p)
             newww.setIsopen(p=>!p)
        } catch (err) {
            console.log(err);
        }
     }

   
        
    return(
        <div className="Profile " style={{zIndex:"19"}}>
            {!lod2&&<Loding/>}
        
        

              <div>
                     {user &&   <div className="BACKGROUND" style={{backgroundImage:`url(http://localhost:5500/${user.ImageCov})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center center'}}></div>}
        
            
             
             {user && <div className="imageUser">
                <img src={`http://localhost:5500/${user.image}`} style={{width:'100%',height:'100%',borderRadius:'50%'}}/>
             </div> }
         
             <div className="text">
                {user &&  <h2>{user.FirstName} {user.LasteName}</h2>}
                 {chek == 'Is Frinde' && <div  className="Infolow" onClick={Inflow}><p>In flow </p></div>}
                 {chek == 'Is  Not Frinde' && <div onClick={AddAime} className="FlowFromProfile"><p>Flow <FontAwesomeIcon icon={faPlus} /></p></div> }
                 {chek == 'Is Send' && <div className="CaneFromProfile" onClick={AnummeSend}><p> Annule</p></div> }
                 {chek == 'Me' && '' }

                   {chek == 'Accpet' && 
                      <div style={{marginTop:'20px'}}>
                          <h4>Accpet Or No</h4>
                          <div className="PourAccprtOrRefuefromPtofile">
                           <button className="blueee" onClick={Accpet}>Yes</button>
                           <button className="redda" onClick={Refuse}>No</button>
                        </div>
                      </div>
                    }
             </div>
              
              <div className="aboutUser">
                <div>
                    <h3>All Frindes User</h3>
                       <div style={{display:'flex',gap:'20px',marginTop:'10Px'}}>
                       {
                      userFr && userFr.map((e,i)=>{
                         return <Link   onClick={()=>newww.setIsopen(p=>!p)} key={i} style={{display:'flex', gap:'10px',flexWrap:"wrap"}}>
                               <img src={`http://localhost:5500/${e.image}`} style={{width:"90px",height:"90px",borderRadius:'50%'}} alt="" />
                         </Link>  
                      })
                    }
                    </div>
                </div>
                <div>
            
                 {user &&
                   <div className="info">
                      <p>Email : {user.email}</p>
                   <p>Phone : {user.phone}</p>
                   <p>Sexe : {user.sexe}</p>
                   <p>birthday : {user.DateN}</p>
                   {user.Ville ||user.Pays?<p>Adr : {user.Pays},{user.Ville}</p>:""}
                   {user.Work?<p>Work : {user.Work}</p>:""}
                   {user.AcademicLevel?<p>AcademicLevel : {user.AcademicLevel}</p>:""}
                 </div>
                 }
                </div>

              </div>

            <div style={{padding:'20PX'}}>


              <div className="AllPostForUserProfile">
                    <div>
                    {onePost  ? onePost.map((e,i)=>{
                        return  <div key={i}>
                                   <StructurePost Fname={e.FirstName} Lname={e.LasteName} 
                                   imageUser={e.imageUser} imageComment={user.image} message={e.msg} id={e._id} imagePost={e.imagePost} li={e.Likes}
                                    VideoPost ={e.VideoPost}/>
                                </div>
                    }):<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'
                    }}>publiction Not exsit</div>}
                </div>
              </div>

            </div>
              </div>
           

        </div>
    )
}