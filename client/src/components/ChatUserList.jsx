import React from 'react';
import { setIsPopUpOpen, setSelectedUser } from '../store/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

const ChatUserList = () => {
  const {selected_user, chatList} = useSelector(state => state.Users);
  const {user} = useSelector((state) => state?.auth);
  const loggedUser = user;
  const dispatch = useDispatch()
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex justify-between">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Chats</h2>
      <button
      onClick={()=> dispatch(setIsPopUpOpen(true))}
      className="flex items-center justify-center bg-transparent border border-transparent hover:border-gray-400 hover:bg-gray-100 rounded-full"
      aria-label="Add"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
      </div>
      <ul className="mt-4 h-5/6 overflow-y-scroll custom-scrollbar">
        {chatList && chatList.map((user) => (
          <li
            key={user?._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className={`p-2 mb-2 cursor-pointer rounded-lg h-14 ${
              selected_user?._id === user?._id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}
          >
            <div className="flex items-center">
              {
                user && <img
                src={(user?.users?.length > 1 && user?.users[0]?._id === loggedUser?._id)  
                  ? user?.users[1]?.avatar || '../user.svg'
                  : user?.users[0]?.avatar || '../user.svg'}
                alt={''}
                className="w-10 h-10 rounded-full mr-3"
              />
              }
              <div>
                <p className="text-sm">{user?.isGroupChat ? 
                user?.chatName 
                : user?.users[0]?._id === loggedUser?._id ?
                user?.users[1]?.fullname : user?.users[0]?.fullname
                }</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.isGroupChat ? '3 user online':'Online'}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatUserList;
 