import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './admin_pages/AdminLogin';
import AdminHome from './admin_pages/AdminHome';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { adminLogout } from './store/adminSlice';
import Members from './admin_pages/Members';
import AdminNavbar from './layouts/AdminNavBar';

function AdminRouter() {
  const dispatch = useDispatch()
  const {isAdminLoggedIn, admin} = useSelector(state => state?.adminAuth);



  useEffect(() => {
    if(isAdminLoggedIn){
      axios.post('/admin/refresh-token', {
        adminRefreshToken: admin?.adminRefreshToken
      }, {
        withCredentials: true  // Ensure cookies are included in the request
      })
      .then(res=>{
        console.log(res?.data?.message)
      })
      .catch(error =>{ 
        console.log(error?.response?.data?.message);
        dispatch(adminLogout());
      },[isAdminLoggedIn]);

    }
  });

  return (
    <>

      <Routes>
        <Route path="/" element={<AdminNavbar/>}>
        <Route index element={<h1>Home</h1>}/>
        <Route path='dashboard' element={<AdminHome/>}/>
        <Route path="members" element={<Members/>} />
        </Route>
        <Route path="login" element={<AdminLogin />} />
      </Routes>
    </>
  )
}

export default AdminRouter