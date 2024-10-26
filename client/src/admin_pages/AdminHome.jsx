import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminLogoutBtn from '../components/AdminLogoutBtn';

function AdminHome() {
  const navigate = useNavigate()
  // const dispatch = useDispatch();
  const {isAdminLoggedIn, admin} = useSelector(state => state.adminAuth);
  useEffect(() => {
    if(!isAdminLoggedIn){
      navigate('/admin/login');
    }
  }, [isAdminLoggedIn,navigate]);
  return (
    <div>{admin?.fullname} <AdminLogoutBtn/></div>
  )
}

export default AdminHome;