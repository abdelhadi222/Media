import { Navigate, Outlet } from "react-router-dom"
import Err403 from "../Err/Err.403"
import { useEffect, useState } from "react"
import Loding from "../Loding/Loding"
import axios from 'axios'


export default function Requer({Role}) {
    const token = window.localStorage.getItem('token')
    const [user,setUser] = useState('')
    const [t,setT] = useState(true)
    useEffect(()=>{
        getUser()
    },[])
    async function getUser() {
        try {
            const res= await axios.get('http://localhost:5500/api/User',{headers:{token:token}})
              setT(false)
              setUser(res.data)
        } catch (err) {
             console.log('err is' , err);
        }
    }


    return  token ?(user==30 || t   ?'':<Outlet/>):<Navigate to={"/"}/>
}