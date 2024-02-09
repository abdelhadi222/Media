import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Problames() {
    const [problems,setProblems] = useState('')
    let nav = useNavigate()
    async function sup(e) {
         e.preventDefault() ;
        if(problems==''){
            return
        }
        try {
            const res = await axios.post('http://localhost:5500/api/AddProblems',{Problems:problems},
            {headers:{token:window.localStorage.getItem('token')}})
            console.log(res);
            nav('/dash/settings')
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div>
              <div className="dic">
                 <h1 style={{marginTop:'60px',textAlign:'center'}}>Single Problems</h1>
                 <form action="" className="FormFromUpd" onSubmit={sup} >

                             
 
                      <div className="Problames">
                        <textarea  value={problems} placeholder="Wirte Here..." 
                        onChange={(e)=>setProblems(e.target.value)}></textarea>
                    </div>

                    <input type="submit" className="BFromUpd" />
                 </form>


             </div>
        </div>
        </div>
    )
}