import "../Profile/Profile.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCamera,faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Save } from "../../Context/Save";
import AddPost from "../../Compents/Post/AddPost";
import axios from "axios";
import StructurePost from "../../Compents/Post/StructurePost";
import Loding from "../Loding/Loding"
import { Link } from "react-router-dom";
import {Windo} from "../../Context/Windo";
// import { ChatContext } from "../../Context/Socekt";


export default function Profile() {
    const [user,setUser] = useState('')
    const [onePost,setOnePost] = useState('')
    const [imageCov,setImageCov] = useState('')
    const [loding,setLoding] = useState(false)
    const [imageUser,setImageUser] = useState('')
     const [show,setShow] = useState(false)
      const [add,setAdd] = useState(true)
      const [pays,setPays] = useState()
      const [ville,setVille] = useState()
      const [work,setWork] = useState()
         const [userFr,setUserFr] = useState([])
      const [academicLevel,setAcademicLevel] = useState()
      let size = useContext(Windo)
      // const [form,setForm] = useState({
      //   Pays:'',
      //   Ville:'',
      //   Work:'',
      //   AcademicLevel:''
      // })

     
      const sonta  = useContext(Save)
        const sss = sonta.sss
       
      
    
    useEffect(()=>{
      GetUser()
      GetPostForOne()
    },[show,sss])
   
        async function GetUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
             setUser(res.data.user);
             setUserFr(res.data.infoUserFrind)

               setPays(user.Pays)
               setVille(user.Ville)
               setWork(user.Work)
               setAcademicLevel(user.AcademicLevel)
        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }

      

     async function GetPostForOne() {
         try {
            const res = await axios.post('http://localhost:5500/api/PostForOneUser',
            {token:window.localStorage.getItem('token')})
            setOnePost((res.data.PostUser).reverse());
            setLoding(true)
       
         } catch (err) {
           console.log(err); 
         }
     }

     if(imageCov != ''){
        sendImageCover()
     }

      async function sendImageCover() {
        const data = new FormData()
        data.append('imageCov',imageCov)
        try {
            const res = await axios.post('http://localhost:5500/api/UpdateImageCove',data,
            {headers:{token:window.localStorage.getItem('token')}})
            console.log(res);
             window.location.reload()
            // setTest(false)
          
        } catch (err) {
         console.log(err);   
        }
      }
       if(imageUser != ''){
          sendImageUser()
       }
      async function sendImageUser() {
        const data = new FormData()
        data.append('imageProfile',imageUser)
        setAdd(false)
        try {
            const res = await axios.post('http://localhost:5500/api/UpdateImageUser',data,
            {headers:{token:window.localStorage.getItem('token')}})
            console.log(res);
            // setTest(false)
            window.location.reload()
       
        } catch (err) {
         console.log(err);   
        }
      }
        
