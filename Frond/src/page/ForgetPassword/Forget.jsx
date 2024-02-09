import { useState } from "react";
import "../ForgetPassword/Forget.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck , faXmark} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
export default function Forget() {
    const [email,setEmail] = useState('')
    const [data,setdata] = useState('')
    console.log(email);
    async function getFromBack() {
        try {
            const res = await axios.post('http://localhost:5500/api/Forget',{email:email})
            console.log(res.data);
            setdata(res.data);
        } catch (err) {
            console.log('validation err is ' ,err);
        }
    }
    return(
        <div>
                <div className="par">
                    <div className="div">
                       <h2>Enter Your Email : </h2>
                       <input type="email" style={{marginBottom:'10px'}} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                           {data==20&&<p style={{width:"90%",color:'rgb(0, 78, 0)',padding:'10px',marginBottom:'10px',background:'rgb(166, 211, 166)',borderRadius:'10px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color: "#23ca02",marginRight:'5px'}}/>Verfiy Your Box Email</p>}
                            {data==404&&<p style={{width:"90%",color:'rgb(116, 2, 2)',padding:'10px',marginBottom:'10px',background:'rgb(249, 188, 188)',borderRadius:'10px'}}><FontAwesomeIcon icon={faXmark} style={{color:'red',marginRight:'5px'}} />User Not Exist</p>}
                       <button  onClick={getFromBack} >Confirmation</button>
                  </div>
                </div>
        </div>
    )
}
