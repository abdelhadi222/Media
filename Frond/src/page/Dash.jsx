import { Outlet } from "react-router-dom";
import SideBar from "../Compents/SideBar";
import  {Windo} from "../Context/Windo";
import { useContext } from 'react';
import TopBar from "../Compents/TopBar";

export default function Dash() {
       let size = useContext(Windo)
  console.log("soze =>" , size.size);
  
    return(
        <div className="pra">
            <div style={{width:"100%"}}>
                   <TopBar/>
            </div>
            <SideBar/>
            <div className="conteno" style={{left:size.size > 1000?"17%":'40px',width:size.size>1000?'83%':'95%'}}>
                 <Outlet/>
            </div>
       
              
            {/* <button className="butForProblem">
                Message
            </button> */}
        </div>
    )
}