console.log(add);
      async function AddInfo() {
        document.querySelector('.Profile').classList.add("P")
        setShow(true)

      }

      function Annule() {
        setShow(p=>!p)
        document.querySelector('.Profile').classList.remove("P")
      }

     

     async function sup(e) {
          e.preventDefault() ;
          
          try {
            const res = await axios.post('http://localhost:5500/api/AddSomeInformation',{
              
            Pays:pays,
            AcademicLevel:academicLevel,
            Work:work,
            Ville:ville
            },
            {headers:{token:window.localStorage.getItem('token')}})
            console.log(res);
            Annule()
          } catch (err) {
            console.log();
          }
      }
    return(
      <div >
        <div className="Profile ">
            {!loding ? <Loding/>:''}
            {
              show?
              <div style={{width:"50%",height:'fit-content',background:'white',zIndex:'105',position:"fixed",left:'30%',top:'30%',borderRadius:'20px'}}>
              <div style={{display:'flex',justifyContent:'end'}}>
                 <div style={{display:'flex',justifyContent:'center',alignItems:"center",width:'30px',height:'30px',background:"red"}} onClick={Annule}> <FontAwesomeIcon icon={faXmark} style={{textAlign:'right'}} /></div>
              </div>
               <h2 style={{textAlign:'center'}}>Add Some Information </h2>
              <form onSubmit={sup} className="FromFromAddInformation">
                <div >
                   <label>Pays</label>
                   <input type="text"  value={pays} name="Pays" onChange={(e)=>setPays(e.target.value)}/>
                </div>


                <div  >
                    <label>Ville</label>
                   <input type="text" value={ville}  name="Ville" onChange={(e)=>setVille(e.target.value)}/>
                </div>

                <div >
                    <label>Academic Level</label>
                   <input type="text" value={academicLevel} name="AcademicLevel" onChange={(e)=>setAcademicLevel(e.target.value)} />
                </div>

                <div >
                   <label>Work</label>
                   <input type="text" value={work} name="Work" onChange={(e)=>setWork(e.target.value)}  />
                </div>
                   <input type="submit" value="Send" style={{marginBottom:'20px',height:'30px',width:"100%",border:'none',background:"rgb(0, 132, 255)",color:'white'}}/>
              </form>

              </div>
              :''
            }
              
              <div className="pto">
                <div className="BACKGROUND" style={{backgroundImage:`url(http://localhost:5500/${user.ImageCov})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center center'}}>
                {size.size > 880 ?<div className="editFromProfile">
                    <input type="file" className="fileFromProfileOne" value={''} 
                    onChange={(e)=>setImageCov(e.target.files[0])}/>
                    <p style={{marginTop:'-20PX'}}><FontAwesomeIcon icon={faCamera} style={{color:'white',marginRight:'6px'}} size="lg" />Edit Covre Photo</p>
                </div>:
                  <div className="editFromProfileMedia">
                    <input type="file" className="fileFromProfileOne" value={''} 
                    onChange={(e)=>setImageCov(e.target.files[0])}/>
                    <p style={{marginTop:'-20PX'}}><FontAwesomeIcon icon={faCamera} style={{color:'white',marginRight:'6px'}} size="lg" />Edit</p>
                </div>
                }
             </div>
             <div className="imageUser">
                <img src={`http://localhost:5500/${user.image}`} style={{width:'100%',height:'100%',borderRadius:'50%'}}/>
                <div className="ChangeImage"><FontAwesomeIcon icon={faCamera} style={{color:'white'}} size="lg" /></div>
               <input type="file" className="fileFromProfile" value={''}
               onChange={(e)=> setImageUser(e.target.files[0])} />
             </div> 
            
             <div className="text">
                 <h2 style={{marginLeft:size.size<880 ?'50Px':'0'}}>{user.FirstName} {user.LasteName}</h2>
             </div>
              
              <div className="aboutUser">
                <div>
                    <h3>All Frindes User</h3>
                    <div style={{display:'flex',gap:'20px',marginTop:'10Px'}}>
                       {
                      userFr && userFr.map((e,i)=>{
                         return <Link to={`/dash/profile/ShowProfile/${e.numAccount}`} key={i} style={{display:'flex', gap:'10px',flexWrap:"wrap"}}>
                               <img src={`http://localhost:5500/${e.image}`} style={{width:"90px",height:"90px",borderRadius:'50%'}} alt="" />
                         </Link>  
                      })
                    }
                    </div>
                </div>
                <div>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                       <h3>Information for User:</h3>
                       <div className="AddInfo" style={{marginRight:size.size<880?"5px":'0'}} onClick={AddInfo}><FontAwesomeIcon icon={faPlus} />{size.size<880 ?'':'Add Information'}</div>
                   </div>
                 <div className="info">
                   <p>Email : {user.email}</p>
                   <p>Phone : {user.phone}</p>
                   <p>Sexe : {user.sexe}</p>
                   <p>birthday : {user.DateN}</p>
                   {user.Ville ||user.Pays?<p>Adr : {user.Pays},{user.Ville}</p>:""}
                   {user.Work?<p>Work : {user.Work}</p>:""}
                   {user.AcademicLevel?<p>AcademicLevel : {user.AcademicLevel}</p>:""}
                 </div>
                </div>

              </div>

            <div style={{padding:'20PX'}}>
                  <AddPost />

              <div className="AllPostForUserProfile">
                    <div>
                    {onePost.length > 0 ? onePost.map((e,i)=>{
                        return  <div key={i}>
                                   <StructurePost Fname={e.FirstName} Lname={e.LasteName}  idUser={user._id}
                                   imageUser={e.imageUser} imageComment={user.image} message={e.msg} id={e._id} imagePost={e.imagePost} li={e.Likes}  saved={e.IsSave}  VideoPost ={e.VideoPost}/>
                                </div>
                    }):<div  className="hg1" style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'
                    }}>publiction Not exsit</div>}
                </div>
              </div>

            </div>

              </div>
         

        </div>
        
        </div>
    )
}