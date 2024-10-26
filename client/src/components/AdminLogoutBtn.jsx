import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { adminLogout } from '../store/adminSlice';

function AdminLogoutBtn() {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = ()=>{
      axios.get('/admin/logout',{
        withCredentials: true 
      })
      .then(res => {
        dispatch(adminLogout());
        toast.success('Logged out successfully..!')
        navigate('/admin/login')
      })
      .catch((err)=> console.log(err));

    }
  return (
    <div>
      <button
      onClick={handleLogout}
      className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
    >
      Logout
    </button>
    </div>
  )
}

export default AdminLogoutBtn;