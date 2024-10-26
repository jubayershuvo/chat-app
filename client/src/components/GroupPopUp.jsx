import { XIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeletion from "./Skeletion";
import { setChatsList, setSelectedUser } from "../store/usersSlice";


const GroupPopUp = ({setGroupPopUp, group }) => {
  const { chatList } = useSelector(state => state.Users);
  const [results, setResult] = useState([]);
  const [search, setSearch] = useState('');
  const [groupName, setGroupName] = useState();  
  const [isLoading, setIsLoading] = useState(false); 
  const dispatch = useDispatch()

  const removeListMember = (user)=>{

  };
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

  const leaveGroup = ()=>{
    
  };
  const addMember =async(userId)=>{
    try {
      const res = await axios.put(`/chats/group-member-add`,{
        chatId:group._id,
        userId:userId
      }, {
        withCredentials: true,  // Ensure cookies are included in the request
      });
      console.log(res)
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  const handleSubmit = async()=>{
    if(groupName){
      try {
        const res = await axios.put('/chats/group-rename',{
          chatId: group._id,
          chatName:groupName
        },{withCredentials:true})
        const newList = chatList.map(user => {
          if (user._id === group._id) {
            return { ...user, ...res.data?.data[0] }; // Merge old object with new data
          }
          return user; // Return unchanged object for all other users
        });
        dispatch(setSelectedUser(res.data?.data[0]));
        dispatch(setChatsList(newList));
        setGroupPopUp(false)
      } catch (error) {
        console.log(error)
      }
    }

  }

  return (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <div className="dark:text-white">
              <div className="">
                <img src={group.groupAdmin.avatar} alt="" className="w-60 h-60 m-auto rounded-full" />
                <div className="flex overflow-auto overflow-y-hidden custom-scrollbar my-2">
                {group.users && group.users.map(u=>(
                  <div key={u._id} className="flex bg-green-400 max-w-28 h-8 p-1 rounded-md mx-2 text-sm">
                    {u.fullname}
                    <div className="">
                    <XIcon onClick={()=> removeListMember(u)} className="h-4 w-4 m-1 cursor-pointer" aria-hidden="true" />
                    </div>
                  </div>
                  ))}
                </div>
                <div className="m-2">
                  <input
                  value={groupName}
                  onChange={e=> setGroupName(e.target.value)}
                   type="text" placeholder={group.chatName} className="w-full text-gray-900 border-2 h-8 justify-center text-center p-1 m-1 rounded outline-none"/>
                  <input
                  value={search}
                  onChange={handleSearch}
                   type="text" placeholder='Add member' className="w-full text-gray-900 border-2 h-8 justify-center text-center p-1 m-1 rounded outline-none"/>
                  <div className="">
          <ul className='max-h-60 overflow-y-scroll custom-scrollbar'>
            {isLoading ? (
              <Skeletion />
            ) : (
              <>
                {results && results.map(user => (
                  <li onClick={()=> addMember(user._id)} className='h-18 dark:bg-gray-700 rounded' key={user._id}>
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

                <div className="mt-4 flex justify-end">
        <button
        onClick={handleSubmit}
          className="px-4 m-auto py-2 bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-100 rounded-md hover:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          Save
        </button>
        <button
        onClick={leaveGroup}
          className="px-4 m-auto py-2 bg-red-500 text-white dark:bg-red-700 dark:text-gray-100 rounded-md hover:bg-blue-600 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          Leave
        </button>
      </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md"
                onClick={() => setGroupPopUp(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
  );
};

export default GroupPopUp;
