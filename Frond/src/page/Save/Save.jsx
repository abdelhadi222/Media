import { useContext, useEffect, useState } from "react";
import axios from "axios"
import "../../Media/Media.css"
import "../Save/Save.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";
import {Windo} from "../../Context/Windo"



export default function name() {

     
           let size = useContext(Windo)

        
    const [allsaved,setAllsaved] =useState('')

    useEffect(()=>{
        GetAllSaved()
    },[])



   async function GetAllSaved() {
        try {
            const res = await axios.get('http://localhost:5500/api/getSavedForUser',{headers:{
                token:window.localStorage.getItem('token')
            }})
            console.log(res.data.allSave);
            setAllsaved(res.data.allSave);
        } catch (err) {
            console.log(err);
        }
    }
    const getOnlyImage = allsaved ?allsaved.filter((e)=>{return  e.imagePost != "" }) : ''

    const getAllMessage = allsaved ?allsaved.filter((e)=>{return  e.Message != "" &&  e.imagePost == "" }) : ''
   console.log(getAllMessage);
    return(
         <div>
        <div style={{padding:'20px'}}>
             <h1 style={{padding:"10px",marginBottom:'20px',textAlign:'center'}}>Saveds</h1>


             <div className="SavedImage">
               <h3 style={{marginBottom:'20px',paddingLeft:'5px'}}>All Saved Image : </h3>
               <div className="dakhlImage" style={{margin:size.size > 1000?"none":"0 auto"}}  >
                 {getOnlyImage==""?<p style={{color:'rgb(127, 127, 127)'}}><FontAwesomeIcon icon={faBan}  style={{marginRight:'10px'}}/>Sorry,Save Not Exsit</p>:""}
                     {getOnlyImage ? getOnlyImage.map((e,i)=>{
                         return <div key={i} className="ImageFromSave" style={{width:size.size > 1000?"23.75%":(size.size < 800?(size.size < 600 ?"90%":'45%'):'29%')}}>
                                   <div style={{display:'flex',gap:'10px'}}>
                                      <Link to={`ShowProfile/${e.num}`}><img style={{width:'30PX',height:'30px',borderRadius:'50%'}} src={`http://localhost:5500/${e.imageUser}`} alt="" /></Link>
                                      <Link to={`ShowProfile/${e.num}`  }style={{textDecoration:'none',alignSelf:'center',color:'black'}}>{e.FirstName} {e.LasteName}</Link>
                                   </div>
                                   <Link to={`ShowPost/${e.IdPost}`} style={{textDecoration:'none',color:'black'}}>
                                     {e.Message?<p style={{marginTop:"8px"}}>{e.Message}</p>:<p style={{marginTop:"8px"}}></p>}
                                     {e.imagePost &&   <img src={`http://localhost:5500/${e.imagePost}`} style={{marginTop:e.Message?"8px":"25px",width:"100%",height:"150px"}} alt="" />}
                                     {e.VideoPost &&   <video controls src={`http://localhost:5500/${e.VideoPost}`} style={{marginTop:e.Message?"8px":"25px",width:"100%",height:"150px"}} alt="" />}
                                   </Link>
                                </div>
                     }):''
                    }
                </div>
             </div>



              <div className="SavedMessage">
                <h3 style={{marginBottom:'20px',marginLeft:'4px'}}>All Saved message : </h3>
                <div className="dakhlMessage">
                    {getAllMessage==""?<p style={{color:'rgb(127, 127, 127)'}}><FontAwesomeIcon icon={faBan}  style={{marginRight:'10px'}}/>Sorry,Save Not Exsit</p>:""}
                     {getAllMessage ? getAllMessage.map((e,i)=>{
                         return <div key={i} className="MessageFromSave" style={{width:size.size > 1000?"23.75%":(size.size < 800?(size.size < 600 ?"90%":'45%'):'29%')}}>
                                   <div style={{display:'flex',gap:'10px'}}>
                                      <Link to={`ShowProfile/${e.num}`} style={{textDecoration:'none',color:'black'}}><img style={{width:'30PX',height:'30px',borderRadius:'50%'}} src={`http://localhost:5500/${e.imageUser}`} alt="" /></Link>
                                      <Link to={`ShowProfile/${e.num}`}style={{textDecoration:'none',alignSelf:'center',color:'black'}}>{e.FirstName} {e.LasteName}</Link>
                                   </div>
                                   <Link to={`ShowPost/${e.IdPost}`} style={{textDecoration:'none',alignSelf:'center',color:'black',width:"100%"}}>
                                      <h5 style={{width:'100%',height:'40px',marginTop:"20px"}}>{e.Message}</h5>
                                   </Link>
                                </div>
                     }):''
                    }
                </div>
             </div>

        </div>
        </div>
    )
}