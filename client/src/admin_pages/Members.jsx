import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAllUsers } from '../store/usersSlice';
import { UserIcon } from '@heroicons/react/solid';

function Members() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {isAdminLoggedIn} = useSelector(state => state.adminAuth);
  const {all_users} = useSelector(state => state.Users);
  const [selectedValue, setSelectedValue] = useState('all');

  useEffect(() => {
    if(!isAdminLoggedIn){
      navigate('/admin/login');
    }
    if(all_users === null){
      const loadingToast = toast.loading(`Refreshing list...!`)
      axios.get('/admin/all-users', {
      withCredentials: true 
      })
      .then(res=>{
        dispatch(setAllUsers(res?.data?.data));
        toast.success(res?.data?.message,{id: loadingToast})
      })
      .catch(error =>{ 
        toast.error(error?.response?.data?.message);
      });
    }
  }, [isAdminLoggedIn,all_users,dispatch,navigate]);

  const listRefresh = ()=>{
    console.log(selectedValue)
    if(selectedValue === 'all'){
      const loadingToast = toast.loading(`Refreshing list...!`)
    axios.get('/admin/all-users', {
      withCredentials: true 
    })
    .then(res=>{
      dispatch(setAllUsers(res?.data?.data));
      toast.success(res?.data?.message,{id: loadingToast})
    })
    .catch(error =>{ 
      toast.error(error?.response?.data?.message);
    });
    }else
    if(selectedValue === 'fresh'){
      const loadingToast = toast.loading(`Refreshing list...!`)
    axios.get('/admin/fresh-users', {
      withCredentials: true 
    })
    .then(res=>{
      dispatch(setAllUsers(res?.data?.data));
      toast.success(res?.data?.message,{id: loadingToast})
    })
    .catch(error =>{ 
      toast.error(error?.response?.data?.message);
    });
    }else
    if(selectedValue === 'banned'){
      const loadingToast = toast.loading(`Refreshing list...!`)
    axios.get('/admin/banned-users', {
      withCredentials: true 
    })
    .then(res=>{
      dispatch(setAllUsers(res?.data?.data));
      toast.success(res?.data?.message,{id: loadingToast})
    })
    .catch(error =>{ 
      toast.error(error?.response?.data?.message);
    });
    }
  };

   const handleChange = (event) => {
    setSelectedValue(event.target.value);

    if(event.target.value === 'all'){
      const loadingToast = toast.loading(`Loading all members...!`)
      axios.get('/admin/all-users', {
      withCredentials: true 
      })
      .then(res=>{
        dispatch(setAllUsers(res?.data?.data));
        toast.success(res?.data?.message,{id: loadingToast})
      })
      .catch(error =>{ 
        toast.error(error?.response?.data?.message);
      });
    }else
    if(event.target.value === 'fresh'){
      const loadingToast = toast.loading(`Loading all members...!`)
      axios.get('/admin/fresh-users', {
      withCredentials: true 
      })
      .then(res=>{
        dispatch(setAllUsers(res?.data?.data));
        toast.success(res?.data?.message,{id: loadingToast})
      })
      .catch(error =>{ 
        toast.error(error?.response?.data?.message);
      });
    }else
    if(event.target.value === 'banned'){
      const loadingToast = toast.loading(`Loading all members...!`)
      axios.get('/admin/banned-users', {
      withCredentials: true 
      })
      .then(res=>{
        dispatch(setAllUsers(res?.data?.data));
        toast.success(res?.data?.message,{id: loadingToast})
      })
      .catch(error =>{ 
        toast.error(error?.response?.data?.message);
      });
    }

  };

  const [search, setSearch] = useState('');
  const handleSearch =(e)=>{
    e.preventDefault();
        const loadingToast = toast.loading(`Finding ${search}...!`)
        axios.get(`/admin/user?search=${search}`,{
        withCredentials: true 
        })
        .then(res=>{
          dispatch(setAllUsers(res?.data?.data))
          toast.success(res?.data?.message,{id: loadingToast})
        })
        .catch(error =>{ 
          toast.error(error?.response?.data?.message, {id:loadingToast});
        });
      setSearch('')

  }

  const banUser = async(username)=>{
      if(username){
        const loadingToast = toast.loading(`Baning ${username}...!`)
        axios.get(`/admin/ban-user/${username}`,{
        withCredentials: true 
        })
        .then(res=>{
          dispatch(setAllUsers(res?.data?.data))
          console.log(res?.data?.data)
          toast.success(res?.data?.message,{id: loadingToast})
        })
        .catch(error =>{ 
          toast.error(error?.response?.data?.message, {id:loadingToast});
        });

      }
  };

  const UnbanUser = async(username)=>{
      if(username){
        const loadingToast = toast.loading(`Unbaning ${username}...!`)
        axios.get(`/admin/unban-user/${username}`,{
        withCredentials: true 
        })
        .then(res=>{
          dispatch(setAllUsers(res?.data?.data));
          console.log(res?.data?.data)
          toast.success(res?.data?.message,{id: loadingToast})
        })
        .catch(error =>{ 
          toast.error(error?.response?.data?.message, {id:loadingToast});
        });

      }
    };
    
    
    
    const deleteUser = async(username)=>{
      if(username){
        const loadingToast = toast.loading(`Unbaning ${username}...!`)
        axios.get(`/admin/delete-user/${username}`,{
        withCredentials: true 
        })
        .then(res=>{
          dispatch(setAllUsers(res?.data?.data));
          toast.success(res?.data?.message,{id: loadingToast})
        })
        .catch(error =>{ 
          toast.error(error?.response?.data?.message, {id:loadingToast});
        });

      }
  }
  if(all_users?.length < 1){
    return (
      <>
      <div className="flex justify-between max-w-4xl m-auto mb-4">
          <div className="">
            <h1 className='dark:text-white mx-2'>All members</h1>
            <button onClick={listRefresh} className='m-2 dark:text-white '>Refresh list</button>
          </div>
          <div className="flex">
            <div className="dark:text-white ">
            <select
              className='p-2 mt-2 mr-2 w-37 dark:bg-gray-700 rounded'
              value={selectedValue} 
              onChange={handleChange}
            >
              <option value="all">All members</option>
              <option value="fresh">Fresh members</option>
              <option value="banned">Banned members</option>
            </select>
            </div>
            <form onSubmit={handleSearch} className="relative md:block pt-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 justify-center text-center dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              </div>
              <input value={search} onChange={e => setSearch(e.target.value)} type="text" id="search-navbars" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
              </form>
          </div>
      </div>
       <div className="flex flex-col items-center justify-center h-full">
      <UserIcon className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        No User Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        We couldn’t find the user you’re looking for.
      </p>
    </div>
      </>
    )
  }

  return (
    <div style={{height:'100vh'}} className='dark:bg-slate-900 dark:text-white'>
      <div className="flex justify-between max-w-4xl m-auto mb-4">
        <div className="">
            <h1 className='dark:text-white mx-2'>All members</h1>
            <button onClick={listRefresh} className='m-2 dark:text-white '>Refresh list</button>
          </div>
            <div className="flex">
            <div className="dark:text-white ">
            <select
              className='p-2 mt-2 mr-2 w-37 dark:bg-gray-700 rounded'
              value={selectedValue} 
              onChange={handleChange}
            >
              <option value="all">All members</option>
              <option value="fresh">Fresh members</option>
              <option value="banned">Banned members</option>
            </select>
            </div>
            <form onSubmit={handleSearch} className="relative md:block pt-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 justify-center text-center mt-1 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search icon</span>
              </div>
              <input value={search} onChange={e => setSearch(e.target.value)} type="text" id="search-navbars" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
              </form>
          </div>
      </div>
    {
      all_users && all_users.map((user)=>(
        <div 
        key={user?._id}
        className="bg-white max-w-4xl m-auto dark:bg-gray-800 shadow-md rounded-lg p-3 mb-4 flex justify-between items-center"
        >
      <div className="text-gray-900 dark:text-gray-200 flex">
        <img src={user?.avatar || '../user.svg'} className='w-7 rounded-full mr-3' alt="" />
        {user?.fullname} (@{user?.username})
      </div>
      <div className="flex space-x-2">
        {user.isBanned ? <>
          <button
          onClick={() => UnbanUser(user?.username)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-all dark:bg-green-400 dark:hover:bg-green-500"
        >
          Unban
        </button>
        </>:<>
        <button
          onClick={() => banUser(user?.username)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition-all dark:bg-yellow-400 dark:hover:bg-yellow-500"
        >
          Ban
        </button>
        </>}
        <button
          onClick={() => deleteUser(user?.username)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all dark:bg-red-400 dark:hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
      ))
    }
    </div>
  )
}

export default Members;