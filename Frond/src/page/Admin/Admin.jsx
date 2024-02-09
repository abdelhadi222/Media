import { useEffect, useState } from "react";
import "../Admin/Admin.css"
import axios from "axios"
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus,faPenToSquare,faEye} from "@fortawesome/free-solid-svg-icons";
import { SocketContext } from "../../Context/Socekt";
// import Problems from "../../../../Back/Model/Problems";
// import { rejects } from "assert";
export default function Admin() {

    const [allProblems,setProblems] = useState([])
    const [allUserPro,setAllUserPro] = useState([])
        const [allPro,setAllPro] = useState([])
    const [relode,setRelode] = useState(false)
    useEffect(()=>{
       getProblems()
       GetAllUsers()
       GetAllPro()
    },[relode])

    // Sockte => 
    const CSocket = useContext(SocketContext)
  


   async function getProblems() {
        try {
            const res = await axios.post('http://localhost:5500/api/getAllProblems')
            setProblems(res.data.Problems);
            setAllUserPro(res.data.UserPro)
        } catch (err) {
            console.log(err);
        }
    }

         const [allUsers,setAllUsers] = useState([])
       async function GetAllUsers() {
          try {
            const res = await axios.get('http://localhost:5500/api/AllUsers')
             setAllUsers(res.data.Users);
   
        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }



    async function deletOneProBlem(ida) {
        try {
            const res = await axios.post(`http://localhost:5500/api/deletOneProblem`,{idProblem:ida})
             console.log(res);
             setRelode(p=>!p)
        } catch (err) {
            console.log(err);
        }
        
     }


      async function deletAllProBlem() {
        try {
            const res = await axios.post(`http://localhost:5500/api/deletAllProblem`)
             console.log(res);
             setRelode(p=>!p)
        } catch (err) {
            console.log(err);
        }
        
     }

       async function deletOne(ida) {
            try{
               const res = await axios.post('http://localhost:5500/api/deletOneUserByAdmin',{idUser:ida})
               console.log(res);
               setRelode(p=>!p)
            }catch(err){
                console.log("valdtion err is " , err);
            }
         }




async function GetAllPro() {
  try {
     const res = await axios.get('http://localhost:5500/api/getAllPro')
     console.log("All Pro",res.data.AllPro);
     setAllPro(res.data.AllPro)
  } catch (err) {
    console.log(err);
  }
}



async function delatOnePro(idP) {
  try {
     const res = await axios.post('http://localhost:5500/api/delatOnePro',{idPro:idP})
     console.log(res);
     setRelode(p=>!p)
  } catch (err) {
    console.log(err);
  }
}
  



    return(
        <div className="Admin">
             <h1 >Welcome Admin </h1>
         


             <div className="he">
                 <div className="he2">
                    <h2>Number Of Users</h2>
                    <h3>{allUsers.length}</h3>
                 </div>

                 <div className="he2">
                    <h2> Users Online Now </h2>
                    <h3>{CSocket.onlineUsers.length}</h3>
                 </div>

                 <div className="he2">
                     <h2> Users delet Account </h2>
                     <h3>{ window.localStorage.getItem('NumberDe')?parseInt(window.localStorage.getItem('NumberDe')):0}</h3>
                 </div>

                  <div className="he2">
                     <h2> Number Problems </h2>
                     <h3>{allProblems.length}</h3>
                 </div>

             </div>


             <div className="problems">
                 <div className="TITEL"><h2>Problemse User </h2></div>
                     {allProblems.length > 0 && allUserPro.length >0 &&<button onClick={deletAllProBlem} className="buDeletALLpro">delet All Problems </button>}
                 {allProblems.length > 0 && allUserPro.length >0?allProblems.map((e,i)=>{
                     return  <div key={i} className="BoxOfShowProblems">
                         <div style={{display:'flex',gap:'10px'}}>
                             <img src={`http://localhost:5500/${allUserPro[i]?.image}`} style={{width:'50px',height:"50px",borderRadius:'50%'}} alt="" />
                             <div style={{width:'100%'}}>
                                <h5 style={{marginBottom:'5px'}}>{allUserPro[i]?.FirstName} {allUserPro[i]?.LasteName}</h5>
                                <p style={{width:"100%"}}>{e.Problems}</p>
                             </div>
                         </div>
                         
                         <FontAwesomeIcon icon={faCircleMinus} onClick={()=>deletOneProBlem(e._id)}  style={{color:'red'}}/>
                     </div>
                 }):<p style={{margin:'0 auto '}} className="notpRO">Problems Not Exsit </p>}
             </div>




             <div className="allUsersss">
             <h2 style={{margin:'20px 0'}}>All Users </h2>

               <table>
                     <thead>
                        <tr>
                          <th>Image User</th>
                          <th>Name User</th>
                          <th>Role User</th>
                          <th>Action</th>
                        </tr>
                     </thead>

                     <tbody>
                         
                            {allUsers.length > 0 && allUsers.map((e,i)=>{
                             return  <tr key={i}>
                                  <td> <img src={`http://localhost:5500/${e.image}`} style={{width:'50px',height:"50px",borderRadius:'50%'}} alt="" /></td>
                                  <td>{e.FirstName} {e.LasteName}</td>
                                  <td>{e.isAdmin ? "Admin":'User'}</td>
                                  <td style={{marginTop:'20px',display:'flex',gap:"10px",alignItems:'center',justifyContent:'center'}}>
                                    <FontAwesomeIcon icon={faCircleMinus} style={{color:'red'}} onClick={()=>deletOne(e._id)} />
                                    <Link to={`${e._id}`} ><FontAwesomeIcon icon={faPenToSquare} style={{color:'blueviolet'}}  /></Link>
                                  </td>
                             </tr>
                            })}
                         
                         
                     </tbody>
                </table>

             </div>




              <div className="allUsersss">
             <h2 style={{margin:'20px 0'}}>All Product </h2>

               <table>
                     <thead>
                        <tr>
                          <th>Image Product</th>
                          <th>Name Product</th>
                          <th>Action</th>
                        </tr>
                     </thead>

                     <tbody>
                         
                            {allPro.length > 0 && allPro.map((e,i)=>{
                             return  <tr key={i}>
                                  <td> <img src={`http://localhost:5500/${e.imagePro}`} style={{width:'50px',height:"50px",borderRadius:'50%'}} alt="" /></td>
                                  <td>{e.Titel} </td>
                                  <td style={{display:'flex',gap:"10px",alignItems:'center',justifyContent:'center',marginTop:'20px'}}>
                                    <FontAwesomeIcon icon={faCircleMinus} style={{color:'red'}} onClick={()=>delatOnePro(e._id)} />
                                    <Link to={`/dash/market/ProById/${e._id}`}><FontAwesomeIcon icon={faEye} style={{color:'blueviolet'}} /></Link>
                                  </td>
                             </tr>
                            })}
                         
                         
                     </tbody>
                </table>

             </div>



        </div>
    )
}