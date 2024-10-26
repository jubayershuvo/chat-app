import axios from 'axios';
import React, { useState } from 'react';
import Skeletion from './Skeletion';
import {XIcon} from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { setChatsList, setIsPopUpOpen, setSelectedUser } from '../store/usersSlice';

function NewGroupChat() {
  const { chatList } = useSelector(state => state.Users);
  const [results, setResult] = useState([]);
  const [search, setSearch] = useState('');
  const [groupName, setGroupName] = useState('');  
  const [isLoading, setIsLoading] = useState(false); 
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch()

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    setIsLoading(true);
    try {
      const res = await axios.get(`/users/search-users?search=${e.target.value}`, {
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

  const groupMembers = async(userToAdd)=>{
      if(selectedUsers.includes(userToAdd)){
        toast.error('User already in..!')
      }else{
        setSelectedUsers([...selectedUsers, userToAdd])
      }
  };

  const removeListMember = (removeUser)=>{
      setSelectedUsers(selectedUsers.filter(sel=> sel._id !== removeUser._id))
  };

  const handleSubmit = async()=>{
    if(!groupName || !selectedUsers){
      toast.error('Fill all the fields..!')
    }else{
        try {
          const res = await axios.post('/chats/group',{
            name:groupName,
            users: JSON.stringify(selectedUsers.map(u => u._id)).trim()
          },{withCredentials:true});
          dispatch(setSelectedUser(res.data?.data[0]));
          dispatch(setChatsList([...(res.data?.data), ...chatList]));
          dispatch(setIsPopUpOpen(false));

        } catch (error) {
          toast.error(error.response.data.message)
        }
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 w-full">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Create New Group Chat
      </h2>

      <div className="mt-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Group Name</label>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName} // Added value binding
          onChange={(e) => setGroupName(e.target.value)} // Added onChange handler
          className="w-full px-4 py-2 border bg-gray-100 dark:bg-slate-800 dark:text-gray-300 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Members</label>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder='Add member'
          className="w-full mb-2 bg-gray-100 dark:text-gray-300 px-4 py-2 border dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md"
        />

        <div className="flex overflow-auto overflow-y-hidden custom-scrollbar my-2">
          {selectedUsers && selectedUsers.map(u=>(
            <div key={u._id} className="flex bg-green-400 max-w-28 h-8 p-1 rounded-md mx-2 text-sm">
              {u.fullname}
              <div className="">
              <XIcon onClick={()=> removeListMember(u)} className="h-4 w-4 m-1 cursor-pointer" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <ul className='max-h-60 overflow-y-scroll custom-scrollbar'>
            {isLoading ? (
              <Skeletion />
            ) : (
              <>
                {results && results.map(user => (
                  <li onClick={()=> groupMembers(user)} className='h-18 dark:bg-gray-700 rounded' key={user._id}>
                    <div className="flex">
                      <img className='w-14 h-14 p-1 rounded-full' src={user.avatar || "../user.svg"} alt="" />
                      <div className="ml-4">
                        <p className='text-gray-900 dark:text-gray-200'>{user.fullname}</p>
                        <p className='text-gray-800 dark:text-gray-400'>@{user.username}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
        onClick={handleSubmit}
          className="px-4 m-auto py-2 bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-100 rounded-md hover:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          Create Group
        </button>
      </div>
    </div>
  );
}

export default NewGroupChat;
