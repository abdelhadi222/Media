import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceDizzy} from "@fortawesome/free-solid-svg-icons";
export default function Err404() {
    return(
         <div style={{height:'100vh',
        display:'flex',
        flexDirection:'column'
        ,gap:'30PX',justifyContent:'center',alignItems:'center',color:'rgb(180, 180, 180)'}}>

            <div><p style={{fontSize:'40PX'}}> 404 : Sorry , This Page is not Found </p></div>
          <div> <FontAwesomeIcon style={{fontSize:'40PX'}} icon={faFaceDizzy} /></div>
        </div>
    )
}