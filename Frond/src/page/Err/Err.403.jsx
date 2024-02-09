import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket} from "@fortawesome/free-solid-svg-icons";
export default function Err403() {


    return(
        <div style={{height:'100vh',
        display:'flex',
        flexDirection:'column'
        ,gap:'30PX',justifyContent:'center',alignItems:'center',color:'rgb(180, 180, 180)'}}>

            <div><p style={{fontSize:'40PX'}}> 403 : Oups , you have not access for This Page </p></div>
          <div>   <FontAwesomeIcon style={{fontSize:'40PX'}} icon={faTicket} /></div>
        </div>
    )
}