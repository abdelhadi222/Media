import axios from "axios"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Err403 from "../Err/Err.403"

export default function ReAdmin({Role}) {
        const token = window.localStorage.getItem('token')
    const [user,setUser] = useState('')

    useEffect(()=>{
        getUser()
    },[])
    async function getUser() {
        try {
            const res= await axios.get('http://localhost:5500/api/User',{headers:{token:token}})

             setUser(res.data.user)
        } catch (err) {
             console.log('err is' , err);
        }
    }
    return   user.isAdmin == Role ? <Outlet/> :<Err403/>

}