import "../UpdatePro/UpdatePro.css"
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faImage, faRectangleXmark} from "@fortawesome/free-solid-svg-icons";
export default function UpdatePro() {
        const [pro,setPro] = useState('')
        const [titel,setTitel] = useState('')
             const [rend, setRend] = useState(false);
        const [des,setDes] = useState('') 
        const [price,setPrice] = useState('')
        const [adr,setAdr] = useState('')
        const [image,setImage] = useState([])
        const [relod,setRelod] = useState(false)        
        const [er,setEr] = useState('')
        let nav = useNavigate()
        console.log(image);

         let idPro = window.location.href.replace('http://localhost:5173/dash/market/ShowMypro/','')
       

    //     // const nav=useNavigate()
    //        const conta = useContext(Save);
  
    useEffect(()=>{
        GetPro()
    },[relod,rend])
    async function GetPro() {
    console.log(pro);      
        try {
            const res = await axios.get(`http://localhost:5500/api/getOnePro/${idPro}`,{headers:{token:window.localStorage.getItem('token')}})
            console.log('from update : ',res.data);
             setPro(res.data.pro);
             setTitel(res.data.pro.Titel);
             setPrice(res.data.pro.Price)
             setDes(res.data.pro.des)
             setAdr(res.data.pro.adr)

             console.log('titel : ',titel);

             

        } catch (err) {
            console.log('validation err is from Context',err);
        }
     }


     async function dletImagePro(i) {
    
        try {
            const res = await axios.post(`http://localhost:5500/api/dletImagePro`,{idPro:idPro,index:i})
            console.log(res);
            setRelod(p=>!p)
        } catch (err) {
            console.log(err);
        }
     }

    
        async function sup(e) {
        let data = new FormData()
         data.append('Titel',titel)
        data.append('des',des)
        data.append('Price',price)
        data.append('adr',adr)
        for (let i = 0; i < image.length; i++) {
          data.append('images[]',image[i])
        }

            e.preventDefault() ;
            try{
               const res = await axios.post(`http://localhost:5500/api/UpdatePro/${idPro}`,data,
                {headers:{idPro:idPro}}
               )
               console.log('data',res);
               nav("/dash/Market")

                
            }catch(err){
                console.log("valdtion err is " , err);
            }
         }

function nnuull(index) {
  console.log('beofre',image);
  image.splice(index,1)
   setRend(p=>!p)
  console.log('aftre',image);
}

         let AllImages = image.length>0 && image.map((e,i)=>{
             return  <div  key={i} style={{position:'relative'}}>
         <FontAwesomeIcon icon={faRectangleXmark} onClick={()=>nnuull(i)}  style={{color:'red',position:"absolute",right:"0px",top:"0px"}} />
         <img src={URL.createObjectURL(e)} alt=""    style={{width:"100px",height:"100px",borderRadius:'8px'}}/>
       </div>
         })
        


       
 

    return (
        <div>
            <h1 style={{textAlign:'center',marginTop:"30px"}}>Update Product</h1>
                        <div className="dic">

                 <form action="" className="FormFromUpd" onSubmit={sup}>
                    <div>
                       <div><input type="text" value={titel} placeholder="titel" onChange={(e)=>setTitel(e.target.value)}/></div>
                       <div><input type="text" value={des}  placeholder="Des" onChange={(e)=>setDes(e.target.value)}/></div>
                    </div>
                    
                    <div>
                        <input type="number" className="FromUpd" placeholder="Price"   value={price} onChange={(e)=>setPrice(e.target.value)} />
                    </div>


                      <div>
                        <input type="text" placeholder="Adr" className="FromUpd" name="Adr"  value={adr} onChange={(e)=>setAdr(e.target.value)}/>
                    </div>


                  <div style={{display:'flex',gap:"10px",flexWrap:'wrap'}}>
                        {pro.Images && pro.Images.map((e,i)=>{
                        return <div key={i} style={{position:'relative'}}>
                            
                            <FontAwesomeIcon icon={faRectangleXmark} onClick={()=>dletImagePro(i)}  style={{position:'absolute',right:'0',top:'0',color:'red'}} />
                             <img src={`http://localhost:5500/${e}`} style={{borderRadius:'7px',width:"100px",height:'100px'}}/>
                        </div>
                    })}
                    {AllImages}
                  </div>


                      {/* <div>
                        <input type="password" className="FromUpd"    />
                    </div> */}
                    <div className="addImage">
                     <input type="file" multiple name="pictures"    className="FromFileFromAddPr" onChange={(e)=>setImage([...image,...e.target.files])} />
                     <p style={{alignSelf:'center',marginBottom:'20px',fontSize:'22px',marginTop:'15px'}}>Uplod  Images</p> 
                    
                      <FontAwesomeIcon icon={faImage} style={{alignSelf:'center',fontSize:'30px',cursor:"pointer"}} />
                   </div>


                    <input type="submit" className="BFromUpd" />
                 

                 </form>


             </div>
        </div>
    )
}