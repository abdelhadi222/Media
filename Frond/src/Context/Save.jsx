import { createContext, useState } from "react";
export const Save = createContext({})
export default function UserProvider({children}){

    const [sss,setSss] = useState(false)
     const [ih,setIh] = useState(false)
          const [tt,setTt] = useState(false)
  
  return <Save.Provider value={{tt,setTt,sss,setSss,ih,setIh}}>{children}</Save.Provider>
}