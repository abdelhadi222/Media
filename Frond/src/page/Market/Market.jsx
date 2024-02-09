import "../Market/Market.css"
// import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop,faEye,faCircleDown,faTruckRampBox, faStoreSlash, faHouse, faMagnifyingGlass,faPhone,faGamepad, faCarRear,faLaptop, faShirt} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import StructurePro from "./StructurePro";
import Scol from "../Scol/Scol"
import {Windo} from "../../Context/Windo"
import { useContext } from "react";


// import { SocketContext } from "../../Context/Socekt";
// import { useContext } from "react";
export default function Market() {
  
    const [show,setShow] = useState(false)
    const [value,setValue] = useState('Select Category')
    const [allPro,setAllPro] = useState('')
    const [search,setSearch] = useState('')
    const [er,setEr] = useState('')
    const [cat,setCat] = useState('')
                const [inp,setInp] = useState('')
                 let size = useContext(Windo)

                // let conta = useContext(SocketContext)
                // console.log('from market tets Socket',conta); 

  function data(e) {
    let all  = document.querySelectorAll('.OneCat')
    all.forEach((e)=>{
       e.classList.remove('ac')
    })
    e.target.classList.add("ac")
    document.querySelector('.Ca').innerText = e.target.innerText
     setShow(p=>!p)
 setValue(e.target.innerText)


   
  }

  function dataCar(e) {
    let all  = document.querySelectorAll('.OneCat')
    all.forEach((e)=>{
       e.classList.remove('ac')
    })
    e.target.classList.add("ac")
    setShow(p=>!p)
        document.querySelector('.Ca').innerText = e.target.innerText
  setValue(e.target.innerText)

  }

  useEffect(()=>{

     
     GetAllPro()
  },[])

async function GetAllPro() {
  try {
     const res = await axios.get('http://localhost:5500/api/getAllPro')
     console.log("All Pro",res.data.AllPro);
     setAllPro(res.data.AllPro)
  } catch (err) {
    console.log(err);
  }
}

async function Search() {
  console.log('v is : ',value);
  if(value==''){
    document.querySelector('.Titel').style = "    border: 1px solid red;border-radius: 8px ;"
    alert('pls Entre Your Cat')
    return
  }

  window.localStorage.setItem('Cat',value)
  window.localStorage.setItem('Ser',inp)
  document.querySelector('.InSer').style = "    border: none;"
   document.querySelector('.Titel').style = "    border: none;"
  try {
    const res  = await axios.post('http://localhost:5500/api/SearchCat',{cat:value})
    console.log(res.data);
    if(res.data == "This Cat Is Vide") {
       alert(res.data)
      setEr(res.data)
        return
    }
    setSearch(res.data.cat);
  } catch (err) {
    console.log(err);
  }
}
console.log(search);
console.log(value);




  return(
        <div  >   
          {!allPro&&<Scol/>}
            <h2 style={{padding:'20px 40px'}}><FontAwesomeIcon icon={faShop} style={{marginRight:'10px'}} />Market Place</h2>
           
             <div className="InSer" >
                 <input type="text" value={inp} onChange={(e)=>setInp(e.target.value)} />
                 <div className="serrr" onClick={Search} ><FontAwesomeIcon icon={faMagnifyingGlass} style={{alignSelf:'center'}} /></div>
             </div>
            {/* <div className="InputFromMarket">
                 <input type="text" placeholder="What Do You Want To Buy"/>
            </div> */}
             <div >
                    {/* <div className="OOOne">
                   <FontAwesomeIcon icon={faMagnifyingGlass} className="IconFromMarket" />  <input type="text" placeholder="What Do You Want To Buy" className="InputFromMarket"/>
                 </div> */}
            <div className="Catrgry" onClick={()=>setShow(p=>!p)}>
                 <div className="Titel" style={{borderRadius:show?'8px 8px 0px 0px':"8px"}}>
                    <div className="Ca">{value}</div>
                    <div><FontAwesomeIcon icon={faCircleDown}  /></div>
                    </div>
                
            </div>

            {show?
              <div className="DakhlCatr">
                 <div  className="OneCat" onClick={data} > <FontAwesomeIcon icon={faHouse} style={{marginRight:'4px'}} />House</div>
                 <div className="OneCat" onClick={dataCar} ><FontAwesomeIcon icon={faCarRear}   style={{marginRight:'4px'}} />Car</div>
                 <div className="OneCat" onClick={data} > <FontAwesomeIcon icon={faLaptop}  style={{marginRight:'4px'}} />Pc</div>
                 <div className="OneCat" onClick={data} > <FontAwesomeIcon icon={faPhone} style={{marginRight:'4px'}}  />Phone</div>
                 <div className="OneCat" onClick={data}> <FontAwesomeIcon icon={faShirt} style={{marginRight:'4px'}} />Fashion</div>
                  <div className="OneCat" onClick={data}> <FontAwesomeIcon icon={faGamepad} style={{marginRight:'4px'}}  />Game</div>
              </div>
            :<div className="DakhlCatr" style={{opacity:'0'}}>
                 <div  className="OneCat"><FontAwesomeIcon icon={faShirt} style={{marginRight:'4px'}} />Fashion</div>
                 <div  className="OneCat"><FontAwesomeIcon icon={faShirt} style={{marginRight:'4px'}} />Fashion</div>
                 <div className="OneCat"  ><FontAwesomeIcon icon={faShirt} style={{marginRight:'4px'}} />Fashion</div>
                 <div className="OneCat" ><FontAwesomeIcon icon={faShirt} style={{marginRight:'4px'}} />Fashion </div>
                 <div className="OneCat" > <FontAwesomeIcon icon={faShirt} style={{marginRight:'4px'}} />Fashion</div>
                 <div className="OneCat" style={{opacity:'0'}} ><FontAwesomeIcon icon={faShirt} style={{marginRight:'4px'}} />Fashion </div>
              </div>}
             </div>

         <div className="flxe" style={{marginTop:'-230px',width:'100%',position:'absolute',padding:'30px',display:'flex',justifyContent:"space-between"}}>
          

            <div className="FromMarkeButtonP">
              <Link to={'ShowMypro'}>
              <div>
                   <button  className="b" >
                  <span>
                   <FontAwesomeIcon icon={faEye} style={{marginRight:'7px'}} />{size.size > 1000 ?'Show My Product':'Show'}
                  </span>
              </button>
              </div>
              </Link>
            </div>


            <div className="FromMarkeButtonP" >
              <Link to={'Addpro'}>
              <div>
                   <button  className="b" >
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>{size.size > 1000 ?'Add Product':'Add'}
                  </span>
              </button>
              </div>
              </Link>
            </div>


       </div>

        {allPro? <div>   <h2 style={{textAlign:'center',marginTop:'-90px',marginBottom:'20px',zIndex:"3"}}> <FontAwesomeIcon icon={faTruckRampBox} style={{marginRight:'20px'}} />All Proudct</h2></div>:""}
            


           {search.length == 0  ?
             <div style={{display:'flex',gap:'10px',flexDirection:'row',flexWrap:'wrap',padding:'10px',paddingLeft:'40px',justifyContent:size.size>1000?"none":"center",background:'#ede3ef'}}>
                  {allPro.length>0?
                    allPro.map((e,i)=>{
                       return <StructurePro key={i} images={e.Images} id={e._id} adr={e.adr} Titel={e.Titel} Price={e.Price} des={e.des} imagePro={e.imagePro} NumDes={e.des.split('')} nn={e.des.length}/>
                    })
                  :<div className="ProNotExsit">
                       <FontAwesomeIcon icon={faStoreSlash} /> Prouduct Not Exsit
                  </div>}
            </div>
           :
            <div style={{display:'flex',gap:'10px',flexDirection:'row',flexWrap:'wrap',padding:'10px',paddingLeft:'40px'}}>
                  {search.length>0 ?
                  search.filter((e)=>e.Titel.toLowerCase().includes(inp.trim().toLowerCase())).map((e,i)=>{
                       return <StructurePro key={i} images={e.Images} id={e._id} adr={e.adr} Titel={e.Titel} Price={e.Price} des={e.des} imagePro={e.imagePro} NumDes={e.des.split('')} nn={e.des.length}/>
                    })
                  :"not exsit"
                
            }
            </div>
           }




           
           


        </div>
    )
}

