import { createContext, useEffect, useState } from "react";
import Peer from "peerjs";
export const Peerr = createContext({})
export default function UserProvider({children}){

    const [peerId,setPeerId] = useState('')
    const [atherPeer,setAtherPeer] = useState('')
    const [test,setTest] = useState(false)
    const [go,setGo] = useState(false)
    const [peer,setPeer] = useState('')
    const [bo,setBo]=useState(false)
     const [showEnd,setShowEnd]=useState(false)
     const [ca,setCa] = useState(true)
          const [peerSend,setPeerSend] = useState(true)

    useEffect(()=>{
     let peerr = new Peer()
           setPeer(peerr)
           console.log('PPPPpPPPpPpPpPpPpPPp', peerr);
            // console.log('The Peer => ' , peer);
            // pe.setPeer(peer)
             
            peerr.on('open', (id) => {
              console.log('Cnx Peer Is => ', id);
              setPeerId(id)
             });

            
      },[])

      console.log('Peer iD from context =>' , peer);

      atherPeer.length > 0 && console.log('Ather Peer is =>' , atherPeer);

  
  return <Peerr.Provider value={{peerSend,setPeerSend,ca,setCa,showEnd,setShowEnd,bo,setBo,peerId,setPeerId,peer,setPeer,setAtherPeer,atherPeer,test,setTest}}>{children}</Peerr.Provider>
}