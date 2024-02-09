import {createContext, useState } from "react";

export const Indx  = createContext("")
export default function MeunCont({children}) {
    const [indx,setIndx] =useState(true) 
    return <Indx.Provider value={{indx,setIndx}}>{children}</Indx.Provider>
}