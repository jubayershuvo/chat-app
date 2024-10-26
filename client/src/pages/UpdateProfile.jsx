import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';

function UpdateProfile() { 
    const dispatch = useDispatch()
    const [coverImage, setCoverImage] = useState();
    const [avatar, setAvatar] = useState();
    const [avatarFile, setAvatarFile] = useState(null)
    const [coverFile, setCoverFile] = useState(null)
    const [formData, setFormData] = useState({})
    const {isLoggedIn, user} = useSelector(state => state?.auth);
    const loggedUser = user;


    const navigate = useNavigate();
    useEffect(() => {
      if(!isLoggedIn){
        navigate('/login')
      }
    }, [isLoggedIn,navigate]);




    // Handle Avatar change
    const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      setAvatarFile(file)
      if (file) {
        setAvatar(URL.createObjectURL(file));
      }
    };



  
    // Handle Cover Image change
    const handleCoverChange = (e) => {
      const file = e.target.files[0];
      setCoverFile(file)
      if (file) {
        setCoverImage(URL.createObjectURL(file));
      }
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
      };




      const handleSubmit = async(e)=>{
        e.preventDefault()
        if(avatarFile){
        const loadingToast = toast.loading('Updating avatar photo...')
            try {
            // Send POST request to API endpoint
            const res = await axios.patch('/users/update-avatar', {avatar: avatarFile}, {
              withCredentials: true ,
              headers: {
                'Content-Type': 'multipart/form-data',  // Important to send FormData
              },
            });
              dispatch(login(res?.data?.data))
              toast.success('Avatar updated...!', {id: loadingToast})

            } catch (error) {
              toast.error('Avatar update faild...!',{id:loadingToast})
            }
          };



        if(coverFile){
          const loadingToast = toast.loading('Updating cover photo...')
          try {
            // Send POST request to API endpoint
            const res = await axios.patch('/users/update-cover', {coverImg: coverFile}, {
              withCredentials: true ,
              headers: {
                'Content-Type': 'multipart/form-data',  // Important to send FormData
              },
            });
            dispatch(login(res?.data?.data))
            toast.success('Cover photo updated...!',{id:loadingToast});
          } catch (error) {
            toast.error('Cover photo update faild..!', {id:loadingToast})
          }
        };



        if(formData.fullname || formData.email){
          const loadingToast = toast.loading('Updating Informations...')
          try {
            // Send POST request to API endpoint
            const res = await axios.patch('/users/update-user', formData, {
              withCredentials: true ,
            });
            dispatch(login(res?.data?.data))
            toast.success('Informations updated...!', {id: loadingToast})

          } catch (error) {
            toast.error('Information update faild...!', {id: loadingToast})
          }
        }
        if(!formData && !avatarFile && !coverFile){
          toast.error('Nothing to update...!')
        }
      }
  
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 flex flex-col items-center">

       <form onSubmit={handleSubmit} className="bg-white mt-12 dark:bg-gray-800 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        {/* Cover Image Section */}
        <div className="w-full max-w-4xl mt-6 relative">
          <div className="relative">
            <img
              className="w-full h-56 object-cover rounded-lg shadow-lg"
              src={coverImage || loggedUser?.coverImg || './cover.jpg'}
              alt="Cover"
            />
            {/* Upload Cover Image Button */}
            <label className="absolute top-4 right-4 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 py-2 px-4 rounded cursor-pointer">
              Select Cover
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverChange}
              />
            </label>
          </div>
        </div>
  
        {/* Avatar and Profile Info Section */}
        <div className="w-full max-w-4xl -mt-16 flex flex-col items-center relative">
          {/* Avatar */}
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
              src={avatar || loggedUser?.avatar || './user.svg'}
              alt="Avatar"
            />
            {/* Upload Avatar Button */}
            <label className="absolute bottom-0 right-0 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 py-2 px-3 rounded-full cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <span className="text-sm">Select</span>
            </label>
          </div>
  
        </div>
        <div className="w-full max-w-md">


          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="fullname">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              name="fullname"
              value={formData?.fullname}
              onChange={handleChange}
              placeholder={loggedUser?.fullname}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              placeholder={loggedUser?.email}
            />
          </div>


          <div className="flex items-center justify-between w-full mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white m-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Change
            </button>
          </div>
      </div>
        </form>
      </div>
    );
}

export default UpdateProfile