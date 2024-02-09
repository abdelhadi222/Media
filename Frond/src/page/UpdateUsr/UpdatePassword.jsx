import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {

    const [oldPassword,setOldPassword] = useState("")
    const [newpassword,setNewPassword] = useState("")
    const [er,setEr] = useState('')
    const [acc,setAcc] = useState(false)
    const [confirmPassword,setConfirmPassword] = useState("")
    let nav = useNavigate()
  async  function sup(e) {
    if(oldPassword=='' || newpassword=='' || confirmPassword=='') {
        return
    }
          e.preventDefault() ;
          setAcc(true)
          try{
               const res = await axios.post('http://localhost:5500/api/UpdatePassword',{
                   oldPassword:oldPassword,
                   newpassword:newpassword,
                   confirmPassword:confirmPassword
               },{headers:{token:window.localStorage.getItem('token')}})
               console.log('data',res.data);
               if(res.data == "Password Old Is Not true"){
                 return setEr(res.data)
               }
               nav('/dash/settings')

            }catch(err){
                console.log("valdtion err is " , err);
            }
    }
    return(
        <div>
              <div className="dic">
                 <h1 style={{marginTop:'60px',textAlign:'center'}}>Account Settings</h1>
                 <form action="" className="FormFromUpd" onSubmit={sup}>
     
                       <div><input type="password" value={oldPassword}  onChange={(e)=>setOldPassword(e.target.value)} placeholder="Old Password"/></div>
                       <div><input type="password" value={newpassword}   onChange={(e)=>setNewPassword(e.target.value)} placeholder="New Password"/></div>
                

                      <div>
                        <input type="password" className="FromUpd" name="confirmPassword" value={confirmPassword} placeholder="Confirmation With Password" 
                        onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>

                    <input type="submit" className="BFromUpd" />
                    {er=="Password Old Is Not true"&&<p className="err">Old Password Is False</p>}
                    {newpassword!=confirmPassword &&  acc ?<p className="err">Old Password And Confirmation Passwor Is Not Matchong</p>:""}
                    {newpassword.length < 9 &&  acc ?<p className="err"> Password Fabile </p>:""}
                 </form>


             </div>
        </div>
    )
}