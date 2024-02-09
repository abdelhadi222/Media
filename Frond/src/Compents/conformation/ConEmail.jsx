import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";
export default function ConEmail() {
     const emailTk = window.location.pathname.replace('/confirm/','')
    useEffect(()=>{
        getUser()
    },[])
    const getUser = async ()=>{
        try{
          const res= await axios.post(`http://localhost:5500/api/confirm/${emailTk}`)
          console.log('?' , res.data.token);
          window.localStorage.setItem('token',res.data.token)
          window.localStorage.setItem('relode',true)
        
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div style={{paddingTop:'20px',paddingLeft:'500Px',width:'100%',background:'  rgb(229, 229, 229)'}}>
             <p style={{width:"35%",marginBottom:'10px',padding:'15px',background:'rgb(166, 211, 166)',borderRadius:'10px'}}> <FontAwesomeIcon icon={faCircleCheck} style={{color: "#23ca02",marginRight:'5px'}} />Your Email Is Verfiy  <Link to={"/dash/home"} style={{paddingTop:'20px',height:'30px',marginTop:"9px",textDecoration:'none',color:'white',background:' rgb(0, 146, 15)',marginLeft:'30PX',padding:'4px',borderRadius:'4px'}}
             >Oky</Link></p>
        </div>
    )
}