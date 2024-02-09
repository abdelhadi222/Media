import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsis,faBookmark, faComment, faHeart,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios  from "axios";
import { useContext } from 'react';
import {Save} from "../../Context/Save"
import { Link } from "react-router-dom";
import { Windo } from "../../Context/Windo";
import { SocketContext } from "../../Context/Socekt";
 import {Meun} from "../../Context/Meun"

export default function StructurePost(props) {
    const  {Fname,Lname,imageUser,message,numUser,imagePost,id,li,IdUser,imageComment,VideoPost,idpost,saved,idUser,idUserPost,num} = props
    const [sa,setSa] = useState(true)
    const [delet,setDelet] = useState(false)
    const [comment,setComment] = useState(true)
    const [like,setLike] = useState(false)
    const [BolenLike,setBolenLike] = useState(true)
    const [creteComment,setCreteComment] = useState('')
      const [allComment,setAllComment] = useState({})
         const [get,setGet] = useState(false)
         const [allsaved,setAllsaved] = useState([])
      const [numLike,setNumLike] = useState(0)
         let newww = useContext(Meun)
         

      let size = useContext(Windo)
           
      // Context 
           const conta = useContext(Save);
              const [save,setSave] = useState('')
           
           const[mes,setMes] = useState(true)
           const [likeColor, setLikeColor] = useState("")

  //   useEffect(()=>{
  //     // if(window.localStorage.getItem(`Like${idpost}`)){
  //     //   return
  //     // }
  //     window.localStorage.setItem(`Like${idpost}`,0)
  //  },[idUser])
  let sss = conta.sss

  // useEffect(()=>{ 
  //   ChekSave() 
  // },[sss])


  // contexet Socket : 
   const CSocket = useContext(SocketContext)
   let Soket = CSocket.socket
  //  console.log("Soket from structur =>" , CSocket.socket); 

  const [user,setUser] = useState('')
  useEffect(()=>{
     GetUser()
  },[id])
    

   async function GetUser() {
        try {
            const res = await axios.get('http://localhost:5500/api/User',{headers:{token:window.localStorage.getItem('token')}})
             setUser(res.data.user);
             ChekSave(res.data.user._id)


        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }











  async function ChekSave(ida) {
    console.log('Id Post  p => ' ,id);
       console.log('Id User p  => ' ,IdUser);

      try {
         const res  = await axios.post('http://localhost:5500/api/ChekSave',{
            IdUser:ida,
            IdPost:id
         })
         console.log("=> This Is data <= : => ",res.data);
         setSave(res.data)
      } catch (err) {
         console.log(err);
      }
  }
          
              
          
          


              //  let contextSocket = useContext(SocketContext)
              //   console.log('from market tets Socket => ',contextSocket); 

           


useEffect(()=>{
  GetAllSavedUser()
},[])

async function GetAllSavedUser() {
     try {
      const res = await axios.get('http://localhost:5500/api/getSavedForUser',{headers:{token:window.localStorage.getItem('token')}})
    
      setAllsaved(res.data.allSave);
   } catch (err) {
     console.log(err);
   }
}







   


    //  async function AddLikes() {
       
    //      try {
    //         const res = await axios.get('http://localhost:5500/api/AddLike',{headers:{id:id}})
    //         setLike(res.data.Likes);
    //      } catch (err) {
    //          console.log('validation err',err)
    //      }
    //      setNumLike(p=>p+1)
    //      conta.setSss(p=>!p)
    //      setLikeColor(p=>!p)
    //     //  window.localStorage.setItem(`Like${idpost}`,1)
    //  }
    //   async function MinunsLikes() {
        
    //      try {
    //         const res = await axios.get('http://localhost:5500/api/MunisLike',{headers:{id:id}})
    //         setLike(res.data.Likes);
    //           // window.localStorage.setItem(`Like${idpost}`,0)
    //          conta.setSss(p=>!p)
    //           setLikeColor(p=>!p)
    //      } catch (err) {
    //          console.log('validation err',err)
    //      }
    //  }

    //  function chose() {
         
    //     if(BolenLike){
    //         AddLikes()
    //         setBolenLike(true)
    //     }
    //     if(!BolenLike){
    //         MinunsLikes()
    //     }
    //         setBolenLike(p => !p)
    //         conta.setSss(p=>!p)
    //  }

   useEffect(()=>{
    Comment()
   },[get])

       async function Comment() {

        setComment(p=>!p)
          try {
               const res = await axios.get('http://localhost:5500/api/getAllComment',
               {headers:{id:id,token:window.localStorage.getItem('token')}})
            
               setAllComment(res.data.AllComent);
          } catch (err) {
            console.log(err);
          }
       }
       
    async function CreComment(ty) {
        if(creteComment == "") return
        try {
           const res = await axios.post('http://localhost:5500/api/CreateComment',{comment:creteComment},
           {
            headers:{
                token:window.localStorage.getItem('token'),
                id:id,
            }
             })
          
            setGet(p=>!p)
            setCreteComment('')
            setComment(p=>!p)
            Sokett(ty)
            
        } catch (err) {
          console.log('validation err',err)
        }
     }

     async function DeletPost() {
        try {
            const res = await axios.post('http://localhost:5500/api/DeletOne',{token:window.localStorage.getItem('token'),id:id})
          
            if(res.data == "this Post not For You"){
                alert("this Post is not For You")
            }
            setDelet(p=>!p)
            conta.setSss(p=>!p)
        } catch (err) {
            console.log(err);
        }
     }

      async function Saved() {
        setSa(p=>!p)
        try {
             const res = await axios.post('http://localhost:5500/api/Saved',
             {token:window.localStorage.getItem('token'),id:id})
             setMes(p=>!p)
             setSave("Is Save")
              Sokett(110)
             conta.setSss(p=>!p)
          
        } catch (err) {
            console.log(err);
        }

         conta.setSss(p=>!p)
         
        
      }
      console.log("Save ==> ==>",save);
      async function Desave() {
         setSa(p=>!p)
        try {
             const res = await axios.post('http://localhost:5500/api/DeletSave',{idPost:id,idUser:idUser})

               setMes(p=>!p)
               conta.setSss(p=>!p)
               setSave('')
               Sokett(111)
        } catch (err) {
            console.log(err);
        }
        conta.setSss(p=>!p)
      }

      // const ColorLike = ()=>{
      //   // setLikeColor(p=>!p)

      //    if(likeColor == false){
      //       AddLikes()
      //   }
        

      //   if(likeColor == true){
      //      MinunsLikes()
      //   }
       

        
      // }
      async function Likes(t) {
          try {
              const res = await axios.post('http://localhost:5500/api/Likes',{
               idPost:id,
               idUser:IdUser,
               name:Fname
              })
              // console.log("done =>",res.data);
              setLikeColor(res.data)
              conta.setSss(p=>!p)
              setLikeColor(p=>!p)

              // soket : 
              if(res.data == 7) {
                 Sokett(11)
              }
              else{
                 Sokett(t)
              }

          } catch (err) {
            console.log(err);
          }
      }


      function Sokett(type) {
        
         Soket.emit('sendNoti',{
                  senderId:idUser,
                  reciverId:idUserPost,
                  First:user.FirstName,
                  Last:user.LasteName,
                  ImageSender:imageComment,
                  num:numUser,
                  idpost:id,
                  type,
              })
      }







                        

    return(
        <div className="Post" style={{width:size.size > 1000 ?"100%":(size.size<500?'80%':"70%"),margin:size.size < 1000 ?"20px auto":""}}>
            <div className="topFromPostStructure">
                 <div style={{display:'flex',gap:'10px'}}>
                   <Link to={`ShowProfile/${num}`} style={{textDecoration:'none',color:'black'}}> <img src={`http://localhost:5500/${imageUser}`} style={{width:'50PX',height:"50PX",borderRadius:'50%'}}/></Link>
                   <Link to={`ShowProfile/${num}`} style={{textDecoration:'none',color:'black',alignSelf:'center'}}> <h3>{Fname} {Lname}</h3></Link>
                 </div>
            
                <div className="dot3" onClick={()=>setDelet(p=>!p)}>
                    <FontAwesomeIcon icon={faEllipsis} />
                 </div>

                   {size.size > 1000 ?(delet?<div className="delet" onClick={DeletPost}> <FontAwesomeIcon icon={faTrashCan} style={{marginRight:'6px'}} />Delet Post</div>:"")
                   :(delet?<div className="delet" style={{display:'flex',justifyContent:'center'}} onClick={DeletPost}> <FontAwesomeIcon icon={faTrashCan} style={{marginRight:'6px'}} /></div>:"")}
            </div>
  
        <div className="Message">
              <h5>{message}</h5>
        </div>

        <div className="ImageFromStructurPost">

                {imagePost && imagePost != undefined? <img src={`http://localhost:5500/${imagePost}`} style={{width:'100%',textAlign:'center',height:'300PX'}}/>: ""}

                {VideoPost && VideoPost != undefined? <video autoPlay  controls  src={`http://localhost:5500/${VideoPost}`} style={{ width: '100%', textAlign: 'center', height: '300PX' }}></video>: ""}
               
        </div>
       
       

            <div className="IconFromStructurPost">
                 <div style={{display:'flex',gap:"20px"}}>
                    <div style={{display:'flex', gap:'6px'}} onClick={()=>Likes(1)} >
                      
                     
                       <FontAwesomeIcon icon={faHeart} style={{color: "#000000",}} />
                   
                        
                        <p> {li} Likes</p>
                    </div>
                    <div  style={{display:'flex',gap:'6px'}} onClick={Comment}>
                         <FontAwesomeIcon icon={faComment} />
                        <p>{allComment.length}</p>
                    </div>
                 </div>

                <div className="ch">
                    {save  ?
                       <p onClick={Desave}>Is Save</p>:
                     <p onClick={Saved}><FontAwesomeIcon icon={faBookmark} /></p>}
 
     {/* <label className="ui-bookmark">
  <input type="checkbox" />
  <div className="bookmark">
    <svg viewBox="0 0 32 32">
      <g>
        <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z" />
      </g>
    </svg>
  </div>
</label>
 */}

                </div>

             </div>

             {comment?
              <div className="DivFromComment">
                  <img src={`http://localhost:5500/${imageComment}`} style={{width:'30PX',height:"30PX"}}/>
                  <input type="text" placeholder="Wirte Commet" value={creteComment} 
                  onChange={(e)=>setCreteComment(e.target.value)} className="InputFromComment"/>
                  <div  className="fromComment" onClick={()=>CreComment(2)}>Send Comment</div>
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