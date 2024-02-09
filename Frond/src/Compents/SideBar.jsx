import {  NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faRightFromBracket,faHouseUser, faMessage, faStore, faUser, faGear,faUsers,faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SocketContext } from "../Context/Socekt.jsx";
import  {Windo} from "../Context/Windo";
import { useContext } from 'react';
import { Meun } from "../Context/Meun";
import logo from "../images/popo.jfif"
import { useEffect, useState } from "react";


import {Save} from "../Context/Save.jsx"

export default function SideBar() {
   const [user,setUser] = useState('')
    const nav = useNavigate()


   let size = useContext(Windo)
  console.log("soze =>" , size.size);

     let Meunn = useContext(Meun)
     let isOpen = Meunn.isopen



     let s = useContext(SocketContext)

     let save = useContext(Save)





       useEffect(()=>{
           GetUser()
    },[])
 
    async function GetUser() {
        try {
            const res= await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})

             setUser(res.data.user)
           
        } catch (err) {
             console.log('err is' , err);
        }
    }

   

 async function logOut() {
   try {
    console.log('222');
    const res = await axios.get('http://localhost:5500/api/LogOut',{headers:{token:window.localStorage.getItem('token')}})
    window.localStorage.removeItem('token') 
     console.log('2220');
    window.localStorage.removeItem('num')
    window.localStorage.setItem('relode',false)
    console.log('Log og lOG l');
    Meunn.setIsopen(p=>!p)
    s.setChangeSokt(p=>!p)
    window.location.pathname = '/'

   } catch (err) {
     console.log("validtion err is ",err);
   }

  }
    


   if(size.size < 1000) {
     document.querySelectorAll('.divNav').forEach((e)=>{
        e.classList.remove('nnn')
     })
   }else{
      document.querySelectorAll('.divNav').forEach((e)=>{
        e.classList.add('nnn')
        e.classList.add('op')
        

     })
   }


    return(
        <div className="Side" style={{width:size.size > 1000?'17%':'40px'}} >
            {size.size > 1000 ? <h2 style={{textAlign:'center',paddingTop:'20px',marginBottom:'30px'}}><span style={{color:'blueviolet'}}>Socila</span>Media</h2>
:<img src={logo} style={{width:'30px',height:'30px',borderRadius:'30px',margin:'5px',marginLeft:size.size > 1000?'0':'-7px'}}/>  }

             <div className="divNav nnn">
               <NavLink to={'Home'} className="Nav"> <FontAwesomeIcon icon={faHouseUser} style={{marginRight:'6px'}} /> {size.size > 1000 ?"Home":""}</NavLink>
             </div>

             <div className="divNav nnn">
               <NavLink to={'profile'} className="Nav" > <FontAwesomeIcon icon={faUser} style={{marginRight:'6px'}} />  {size.size > 1000 ?"Profile":""}</NavLink>
             </div>

               <div className="divNav nnn">
               <NavLink to={'/dash/Message'}  className="Nav" > <FontAwesomeIcon icon={faMessage}  style={{marginRight:'6px'}} /> {size.size > 1000 ?"Messanger":""} </NavLink>
             </div>

            <div className="divNav nnn" >
               <NavLink to={'Saved'} className="Nav" > <FontAwesomeIcon icon={faBookmark} style={{marginRight:'6px'}} /> {size.size > 1000 ?"Save":""}</NavLink>
             </div>

            <div className="divNav nnn ">
               <NavLink to={'market'} className="Nav"> <FontAwesomeIcon icon={faStore} style={{marginRight:'6px'}} /> {size.size > 1000 ?"Market Place":""}</NavLink>
             </div>

              <div className="divNav nnn ">
                <NavLink to={'Settings'} className="Nav"> <FontAwesomeIcon icon={faGear} style={{marginRight:'6px'}} /> {size.size > 1000?"Settings":""}</NavLink>
             </div>
               
             {user.isAdmin ? 
                  <div className="divNav nnn ">
               <NavLink to={'AllUsers'} className="Nav"> <FontAwesomeIcon icon={faUsers} style={{marginRight:'6px'}} /> {size.size > 1000?" Admin":""} </NavLink>
             </div>:''
             }


              

             <div className="buInSide" onClick={logOut}>
                <button >{size.size > 1000?'LogOut':''}<FontAwesomeIcon className="anii" icon={faRightFromBracket} style={{marginLeft:size.size > 1000?'20px':'0'}} /></button>
             </div>


            
        </div>
    )
}