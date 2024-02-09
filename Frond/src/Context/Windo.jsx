import { createContext, useEffect, useState } from "react"

export const Windo = createContext("")
 export default function WindoS({children}){
      const [size,setSize] = useState(innerWidth)
      useEffect(()=>{
         function mo() {
            setSize(innerWidth)
         }
         window.addEventListener('resize',mo)
         return ()=>{
              window.removeEventListener('resize',mo)
         }
      },[])

    return <Windo.Provider  value={{size}}>{children}</Windo.Provider>
}