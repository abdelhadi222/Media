
import ReactDOM from 'react-dom/client'
import Save from "./Context/Save.jsx"
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import  SocketContext  from './Context/Socekt.jsx'
import Windo from "./Context/Windo.jsx"
import  Meun  from './Context/Meun.jsx'
import Peerr from "./Context/Peer.jsx"
import New from "./Context/New.jsx"
import  NotiMessage from './Context/NotiMessage.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SocketContext>
    <New>
    <NotiMessage>
     <Peerr>
      <Meun>
        <Windo>
          <Save>
             <App />
          </Save>
        </Windo> 
      </Meun> 
    </Peerr>
    </NotiMessage> 
   </New> 
  </SocketContext>
  </BrowserRouter>,
)
