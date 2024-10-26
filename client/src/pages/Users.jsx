import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Users() {
    const {username} = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate('');
    const {isLoggedIn, user} = useSelector(state => state.auth);
    const loggedUser = user
    useEffect(() => {
      if(!isLoggedIn){
        navigate('/login');
      }
    }, [isLoggedIn,navigate]);


    if(username === loggedUser?.username){
      navigate('/profile')
    }
    useEffect(() => {
      if(username){
        const loadingToast = toast.loading('Loading user info..!')
        axios.get(`/users/user/${username}`,{
          withCredentials: true 
        })
        .then((res)=> res?.data?.data)
        .then((res)=> { 
          toast.success('User found successfully..!',{id: loadingToast})
          setData(res)})
        .catch((err)=> {
            setData(false)
            toast.error(err?.response?.data?.message,{id: loadingToast})
        })
      }
    }, [username])
    
    if(data === false){
      return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          User Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          We couldn't find the user you were looking for.
        </p>
        <Link to={'/'}>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
          Go back to Home
        </button>
        </Link>
      </div>
    </div>
      )
    }
  return (
    <> 
    <div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">

      {/* User Profile Card */}
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 dark:text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">User Profile</h1>
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 mb-4">
            {/* Avatar Placeholder */}
            <img
              className="rounded-full h-full w-full border-4 border-gray-300 dark:border-gray-700"
              src={data?.avatar || '../user.svg'}
              alt={`User Avatar`}
            />
          </div>
          <div className="text-lg">
            <p><span className="font-bold">User ID:</span> {data?._id}</p>
            <p><span className="font-bold">Name:</span> {data?.fullname}</p>
            <p><span className="font-bold">Email:</span> {data?.email}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Users;