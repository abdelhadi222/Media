import {createContext, useState } from "react";

export const Meun  = createContext("")
export default function MeunCont({children}) {
    const [isopen,setIsopen] =useState(true) 
    return <Meun.Provider value={{isopen,setIsopen}}>{children}</Meun.Provider>
}