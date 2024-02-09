
import  "../ShowPost/ShowPost.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsis,faBookmark, faComment, faHeart,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios  from "axios";
 import { useContext } from 'react';
import {Save} from "../../Context/Save"
import { useNavigate } from "react-router-dom";

export default function ShowPost() {
        const conta = useContext(Save);
    const [sa,setSa] = useState(true)
    const [delet,setDelet] = useState(false)
    const [comment,setComment] = useState(true)
    const [like,setLike] = useState(false)
    const [BolenLike,setBolenLike] = useState(true)
    const [creteComment,setCreteComment] = useState('')
      const [allComment,setAllComment] = useState({})
         const [get,setGet] = useState(false)
         const [post,setPost] = useState('')
           const [user,setUser] = useState('')
          const [n,setN] = useState(false)
           const nav = useNavigate()


 let Key = window.location.href.replace('http://localhost:5173/dash/Saved/ShowPost/','')

console.log("kety => ",Key);

  const sonta  = useContext(Save)
        const sss = sonta.sss
       

      useEffect(()=>{
         getPost()
         GetUser()
      },[n,sss])


        async function GetUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
             setUser(res.data.user);
             console.log("user => ",res.data.user);
             

        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }


      async function getPost() {
        try {
            const res = await axios.get(`http://localhost:5500/api/getPostById/${Key}`) 
            console.log("podt => ",res.data);
       
            setPost(res.data.post)
        } catch (err) {
            console.log(err);
        }
      }

     async function AddLikes() {
       
         try {
            const res = await axios.get('http://localhost:5500/api/AddLike',{headers:{id:post._id}})
            setLike(res.data.Likes);
         } catch (err) {
             console.log('validation err',err)
         }

     }
      async function MinunsLikes() {
         try {
            const res = await axios.get('http://localhost:5500/api/MunisLike',{headers:{id:post._id}})
            setLike(res.data.Likes);
            console.log(res.data.Likes)
         } catch (err) {
             console.log('validation err',err)
         }
     }

     async function Likes() {
          try {
              const res = await axios.post('http://localhost:5500/api/Likes',{
               idPost:post._id,
               idUser:user._id
              })
              console.log('Likes => ',res);
              conta.setSss(p=>!p)
              
              
            //   setLikeColor(p=>!p)
          } catch (err) {
            console.log(err);
          }
      }

   useEffect(()=>{
    Comment()
   },[get])
console.log('from show Post ',allComment);
       async function Comment() {

        setComment(p=>!p)
          try {
               const res = await axios.get('http://localhost:5500/api/getAllComment',
               {headers:{id:post._id,token:window.localStorage.getItem('token')}})
               console.log("All",res.data.AllComent);
               setAllComment(res.data.AllComent);

          } catch (err) {
            console.log(err);
          }
       }
       
    async function CreComment() {
        if(creteComment == "") return
        try {
           const res = await axios.post('http://localhost:5500/api/CreateComment',{comment:creteComment},
           {
            headers:{
                token:window.localStorage.getItem('token'),
                id:post._id
            }
             })
         
              setGet(p=>!p)
            setCreteComment('')
            setComment(p=>!p)
            setN(p=>!p)

        } catch (err) {
          console.log('validation err',err)
        }
     }

     async function DeletPost() {
        try {
            const res = await axios.post('http://localhost:5500/api/DeletOne',{token:window.localStorage.getItem('token'),id:post._id})
            console.log(res);
            if(res.data == "this Post not For You"){
                setDelet(p=>!p)
                alert("this Post is not For You")
                return
            }
            
            window.location.pathname = 'dash/Saved'
        } catch (err) {
            console.log(err);
        }
     }

      async function Saved() {
        setSa(p=>!p)
        try {
             const res = await axios.post('http://localhost:5500/api/Saved',
             {token:window.localStorage.getItem('token'),id:post._id})
             console.log(res);
        } catch (err) {
            console.log(err);
        }


         
        
      }
      async function Desave() {
         setSa(p=>!p)
        try {
             const res = await axios.post('http://localhost:5500/api/DeletSave',{idPost:post._id})
             console.log(res);
             nav('/dash/Saved')
             
        } catch (err) {
            console.log(err);
        }

      }


                        

    return(
        <div className="Post" style={{width:'60%',margin:'60px auto'}}>
            <div className="topFromPostStructure" >
                 <div style={{display:'flex'}}>
                    <img src={`http://localhost:5500/${post.imageUser}`} style={{width:'50PX',height:"50PX",borderRadius:'50%'}}/>
                    <h3 style={{alignSelf:'center'}}>{post.FirstName} {post.LasteName}</h3>
                 </div>
            
                <div className="dot3" onClick={()=>setDelet(p=>!p)}>
                    <FontAwesomeIcon icon={faEllipsis} />
                 </div>

                   {delet?<div className="delet" onClick={DeletPost}> <FontAwesomeIcon icon={faTrashCan} style={{marginRight:'6px'}} />Delet Post</div>:""}
            </div>
  
        <div className="Message">
              <h5>{post.msg}</h5>
        </div>

        <div className="ImageFromStructurPost">
                {post.imagePost && post.imagePost != undefined? <img src={`http://localhost:5500/${post.imagePost}`} style={{width:'100%',textAlign:'center',height:'300PX'}}/>:""}
                 {post.VideoPost && post.VideoPost != undefined? <video controls src={`http://localhost:5500/${post.VideoPost}`} style={{width:'100%',textAlign:'center',height:'300PX'}}/>:""}
        </div>

            <div className="IconFromStructurPost">
                 <div style={{display:'flex',gap:"20px"}}>
                    <div style={{display:'flex', gap:'6px' }} onClick={Likes} >
                        <FontAwesomeIcon icon={faHeart}  />
                        <p> {post.Likes} Likes</p>
                    </div>
                    <div  style={{display:'flex',gap:'6px'}} onClick={Comment}>
                         <FontAwesomeIcon icon={faComment} />
                        <p>{post.comment}</p>
                    </div>
                 </div>

                <div className="ch">
                    {<p onClick={Desave} >Delet Save</p> }
                </div>

             </div>

             {comment?
              <div className="DivFromComment">
                  <img src={`http://localhost:5500/${user.image}`} style={{width:'30PX',height:"30PX"}}/>
                  <input type="text" placeholder="Wirte Commet" value={creteComment} 
                  onChange={(e)=>setCreteComment(e.target.value)} className="InputFromComment"/>
                  <div  className="fromComment" onClick={CreComment}>Send Comment</div>
              </div>
             :''}

             {comment &&  allComment.length >0 ? 
                 allComment.map((e,i)=>{
                     return <div key={i} style={{display:'flex',gap:"20px",marginBottom:'20px',width:'100%',height:"30PX",background:"rgb(237, 237, 237)",borderRadius:'8px'}}>
                               <img src={`http://localhost:5500/${e.imageUser}`} style={{width:"30px",height:"30px"}}  />
                               <p style={{alignSelf:'center'}}>{e.Comment}</p>
                            </div>
                 }):''
             }

        </div>
    )
}