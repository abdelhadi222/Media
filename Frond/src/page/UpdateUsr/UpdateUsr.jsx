import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../UpdateUsr/UpdateUsr.css"
import PhoneInput from 'react-phone-input-2'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import {Save} from "../../Context/Save"

export default function UpdateUsr() {
    const [user,setUser] = useState('')
     const [firstName,setFirstName] = useState('')
      const [lasteName,setLasteName] = useState('') 
      const [email,setEmail] = useState('')
       const [dateN,setDateN] = useState('')
            const [er,setEr] = useState('')
        const [confirmPassword,setConfirmPassword] = useState('')
        // const nav=useNavigate()
           const conta = useContext(Save);
  
    useEffect(()=>{
        GetUser()
    },[])
    async function GetUser() {
      
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
             setUser(res.data.user);
             console.log(res.data.user.FirstName);
             setFirstName(res.data.user.FirstName)
             setLasteName(res.data.user.LasteName)
             setEmail(res.data.user.email)
             setDateN(res.data.user.DateN)
             

        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }
     console.log(firstName);
     console.log(user);

    
        async function sup(e) {
              if(lasteName  =="" || email=="" || dateN=='' || confirmPassword=='' || firstName==''){
            return
        }
            e.preventDefault() ;
            try{
               const res = await axios.post('http://localhost:5500/api/Update',{
               FirstName:firstName,
               LasteName:lasteName,
               email:email,
               DateN:dateN,
               confirmPassword:confirmPassword

               },
                {headers:{token:window.localStorage.getItem('token')}}
               )
               console.log('data',res);
               if(res.data == "passwoed is wong") {
                  return setEr(res.data)
               }
               conta.setTt(p=>!p)
               window.history.back()
                
            }catch(err){
                console.log("valdtion err is " , err);
            }
         }
    return(
        <div>
             <div className="dic">
                 <h1 style={{marginTop:'60px',textAlign:'center'}}>Account Settings</h1>
                 <form action="" className="FormFromUpd" onSubmit={sup}>
                    <div>
                       <div><input type="text" value={firstName} name='FirstName' onChange={(e)=>setFirstName(e.target.value)}/></div>
                       <div><input type="text" value={lasteName}  name='LasteName' onChange={(e)=>setLasteName(e.target.value)}/></div>
                    </div>
                    
                    <div>
                        <input type="date" className="FromUpd"  name='DateN' value={dateN} onChange={(e)=>setDateN(e.target.value)} />
                    </div>


                      <div>
                        <input type="email" className="FromUpd" name="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>


                      <div>
                        <input type="password" className="FromUpd" name="confirmPassword" value={confirmPassword} placeholder="Confirmation With Password" 
                        onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>

                    <input type="submit" className="BFromUpd" />
                    {er=='passwoed is wong'?<p className="err">Password Is Worgn</p>:<p></p>}

                 </form>


             </div>
        </div>
    )
}