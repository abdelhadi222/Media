
import Sing from "./AddUsr/Sing"
import Dash from "./page/Dash"
import Login from "./AddUsr/Login"
import Home from "./page/Home"
import Callback from "./page/CallBack"
import { Routes,Route } from "react-router-dom"
import Requer from "./page/Requer/Requer"
import Err404 from "./page/Err/Err404"
import ShowProfile from "./page/ShowProfile/ShowProfile"
import ConEmail from "./Compents/conformation/ConEmail"
import Forget from "./page/ForgetPassword/Forget"
import AddPassword from "./Compents/AddPassword/AddPassword"
import Profile from "./page/Profile/Profile"
import Save from "./page/Save/Save"
import ShowPost from "./page/ShowPost/ShowPost"
import Market from "./page/Market/Market"
import AddPro from "./page/Market/AddPro"
import Problames from "./page/Settings/Problames"
import Settings from "./page/Settings/Settings"
import ShowDPro from "./page/Market/ShowDPro"
import UpdateUsr from "./page/UpdateUsr/UpdateUsr"
import UpdatePassword from "./page/UpdateUsr/UpdatePassword"
import ShowMyPro from "./page/ShowMyPro/ShowMyPro"
import UpdatePro from "./page/UpdatePro/UpdatePro"
import MessageMedia from "./page/MessageMedia/MessageMedia"
import Chat from "./page/MessageMedia/Chat"
import Admin from "./page/Admin/Admin"
import ReAdmin from "./page/Requer/ReAdmin"
import UpdetUserAdmin from "./page/Admin/UpdetUserAdmin"

function App() {


  return (
    <>
       <Routes>
          <Route path={'/'} element={<Login/>}/>
          <Route path={'/Sing'} element={<Sing/>}/>
          <Route path={'/auth/google/callback'} element={<Callback/>}/>
          <Route path={'/confirm/:emailTk'} element={<ConEmail/>}/>
          <Route path={'/forget'} element={<Forget/>}/>
          <Route path={'/AddPassword/:emailTk'} element={<AddPassword/>}/>
                 
        
          <Route path='/*' element={<Err404/>}/>
  

           <Route element={<Requer/>}>
              <Route path={"/dash"} element={<Dash/>}>
                 <Route path={'Home'} element={<Home/>}/>
                 <Route path={'Profile'} element={<Profile/>}/>
                 <Route path={'Profile/ShowProfile/:key'} element={<ShowProfile/>}/>
                 <Route path={'Home/Profile'} element={<Profile/>}/>
                 <Route path={'Home/Message/:id'} element={<Chat/>}/>
                 <Route path={'Saved'} element={<Save/>}/>
                 <Route path={'Message'} element={<MessageMedia/>}/>
                  <Route path={'Message/:id'} element={<Chat/>}/>
                 <Route path={'market'} element={<Market/>}/>
                 <Route path={'market/ProById/:idPro/:key'} element={<ShowProfile/>}/>
                 <Route path={'Home/ShowProfile/:key'} element={<ShowProfile/>}/>
                 {/* <Route path={'Saved/Show/:key'} element={<ShowProfile/>}/> */}
                  <Route path={'Saved/ShowProfile/:key'} element={<ShowProfile/>}/>

                 Saved/ShowProfile
                 
                 <Route path={'Saved/ShowPost/:key'} element={<ShowPost/>}/>
                 <Route path={'market/Addpro'} element={<AddPro/>}/>
                 <Route path={'market/ProById/:idPro'} element={<ShowDPro/>}/>
                 {/* <Route path={'market/ShowMypro/:idPro'} element={<ShowDPro/>}/> */}
                 <Route path={'settings'} element={<Settings/>}/>
                 <Route path={'settings/Update'} element={<UpdateUsr/>}/>
                 <Route path={'settings/UpdatePassword'} element={<UpdatePassword/>}/>
                  <Route path={'settings/SingleProblames'} element={<Problames/>}/>
                   <Route path={'market/ShowMypro'} element={<ShowMyPro/>}/>
                   <Route path={'market/ShowMypro/:idPro'} element={<UpdatePro/>}/>

                   <Route element={<ReAdmin Role={true}/>}>
                       <Route path={'AllUsers'} element={<Admin/>}/>
                       <Route path={'AllUsers/:id'} element={<UpdetUserAdmin/>}/>
                       {/* <Route path={'AllUsers/ProById/:idPro'} element={<ShowDPro/>}/> */}
                  </Route>

                   
                 
                 
                    {/* <Route path={'Home/Profile'} element={<Profile/>}/>
                 <Route path={'Saved/ShowProfile/:key'} element={<ShowProfile/>}/> */}
            
              </Route>
           </Route>

       </Routes>
    </>
  )
}

export default App
