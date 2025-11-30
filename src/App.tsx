import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './page/login/login'
import MainPage from './page/main/main'
import ProfilePage from './page/profile/profile'
import ChatPage from './page/chat/chat'
import type {IUser} from "./model/user";

//TODO chage routes after create pages

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<LoginPage/>}/>
        <Route path='/map' element = {<MainPage/>}/>
        <Route path='/profile' element = {<ProfilePage/>}/>
        <Route path='/chats' element = {<ChatPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
