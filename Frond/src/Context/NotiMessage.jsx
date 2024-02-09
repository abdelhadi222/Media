import { createContext, useState } from "react";
export const NotiMessage = createContext({})
export default function UserProvider({children}){

    const [notiMessage,setNotiMessage] = useState([])
    console.log('jhfhdgfhdgfhdguryytryz=>' , notiMessage);
  
  return <NotiMessage.Provider value={{notiMessage,setNotiMessage}}>{children}</NotiMessage.Provider>
}