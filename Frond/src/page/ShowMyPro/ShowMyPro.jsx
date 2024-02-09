import { useEffect, useState } from "react"
import "../ShowMyPro/ShowMyPro.css"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen,faPencil} from "@fortawesome/free-solid-svg-icons";
import { Link  } from "react-router-dom"
export default function ShowMyPro() {
    const [pro,setPro] = useState('')
    const [change,setChange] = useState(false)
    useEffect(()=>{
         GetAllProById()
    },[change])
    async function GetAllProById() {
        try {
            const res =await axios.post('http://localhost:5500/api/getAllProByUser',{token:window.localStorage.getItem('token')})
            setPro(res.data.proByUser);
            console.log('all Pro',res.data.proByUser);
        } catch (err) {
            console.log(err);
        }
    }

      async function dletPro(id) {
        console.log(id);
        try {
            const res = await axios.post(`http://localhost:5500/api/dletPro`,{
          
                token:window.localStorage.getItem('token'),
                proId:id
            
            })            
                console.log(res);
                setChange(p=>!p)
        } catch (err) {
            console.log(err);
        }
            
         }

    

 
    return (
        <div style={{padding:"20px"}}>
            <div className="proById">

                {pro.length != 0 ?
                 <table>
                     <thead>
                        <tr>
                          <th>Name Product</th>
                          <th>image Prouduct</th>
                          <th>Action</th>
                        </tr>
                     </thead>

                     <tbody>
                         
                              {pro?
                                  pro.map((e,i)=>{
                                      return <tr key={i}>
                                              <td>{e.Titel}</td>
                                              <td><img src={`http://localhost:5500/${e.imagePro}`} style={{width:"50px",height:'50px',borderRadius:'10px'}}/></td>
                                              <td style={{display:'flex',justifyContent:'center',alignItems:'center',gap:"15px",marginTop:'20px'}}>
                                                <FontAwesomeIcon icon={faTrash} style={{color:'red'}} onClick={()=>dletPro(e._id)} />
                                               <Link to={`${e._id}`}> <FontAwesomeIcon icon={faPencil} style={{color:'green'}} /></Link>
                                              </td>

                                              

                                      </tr>
                                  })
                                :""}
                         
                         
                     </tbody>
                </table>
                :<div>Prouduct Not Exsit</div> }




            </div>
        </div>
    )
}





