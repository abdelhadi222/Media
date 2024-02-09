import { faCircle, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faBackward, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gitHup from "../Images/gitHup.jpg"
import Loding from "../page/Loding/Loding";
import { Windo } from "../Context/Windo";
import "../Media/Media.css"
import axios from "axios";
import { SocketContext } from "../Context/Socekt";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
    const nav = useNavigate()
    const [loding,setLoding]= useState(false)
    const [err,seTErr] =useState('')
  const [email,setEmail] = useState("")
  let s = useContext(SocketContext)
   const [password,setPassword] = useState("")
     window.localStorage.setItem('Theme',"white")
     let size = useContext(Windo)
   async function sup(e) {
          e.preventDefault() ;
          setLoding(true)
            try{
               const res = await axios.post('http://localhost:5500/api/Login',{
                  email:email,
                  password:password
               })
               console.log(res.data);
               if(res.data == 401 || res.data == "passwoed is wong" || res.data==10){
                 setLoding(false)
                 return seTErr(res.data)
                  
               }
               window.localStorage.setItem('token',res.data.token)
               window.localStorage.setItem('relode',true)
               s.setChangeSokt(p=>!p)
               window.location.pathname = "/dash/home"
              //  nav('/Dash/home')
            }catch(err){
                console.log("valdtion err is " , err);
            }
           setLoding(false)
         }
  return(
   
   <div className="container">
          <div className="All" style={{paddingTop:!loding ?"50px":"0px"}} >
      {loding && <Loding/>}
         <form className='login' onSubmit={sup} >
                <div className="hgg" style={{display:'flex',width:size.size > 950?'50%':'100%',flexDirection:'column',borderRadius:'8px',padding:'30px'}}>
                  <h1 style={{textAlign:'center',marginBottom:'20px'}}>Login</h1>
                  <FontAwesomeIcon icon={faCircleUser} style={{textAlign:'center',marginBottom:'10px',fontSize:'50px'}} />
                  <h4 style={{textAlign:'center',marginBottom:"20px"}}>welcome To Back </h4>


                   <div style={{marginLeft:'35px'}}>
                       <div className="input-group">
                             <input required type="email" name="text" autoComplete="off" value={email} className="input" id="inputOne" style={{width:'80%',border:email?' border:1px solid red':""}} 
                             onChange={(e)=>setEmail(e.target.value)} />
                             <label className="user-label">Email</label>
                 </div>

                 <div className="input-group">
                             <input required type="password" name="text" autoComplete="off" value={password} className="input" style={{width:'80%'}} 
                             onChange={(e)=>setPassword(e.target.value)} minLength='8' />
                             <label className="user-label">password</label>
                 </div>
                   </div>
                    

                     <div style={{display:'flex',justifyContent:'space-between',marginTop:'5Px',marginBottom:'25px'}}>
                      <Link style={{color:'black'}} to={"/Sing"}>Create Account</Link>
                      <Link  to={'/forget'} style={{color:'black'}} >Forget Passwowrd</Link>
                 </div>

   <button className="bbbb">
       <FontAwesomeIcon  style={{marginRight:'4px'}} icon={faPaperPlane} />  Login
    </button>
                

                 <div>
                    {/* <hr  style={{marginTop:'20px'}}/>
                    <span className="or">Or</span> 
                    <div style={{display:'flex'}}> */}
                                       
                   {/* <button  className="googel" title="Google" style={{display:'flex',gap:'23px',textDecoration:'none'}}>
                        <img  style={{width:'30px',height:'30px',marginTop:'-8px',marginLeft:"-8px"}} src="data:image/png;base64,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" width="30PX"  alt="" />
                        <p style={{alignSelf:'center'}}>login with google </p>
                   </button> */}
                     
                                       
                   {/* <button  className="gitHup" title="Git hup" style={{display:'flex',textDecoration:'none',gap:"7px"}}>
                        <img  style={{width:'50px',height:'30px',marginTop:'-8px',marginLeft:"-8px"}} src={gitHup} width="30PX"  alt="" />
                        <p style={{alignSelf:'center'}}>login with Git Hup </p>
                   </button> */}
                   {/* </div>   */}

                 </div>


                </div>


 <div className="two"  >
        {err == 401 ?<p style={{color:'red',position:"absolute",bottom:'10px',right:'10px',background:'black',padding:"5px",borderRadius:'10px'}}>Your Email is not Exsit</p>:""}
                    {err == "passwoed is wong" ?<p style={{color:'red',position:"absolute",bottom:'10px',right:'10px',background:'black',padding:"5px",borderRadius:'10px'}}>Your password is worng</p>:""}
                    {err == 10 ?<p style={{color:'red',position:"absolute",bottom:'10px',right:'10px',background:'black',padding:"10px",borderRadius:'5px'}}>check you Email Box for confirmation  your Email</p>:""}
    </div>
                
                          
         </form>
    </div>
   </div>
  )
}