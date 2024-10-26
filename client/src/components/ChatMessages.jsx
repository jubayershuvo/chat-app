import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../store/usersSlice';
import SenderPopup from './SenderProfile';
import GroupPopUp from './GroupPopUp';
import TypingIndicator from './TypingIndicator';

const ChatMessages = ({ messages, isTyping }) => {
  const { selected_user } = useSelector(state => state.Users);
  const { user } = useSelector(state => state?.auth);
  const dispatch = useDispatch();

  const [groupProfile, setGroupProfile] = useState();
  const [senderProfile, setSenderProfile] = useState();
  const [senderPopUp, setSenderPopUp] = useState(false);
  const [groupPopUp, setGroupPopUp] = useState(false);

  const messagesEndRef = useRef(null);  // Create a ref to track the end of the messages list

  // Scroll to the bottom of the messages list when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const senderProfileHandle = () => {
    if (selected_user?.isGroupChat) {
      setGroupProfile(selected_user);
      setGroupPopUp(true);
    } else {
      const sender = selected_user?.users[0]?._id === user?._id 
        ? selected_user?.users[1] 
        : selected_user?.users[0];
      setSenderProfile(sender);
      setSenderPopUp(true);
    }
  };

  return (
    <>
      <div className='w-full bg-slate-400 dark:bg-slate-700 rounded flex dark:text-white h-16'>
        {groupPopUp && <GroupPopUp setGroupPopUp={setGroupPopUp} group={groupProfile} />}
        {senderPopUp && <SenderPopup setSenderPopup={setSenderPopUp} user={senderProfile} />}
        
        {/* Back Button */}
        <button
          className="flex items-center justify-center bg-transparent border border-transparent hover:border-gray-400 hover:bg-gray-100 rounded-full m-4"
          onClick={() => dispatch(setSelectedUser(null))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 dark:text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* User/Group Info */}
        <div className="flex mt-3 cursor-pointer" onClick={senderProfileHandle}>
          <img
            src={selected_user?.isGroupChat
              ? selected_user?.chatName || '../group-default.svg'
              : selected_user?.users[0]?._id === user?._id 
              ? selected_user?.users[1]?.avatar || '../user.svg'
              : selected_user?.users[0].avatar || '../user.svg'}
            alt="user/group avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="text-sm">
              {selected_user?.isGroupChat ? selected_user?.chatName : selected_user?.users[1]?.fullname}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {selected_user?.isGroupChat ? '3 users online' : 'Online'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-gray-50 dark:bg-gray-800 flex flex-col">
        <div className="w-full h-full"></div>
        {messages && messages.map((msg, i) => (
          <div
          key={msg._id}
          className={`flex mb-4 ${msg.sender?._id === user?._id ? 'justify-end' : 'justify-start'}`}
        >
          {/* Avatar logic for messages */}
          <div className={`h-8 w-8 mr-2 mt-2`}>
            {(i === 0 || messages[i+1]?.sender?._id !== msg.sender?._id) && msg.sender?._id !== user?._id && (
              <img
                src={msg.sender?.avatar || '../user.svg'}
                alt="sender avatar"
                className='rounded-full'
              />
            )}
          </div>
        
          {/* Message bubble */}
          <div
            className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow ${
              msg.sender?._id === user?._id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            style={{
              wordBreak: 'break-word',  // Allows long words or links to break
              maxWidth: '75%',  // Constrains the message bubble width
              overflowWrap: 'anywhere',  // Ensures long content doesn't overflow
            }}
          >
            <p className="text-sm">{msg.content}</p>
          </div>
        </div>
        
        ))}
        
        {isTyping && <div className='ml-8'>
          <TypingIndicator/>
        </div>}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default ChatMessages;
