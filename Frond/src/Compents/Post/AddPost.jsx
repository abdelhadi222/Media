import "../Post/Post.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhotoFilm,faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {Link } from "react-router-dom"
import { Windo } from "../../Context/Windo";
import {Save} from  "../../Context/Save"



export default function AddPost() {
    const [image,setImage] = useState('')
    const [imageCoprisi,setImageCoprisi] = useState('')
    const [message,setMessage] = useState('')
     const [relode,setRelode] = useState(false)

    let size = useContext(Windo)
       let conta = useContext(Save)


       const [user,setUser] = useState('')
       useEffect(()=>{
         GetUser()
         
   },[])
       async function GetUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
             setUser(res.data.user);

        } catch (err) {
            console.log('validation err  from Context => ',err);
        }
     }

     
    const imageOnChange = (e) => {
      setImage(e.target.files[0])
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = (ev) => {
            return setImageCoprisi(ev.target.result);
        };
    };


  async function AddNewPost() {
    let data = new FormData()
    data.append('msg',message)
    data.append("imagePost",image)
    // event.preventDefault();
    if(message=="" && image==""){
        return
    }

    console.log('ggggg = ' , data.get('imagePost'));

    
    try {
        const res = await axios.post('http://localhost:5500/api/AddPost',data,
        {headers:{
          token:window.localStorage.getItem('token')
        },
    })
    console.log('*******************************************');
    console.log('This => ' , res);
        setMessage('')
        setImage('')
        setImageCoprisi('')
        setRelode(p=>!p)
        conta.setIh(p=>!p)
        
        // console.log('Done Done :');
       
    } catch (err) {
        console.log('validation err from Add New Post',err);
    }
  }
  function nul() {
    setImageCoprisi('')
  }





    return(
      <>
        
        <div  className="ParentDivFromAddPost">
               <div style={{width:"100%"}}>

           <div className="AddPostTop" style={{gap:size.size>1000 ?"10px":"40px"}}>

              <div style={{alignSelf:'center',width:'10%'}}>
               <Link to={'/dash/Profile'}> <img src={`http://localhost:5500/${user.image}`} style={{width:"60px",height:'60PX',borderRadius:'50%'}}/></Link>
              </div>

              <div className="InputFromAddPost">
                  <input className="inputtt" type="text" style={{marginTop:'10px',width:size.size>1000 ?"100%" :"70%"}} value={message} name="msg"
                   placeholder="What's in your maind" onChange={(e)=>setMessage(e.target.value)}/>
              </div>

           </div>

                 <div style={{position:"relative"}}> 
                    {imageCoprisi && image ?<div onClick={nul}  style={{width:'30PX',height:"30px",background:'black',color:'white',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center',position:"absolute",left:"400px",top:"-15px"}}><FontAwesomeIcon icon={faXmark}/></div>:""}
                    {imageCoprisi && image   ? ( image.type.includes('image')?<img src={imageCoprisi} style={{width:"60%",height:'40%'}} alt="" />: <video controls style={{width:"40%",height:"200px"}} src={imageCoprisi} autoPlay/>)
                    :''} 
                 </div>

           <hr style={{marginBottom:'10px'}} />

           <div className="AddPostFooter">

            <div className="File">
                <FontAwesomeIcon icon={faPhotoFilm} style={{marginRight:"10Px",color:'green'}} />
                <p>Add Image / Video</p>
                 <input type="file" className="fi" name="image"  onChange={imageOnChange}/> 
            </div>
            <button className="ButtonFromAddPost"  onClick={AddNewPost}>Post</button>
           </div>

        </div>
        </div>
         
      </>
    )
}