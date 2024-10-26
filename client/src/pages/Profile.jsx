

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function Profile() {
  const {isLoggedIn, user} = useSelector(state => state?.auth);
  const data = user;
  const navigate = useNavigate();
    useEffect(() => {
      if(!isLoggedIn){
        navigate('/login')
      }
    }, [isLoggedIn,navigate]);

  return (
    <>
    {data && <div>
    <div className="flex flex-col items-center bg-gray-100 min-h-screen dark:bg-gray-800 dark:text-gray-200">
      {/* Profile Cover */}
      <div className="w-full bg-white shadow-md dark:bg-gray-800">
        <Link to={'/update-profile'}>
        <div className="relative h-48 md:h-60 bg-cover bg-center bg-no-repeat" 
             style={{ backgroundImage: `url(${data?.coverImg || './cover.jpg'})` }}>
          {/* Profile Picture */}
          <div className="absolute bottom-0 left-4 md:left-8 -mb-12">
            <img
              src={data?.avatar || './user.svg'}
              alt="User Avatar"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full  border-4 border-white"
            />
          </div>
        </div>
        </Link>

        {/* User Info Section */}
        <div className="mt-12 p-4 md:p-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-300">{data?.fullname}</h1>
          <p className="text-gray-500 dark:text-gray-500">@{data?.username}</p>
          <p className="mt-2 text-gray-600">
            Developer at XYZ Company | Lives in San Francisco | Joined January 2020
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-gray-400 mt-4">
          <div className="flex justify-center space-x-6 md:space-x-12 p-2 dark:bg-gray-700">
            <button className="text-blue-500 hover:text-blue-700 font-semibold">Posts</button>
            <button className="text-gray-400 hover:text-blue-700 font-semibold">About</button>
            <button className="text-gray-400 hover:text-blue-700 font-semibold">Friends</button>
            <button className="text-gray-400 hover:text-blue-700 font-semibold">Photos</button>
            <button className="text-gray-400 hover:text-blue-700 font-semibold">More</button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl mt-8 px-4 md:px-0 dark:bg-gray-800">
        {/* Left Sidebar */}
        <div className="md:w-1/3 md:pr-4 mb-6 md:mb-0 dark:bg-gray-800">
          <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Intro</h2>
            <p className="text-gray-600 mt-2 dark:text-gray-500">Software Engineer at XYZ Company</p>
            <p className="text-gray-600 mt-2 dark:text-gray-500">Lives in San Francisco, CA</p>
            <p className="text-gray-600 mt-2 dark:text-gray-500">Joined January 2020</p>
          </div>
        </div>

        {/* Main Profile Feed */}
        <div className="md:w-2/3 dark:bg-gray-800">
          <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Posts</h2>
            <div className="mt-4 dark:bg-gray-800">
              {/* Sample Post */}
              <div className="p-4 bg-gray-100 rounded-lg mb-4 dark:bg-gray-800">
                <div className="flex items-center space-x-4">
                  <img
                    src={data.avatar || './user.svg'}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className='dark:bg-gray-800'>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-300">{data?.fullname}</h3>
                    <p className="text-gray-500 text-sm">Posted on September 23, 2024</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 dark:text-gray-500">
                  Just started a new project! Excited to share it with everyone soon.
                </p>
              </div>
            </div>


            <div className="mt-4 dark:bg-gray-800">
              {/* Sample Post */}
              <div className="p-4 bg-gray-100 rounded-lg mb-4 dark:bg-gray-800">
                <div className="flex items-center space-x-4 ">
                  <img
                    src={data.avatar || './user.svg'}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-300">{data?.fullname}</h3>
                    <p className="text-gray-500 text-sm">Posted on September 23, 2024</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 dark:text-gray-500">
                  Just started a new project! Excited to share it with everyone soon.
                </p>
              </div>
            </div>


          </div>
          <div className='text-center dark:text-gray-400'>No more post...!</div>
        </div>
      </div>
    </div>
      </div>}
    </>
  )
}

export default Profile