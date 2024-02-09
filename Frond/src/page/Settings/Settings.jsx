import "../Settings/Settings.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faGear,faPenToSquare,faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import{ SocketContext} from "../../Context/Socekt"
import { useContext, useEffect, useState } from "react";
export default function Settings() {
    const [online,setOnline] = useState(true)
    const [show,setShow] = useState(false)
    const [user,setUser] = useState('')
    const nav = useNavigate()
     let sock = useContext(SocketContext)

     
          useEffect(()=>{
            GetUser()
         },[])
        async function GetUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
            //  setUser(res.data.user);
            console.log(res.data.user);
             setUser(res.data.user);
        
            //  console.log(res.data.user._id);
             
            
            //  console.log('User =>',res.data.user);
        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }





    async function NotOnline() {

      let t = sock.onlineUsers.some((e)=> e.UserId == user._id)

      if(t) {
         let r = sock.onlineUsers.filter((el)=>el.UserId != user._id)
         sock.setOnlineUsers(r)
         sock.setChangeSokt(p=>!p)
         setOnline(p=>!p)
      }
      else{
         sock.setOnlineUsers(p=> [...p,user._id])
         sock.setChangeSokt(p=>!p)
         setOnline(p=>!p)
      }
      
    }
    //  async function Online() {
        
    //     // try {
    //     //      const res = await axios.get('http://localhost:5500/api/Online',{headers:{token:window.localStorage.getItem('token')}})
    //     //      console.log(res);
    //     // } catch (err) {
    //     //     console.log(err);
    //     // }
       
    //     sock.setOnlineUsers(p=>[...p,{UserId:user._id}])
    //     setOnline(true)
    // }

   
    // let socket = sock.socket

    function fun(){
       document.querySelector('.ALLfromSettings').classList.add('PA')
       setShow(true)
    }

    function No() {
         document.querySelector('.ALLfromSettings').classList.remove('PA')
       setShow(false) 
    }
   async function yes(){
        try {
          const res = await axios.get('http://localhost:5500/api/deletAccount',
          {headers:{token:window.localStorage.getItem('token')}})
          console.log(res);
          window.localStorage.setItem('NumberDe',
          window.localStorage.getItem('NumberDe')? parseInt(window.localStorage.getItem('NumberDe')) + parseInt(1):parseInt(1))
          nav('/')

        } catch (err) {
          console.log(err);
        }
    }
    return(
      <div className="container">
        <div className="ALLfromSettings">
            <h1 style={{textAlign:'center'}}><FontAwesomeIcon icon={faGear} className="IcoFromSettings" style={{marginRight:'10px'}} />  Settings</h1>
            {/* <div  onClick={NotOnline} style={{display:'flex',justifyContent:'space-between',marginTop:"20px",marginBottom:'20px'}}>
                 <div><p>Hide That You Online</p></div> 
 <div>
    <label className="switch">
  <input  type="checkbox" />
  <div className="slider">
    <div className="circle">
      <svg className="cross" xmlSpace="preserve" style={{enableBackground: 'new 0 0 512 512'}} viewBox="0 0 365.696 365.696" y={0} x={0} height={6} width={6} xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path data-original="#000000" fill="currentColor" d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0" />
        </g>
      </svg>
      <svg className="checkmark" xmlSpace="preserve" style={{enableBackground: 'new 0 0 512 512'}} viewBox="0 0 24 24" y={0} x={0} height={10} width={10} xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path className data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
        </g>
      </svg>
    </div>
  </div>
</label>
</div> 
            </div> */}


          <Link to={"Update"} style={{textDecoration:"none",color:'black'}}>
               <div style={{display:'flex',justifyContent:'space-between',marginTop:"20px",marginBottom:'20px'}}>
                 <p>Update Your Information</p>
                 <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{cursor:'pointer',color:'green'}} />
            </div>
          </Link>


         
            {show?
             <div className="Delet">
              <h4 style={{marginTop:'20px',marginBottom:'20px'}}>Are You Shour To Want Delet Your Account</h4>
              <div className="df">
                  <button onClick={yes}>Yes</button>
                  <button onClick={No}>No</button>
              </div>
              </div>
            :""}

            
             


                {/* <div style={{display:'flex',justifyContent:'space-between',marginTop:"20px",marginBottom:'20px'}}>
                 <p>Disable Notifcation</p>
                     <label className="switch">
  <input  type="checkbox" />
  <div className="slider">
    <div className="circle">
      <svg className="cross" xmlSpace="preserve" style={{enableBackground: 'new 0 0 512 512'}} viewBox="0 0 365.696 365.696" y={0} x={0} height={6} width={6} xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path data-original="#000000" fill="currentColor" d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0" />
        </g>
      </svg>
      <svg className="checkmark" xmlSpace="preserve" style={{enableBackground: 'new 0 0 512 512'}} viewBox="0 0 24 24" y={0} x={0} height={10} width={10} xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path className data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
        </g>
      </svg>
    </div>
  </div>
</label>
            </div> */}


          <Link to={"UpdatePassword"} style={{textDecoration:"none",color:'black'}}>
               <div style={{display:'flex',justifyContent:'space-between',marginTop:"20px",marginBottom:'20px'}}>
                 <p>Update Password Or Phone</p>
                 <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{cursor:'pointer',color:'green'}} />
               </div>
          </Link>




            <Link to={'SingleProblames'} style={{textDecoration:"none",color:'black',display:'flex',justifyContent:'space-between',marginTop:"20px",marginBottom:'20px'}}>
                 <p>Single a Problem</p>
                 <FontAwesomeIcon icon={faTriangleExclamation} size="xl" style={{cursor:'pointer',color:'red'}} />
            </Link>

            <div onClick={fun} style={{display:'flex',justifyContent:'space-between',marginTop:"20px",marginBottom:'20px'}}>
                 <p>Delet Your Accoount</p>
                 <FontAwesomeIcon icon={faBan} size="xl" style={{cursor:'pointer',color:'red'}} />
            </div>


            

        </div>
        </div>
    )
}