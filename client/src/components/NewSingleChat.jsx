import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChatsList, setIsPopUpOpen, setSelectedUser } from '../store/usersSlice';
import toast from 'react-hot-toast';
import Skeletion from './Skeletion';

function NewSingleChat() {
  const { chatList } = useSelector(state => state.Users);
  const dispatch = useDispatch()
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await axios.get(`/users/search-users?search=${search}`, {
        withCredentials: true,  // Ensure cookies are included in the request
      });
      setResult(res?.data?.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
      setResult([])
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = async (user) => {
    const loadingToast = toast.loading('Chat opening..!')
    axios.post(`/chats`, {
      _id: user._id
    }, {
      withCredentials: true  // Ensure cookies are included in the request
    })
    .then(res => {
      dispatch(setSelectedUser(res?.data?.data));
      dispatch(setIsPopUpOpen(false));
      toast.success('Chat loaded..!', {id: loadingToast})

      const inChatList = chatList.some(user => user._id === res?.data?.data?._id);
      if(!inChatList){
        dispatch(setChatsList([res.data?.data, ...chatList]));
      }
    })
    .catch(_error => { 
      toast.error('Chat loading faild..!',{id: loadingToast})
    });
  };

  return (
    <div className="justify-center mt-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Create New Single Chat
      </h2>
      <form onSubmit={handleSearch} className='m-0 p-0 flex'>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full max-w-md px-4 py-2 bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none"
        />
        <button
          type='submit'
          className="px-4 py-2 bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-100 rounded-r-md hover:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none"
        >
           {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className='w-full mt-4'>
        <ul className='max-h-60 overflow-y-scroll custom-scrollbar'>
          {isLoading ? <Skeletion/>:<>
            {result && result.map(user => (
            <li key={user._id} className='mt-1' onClick={() => handleChat(user)}>
              <div className="flex m-1 dark:bg-gray-500 bg-slate-400 rounded-md p-1">
                <img src={user.avatar || "../user.svg"} alt="" className='w-12 h-12 rounded-full' />
                <div className="">
                  <p className='mx-3 text-gray-900 dark:text-gray-200'>{user.fullname}</p>
                  <p className='mx-3 text-gray-900 dark:text-gray-400'>@{user.username}</p>
                </div>
              </div>
            </li>
          ))}
          </>
          }
        </ul>
      </div>
    </div>
  );
}

export default NewSingleChat;
