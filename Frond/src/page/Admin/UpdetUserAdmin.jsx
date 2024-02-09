import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Save} from "../../Context/Save"
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function UpdetUserAdmin() {
    const key = window.location.href.replace('http://localhost:5173/dash/AllUsers/','')
    useEffect(()=>{
         getUser()
    },[])

      let conta   =  useContext(Save)
      const [imageUser,setImageUser] = useState('')
       const [imageCoprisir,setImageCoprisi] = useState('')
      const [admin,setAdmin] = useState('')
       

       async function getUser() {

           try {
            const res = await  axios.post(`http://localhost:5500/api/FindUsersByIdNew`,{idUesr:key})
            // console.log('from Chat User =>>>=>>>',res.data);
             console.log('rrttyy =>' , res);
             let r = res.data.User.isAdmin
             console.log('eeeee =>' , r);
             setAdmin(r?"Admin":"User")
             setImageUser(res.data.User.image)
        } catch (err) {
            console.log(err);
        }
        
     }
     console.log('ima',imageUser);

      const imageOnChange = (e) => {
      setImageUser(e.target.files[0])
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = (ev) => {
            return setImageCoprisi(ev.target.result);
        };
    };

   let nav = useNavigate()
    async function sup(e) {
          e.preventDefault() ;

          console.log("ass=> ",admin);
          let data = new FormData()
          data.append('NewImage',imageUser)
          data.append('role',admin)
          data.append('idUser',key)
            try{
               const res = await axios.post('http://localhost:5500/api/UpdtByAdmin',data)
               console.log(res);
               conta.setSss(p=>!p)
               nav("/dash/AllUsers/")
            }catch(err){
                console.log("valdtion err is " , err);
            }
         }


         


      

    return(
        <div style={{marginTop:'110px'}}>
             {/* <input type="text" value={admin?"Admin":'User'} /> */}
             <h2 style={{textAlign:'center',margin:'20px'}}>Update By Admin </h2>

                    <form action="" className="FormFromUpd" onSubmit={sup}>
     
                       <div>
                            <div style={{textAlign:'center'}}>
                                {imageCoprisir ?<img src={imageCoprisir}  style={{width:'50px',height:"50px",borderRadius:'50%'}} alt="" />:
                                <img src={`http://localhost:5500/${imageUser}`}  style={{width:'50px',height:"50px",borderRadius:'50%'}} alt="" />}
                               {/* <img src={`http://localhost:5500/${imageUser}`}  style={{width:'50px',height:"50px",borderRadius:'50%'}} alt="" /> */}
                            </div>

                           <div className="UpdateImageAdmin">
                            <div className="desinge">
                                
                                <input type="file" className="fiaz" onChange={imageOnChange} name="NewImage" />
                            </div>
                             
                           </div>

                       </div>


                    
                           
                    <div className="dddA">
                        <select name="" id="" value={admin}   onChange={(e)=>setAdmin(e.target.value)}>
                           <option   disabled  >Select Role</option>
                           <option value="Admin">Admin</option>
                           <option value="User">User</option>
                        </select>
                     </div>

                          
                       

                        <input type="submit" className="BFromUpd" />
          
                     </form>

        </div>
    )
}