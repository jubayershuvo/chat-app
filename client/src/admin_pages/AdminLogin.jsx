import React, { useEffect, useState } from 'react';
import DarkMode from '../components/DarkMode'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { adminLogin } from '../store/adminSlice';
import axios from 'axios';

function AdminLogin() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {isAdminLoggedIn} = useSelector(state => state.adminAuth);
  
  useEffect(() => {
    if(isAdminLoggedIn){
      navigate('/admin/dashboard');
    }
  }, [isAdminLoggedIn,navigate]);

  
    
    const [data, setData] = useState({
        admin:'',
        password:''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
            setData({
                ...data,
                [name]: value
            });
      };


      const [isChecked, setIsChecked] = useState(false);


      const checkboxHandler = (e) => {
        setIsChecked(e.target.checked);
      };


      const [passwordType, setPasswordType] = useState('password');

      useEffect(() => {
        if(isChecked){
          setPasswordType('text')
        }else if(!isChecked){
          setPasswordType('password')
        }
      }, [isChecked]);
      



      const submitHandler = async (e)=>{
        e.preventDefault();

        
        if(!data?.admin){
          toast.error("Enter Username or email...!");   
        }else if(!data?.password){
            toast.error('Enter password...!');  
        }
        else{

          const loginLoading = toast.loading('Fetching data..!')
    
        try {
          const response = await axios.post('/admin/login', {
            admin:data?.admin,
            password: data?.password
          }, {
            withCredentials: true  // Ensure cookies are included in the request
          });

          toast.success('Logged in successfully...!',{id: loginLoading});

          dispatch(adminLogin(response?.data?.data))
          navigate('/admin/dashboard')

        } catch (error) {
          toast.error(error?.response?.data?.message, {id: loginLoading})
          console.log(error)
        }
  
      }
      }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
            Admin Login
          </h2>
          <form onSubmit={submitHandler} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className='mb-3'>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  value={data?.admin}
                  onChange={handleChange}
                  id="email-address"
                  name="admin"
                  type="text"
                  className="appearance-none rounded-none dark:bg-gray-600 relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  value={data?.password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type={passwordType}
                  className="appearance-none dark:bg-gray-600 rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  checked = {isChecked}
                  onChange={checkboxHandler}
                  value={isChecked}
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  Show password
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
          </div>
        </div>
      </div>
  )
}

export default AdminLogin;