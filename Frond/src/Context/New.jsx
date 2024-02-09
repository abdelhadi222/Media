import { createContext, useState } from "react";
export const New = createContext({})
export default function UserProvider({children}){

    const [code,setCode] = useState(false)
     const [cami,setCami] = useState(false)
    
  
  return <New.Provider value={{code,setCode,cami,setCami}}>{children}</New.Provider>
}