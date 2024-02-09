import axios from "axios"
import { useState } from "react"
import {useNavigate} from "react-router-dom"

export default function AddPassword() {
    const nav = useNavigate()
        const [password,setPassword] = useState('')
        const [err,setErr] =useState('')
    const [confirmationPassword,setConfirmationPassword] = useState('')
          const [acc,setAcc] = useState(false)
          const emailTk =  window.location.pathname.replace('/AddPassword/','')
    async function UpdatePassword() {
        setAcc(true)
        if(password.length < 9){
          return
        }
        if(password != confirmationPassword ) return
        try {
             const res  = await axios.post(`http://localhost:5500/api/AddPassword/${emailTk}`,{password:password,con:confirmationPassword})
             window.localStorage.setItem('token',res.data.token)
             console.log(res.data);
             if(res.data == "Can You Send The Null Value"){
                return  setErr(res.data)
             }
             if(res.data.message == "Done"){
                nav('/dash')
             }
        } catch (err) {
            console.log('validation err is ' , err);
        }
        
    }
    return(
      <div style={{display:'flex',justifyContent:'center',paddingTop:"230px",background:'  rgb(229, 229, 229)'}}>
        
          <div style={{width:'40%',height:'fit-content',padding:'10px',borderRadius:'20px',background:'rgb(210, 248, 248)'}}>
            <h2 style={{marginBottom:'20px',textAlign:"center"}}>Add New Paswword</h2>
             <div style={{display:'flex',flexDirection:'column',marginBottom:'20px'}}>
                <label htmlFor="i1">New Password</label>
                <input  style={{borderRadius:'8px',border:'none',padding:'6px'}}  id='i1' required  minLength='9' type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
             </div>
              <div style={{display:'flex',flexDirection:'column',marginBottom:'20px'}}>
                <label htmlFor="i2">Confirmation New Password</label>
                <input  style={{borderRadius:'8px',border:'none',padding:'6px'}} id='i2' required minLength='9' type="password" value={confirmationPassword} onChange={(e)=>setConfirmationPassword(e.target.value)} />
             </div>
              {password.length < 9 && acc && <p style={{width:"90%",color:'rgb(116, 2, 2)',padding:'10px',marginBottom:'10px',background:'rgb(249, 188, 188)',borderRadius:'6px'}}>You password is very fabile</p>}
             {password != confirmationPassword  && acc && <p style={{width:"90%",color:'rgb(116, 2, 2)',padding:'10px',marginBottom:'10px',background:'rgb(249, 188, 188)',borderRadius:'6px'}}>You password his not maching</p>}
             {err=="Can You Send The Null Value" && <p style={{width:"90%",color:'rgb(116, 2, 2)',padding:'10px',marginBottom:'10px',background:'rgb(249, 188, 188)',borderRadius:'6px'}}>{err}</p>}
           <input style={{marginLeft:'220Px',padding:'8px',borderRadius:'5px',color:'white',background:'rgb(16, 143, 222)'}} type="submit" onClick={UpdatePassword}/>
        </div>
      </div>

    

      
    )
}