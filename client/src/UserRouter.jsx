import React, { useEffect } from 'react'
import NavBar from './layouts/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Activate from './pages/Activate';
import Users from './pages/Users';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DeleteAccount from './pages/DeleteAccount';
import ForgetPassword from './pages/ForgetPassword';
import VerifyForgetPassword from './pages/VerifyRequest.jsx';
import SetPassword from './pages/SetPassword.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import UpdateProfile from './pages/UpdateProfile';
import Footer from './layouts/Footer.jsx';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatApp from './pages/Chats.jsx';

import TypingIndicator from './components/TypingIndicator.jsx';

function UserRouter() {
  const {isLoggedIn, user} = useSelector(state => state?.auth);
  const data = user;



  useEffect(() => {
    if(isLoggedIn){
      axios.post('/users/refresh-token', {
        refreshToken: data?.refreshToken
      }, {
        withCredentials: true  // Ensure cookies are included in the request
      })
      .then(res=>{
        console.log(res?.data?.message)
      })
      .catch(error =>{ 
        console.log(error?.response?.data?.message);
      },[isLoggedIn]);

    }
  });
  
  return (
    <>
    <NavBar />
    <Routes>
    <Route path='/' element={<Home/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='activate' element={<Activate/>}/>
          <Route path='user/:username' element={<Users/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='delete-account' element={<DeleteAccount/>}/>
          <Route path='forget-password' element={<ForgetPassword/>}/>
          <Route path='verify-forget-password' element={<VerifyForgetPassword/>}/>
          <Route path='set-password' element={<SetPassword/>}/>
          <Route path='change-password' element={<ChangePassword/>}/>
          <Route path='update-profile' element={<UpdateProfile/>}/>
          <Route path='chats' element={<ChatApp/>}/>
          <Route path='test' element={<TypingIndicator/>}/>
    </Routes>
    <Footer/>
  </>
  )
}

export default UserRouter;