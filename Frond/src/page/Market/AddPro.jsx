import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage,faCircleXmark , faUpload} from "@fortawesome/free-solid-svg-icons";
import "../Market/Market.css"
import axios from "axios"
// import {ChatContext} from "../../Context/Socekt.jsx";
        
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
export default function AddPro() {
    const [pictures, setPictures] = useState([]);
     const [pu, setPu] = useState(false);
     const [rend, setRend] = useState(false);
    const [form,setForm] = useState({
        Titel:'',
        des:'',
        Price:'',
        adr:'',
    })
    let nav = useNavigate()
    // let conta = useContext(ChatContext)
    // console.log('Conta =>',conta);

        const [cat,setCat] = useState('Select Categorey')
    // const [imagePro,setImagePro] = useState('')
    // const [imageCoprisi,setImageCoprisi] = useState('')
        const [image,setImage] = useState([])
        console.log(image);
    function Handel(e) {
     setForm({...form,[e.target.name]:e.target.value})
    }

    //    const imageOnChange = (e) => {
    //   setImagePro(e.target.files[0])
    //     const reader = new FileReader();

    //     reader.readAsDataURL(e.target.files[0]);

    //     reader.onload = (ev) => {
    //         return setImageCoprisi(ev.target.result);
    //     };
    // };
     let data = new FormData()
    async function Sup(e) {
       e.preventDefault() ;
        data.append('Titel',form.Titel)
        data.append('category',cat)
        data.append('des',form.des)
        data.append('Price',form.Price)
        data.append('adr',form.adr)
        data.append('category',cat)
        for (let i = 0; i < image.length; i++) {
          data.append('images[]',image[i])
        }

        try {
            const res = await axios.post('http://localhost:5500/api/AddPro',data,
            {headers:{token:window.localStorage.getItem('token')}})
            console.log(res);
            nav('/dash/Market')
        } catch (err) {
             console.log(err);
        }
    }
      console.log('vat:',cat);

    // function multipolFile(file) {
    //      console.log(file);
    //      for (let i = 0; i < file.length; i++) {
    //            AllImages.push(file[i])
    //      }
    //     }

function nnuull(index) {
  console.log('beofre',image);
image.splice(index,1)
setRend(p=>!p)
setPu(false)
  console.log('aftre',image);
}

    let allImages = image.length>0 && image.map((e,i)=>{
       return  i==0?
       <div style={{position:'relative',textAlign:'center',width:"200px",height:"200px",marginBottom:'40px',margin:'0 auto'}}>
        
         <FontAwesomeIcon icon={faCircleXmark} style={{position:"absolute",right:"-3px",top:"20px",color:'red',borderRadius:'8px'}}   onClick={()=>nnuull(i)}/>
          <img src={URL.createObjectURL(e)} alt=""  style={{width:"100%",height:"100%",borderRadius:'8px',marginTop:'30px'}} />
       </div>
       :
       <div className="fromAddProImaegMin">
         <FontAwesomeIcon icon={faCircleXmark}  onClick={()=>nnuull(i)} style={{color:'red',position:"absolute",right:"-5px",top:"-5px"}} />
         <img src={URL.createObjectURL(e)} alt=""    style={{width:"100%",height:"100%",borderRadius:'8px'}}/>
       </div>
       
    })
    console.log('pour',image)



    return(
        <div>
            <h2 style={{textAlign:'center',paddingTop:"30px"}}><FontAwesomeIcon style={{marginRight:"10px"}} icon={faPlus} />Add Proudct</h2>
            <form action="" className="formFromAddPro" onSubmit={Sup}>
                 <div className="divvvv">
                    <input type="text" name="Titel" placeholder="Titel Proudct" required 
                    value={form.Titel} onChange={Handel}/>
                 </div>
                 <div  className="divvvv">
                    <input type="text" name="des" placeholder="Descrption" value={form.des} required
                    onChange={Handel} />
                 </div>

          
                     <div  className="divvvv">
                      <input type="number" name="Price" placeholder="Price" value={form.Price}
                      onChange={Handel}/>
                    </div>
                    <div  className="divvvv">
                    <input type="text" name="adr" value={form.adr} placeholder="Adr"
                    onChange={Handel}/>
                     </div>
         


                 <div className="ddd">
                    <select name="" id="" value={cat}   onChange={(e)=>setCat(e.target.value)}>
                        <option   disabled  >Select Categorey</option>
                        <option value="Phone">Phone</option>
                        <option value="Pc">Pc</option>
                        <option value="House">House</option>
                        <option value="Car">Car</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Game">Game</option>
                    </select>
                 </div>

               

{/* 
                  <div className="BzafImages">
                      <input  type="file" multiple onChange={(e)=>{
                        const allFile = e.target.files
                        console.log(allFile);
                        multipolFile(allFile)                 
                        }}/>
                  </div> */}

          

                    <div className="addImage" style={{background:'rgb(127, 40, 170)'}}>
                     <input type="file" multiple name="pictures"    className="FromFileFromAddPr" onChange={(e)=>setImage([...image,...e.target.files])} />
                     <FontAwesomeIcon icon={faUpload} style={{alignSelf:'center',fontSize:'30px',cursor:"pointer"}} />
                     <p style={{alignSelf:'center',marginBottom:'20px',fontSize:'22px',marginTop:'15px'}}>Uplod  Images</p> 

                      {/* <FontAwesomeIcon icon={faImage} style={{alignSelf:'center',fontSize:'30px',cursor:"pointer"}} /> */}
                   </div>

                  {image.length>0&&<div>{allImages}</div>}







                 







                  

<button className='FromAddPro' >
  <div className="svg-wrapper-1">
    <div className="svg-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          fill="currentColor"
          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
        ></path>
      </svg>
    </div>
  </div>
  <span>Send</span>
</button>
            
            </form >
        </div>
    )
}




  //  <div className="addImage">
  //                 {imageCoprisi==''?
  //                    <div>
  //                    <input type="file"className="FromFileFromAddPr" onChange={imageOnChange} />
  //                    <p style={{alignSelf:'center',marginBottom:'20px',fontSize:'22px'}}>Uplod main image</p> 
  //                    <FontAwesomeIcon icon={faImage} style={{fontSize:'30px',cursor:"pointer"}} />
  //                    </div>
  //                 :<div style={{position:'relative'}}>
  //                   <FontAwesomeIcon icon={faCircleXmark} style={{fontSize:'30px',color:'red',position:"absolute",right:'-10px',top:'-10px'}} onClick={()=>setImageCoprisi('')} />
  //                   {/* <div style={{position:"absolute",right:'0',top:'0px',display:'flex',alignItems:'center',justifyContent:'center',width:'30px',height:"30px",borderRadius:'50%'}}></div> */}
  //                     <img src={imageCoprisi} style={{width:'100%',height:'250px'}}/>
  //                 </div>
  //                 }
  //                 </div>