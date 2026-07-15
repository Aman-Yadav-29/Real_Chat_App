// This is the main App component of our React application. 
// We will define our routes here and render the corresponding components based on the route.
// We have defined three routes here, one for the homepage, one for the login page and one for the profile page.
import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import assets from './assets/assets'
import Homepage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'

// The App component is the main component of our application. It will render the corresponding components based on the route.
// We have defined three routes here, one for the homepage, one for the login page and one for the profile page. We will add more routes as we build our application.
const App = () => {

  const { authUser } = useContext(AuthContext)

  return (
    <div 
      className="w-full h-screen"
        style={{
          backgroundImage: `url(${assets.chat_background_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
    >
      <Toaster/>
      <Routes>
        <Route path = '/' element = {authUser ? <Homepage/> : <Navigate to = "/login"/>}/>
        <Route path = '/login' element = {!authUser ? <LoginPage/> : <Navigate to = "/"/>}/>
        <Route path = '/profile' element = {authUser ? <ProfilePage/> : <Navigate to = "/login"/>}/>
      </Routes>
    </div>
  )
}

export default App
