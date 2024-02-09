
import axios from "axios"
import { useEffect } from "react";
export default function callback() {
    useEffect(()=>{
         getData()
    },[])
    async function getData() {
         try {
            const res = await axios.get("http://localhost:5500/auth/google/callback")
             console.log(res);
         } catch (err) {
            console.log(err);
         }
    }
    return(
        <div>
             hII
        </div>
    )
}