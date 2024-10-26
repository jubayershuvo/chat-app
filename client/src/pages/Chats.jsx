import React, { useEffect, useState } from 'react';
import ChatUserList from '../components/ChatUserList';
import ChatMessages from '../components/ChatMessages';
import MessageInput from '../components/MessageInput ';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/PopUp';
import NewChat from '../components/NewChat';
import { setChatsList, setNotification } from '../store/usersSlice';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080';  // Socket.IO server URL
let socket, selectedChatCompare;

const ChatApp = () => {
  const { selected_user, notification } = useSelector((state) => state.Users);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState([]);
  const { isLoggedIn, user } = useSelector((state) => state?.auth);
  const currentUser = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [socketConnected, setSocketConnected] = useState(false);  // Correct state initialization

  // Establish Socket.IO connection
  useEffect(() => {
    if (isLoggedIn) {
      // Initialize the socket connection if it doesn't already exist
      if (!socket) {
        socket = io(ENDPOINT, {
          transports: ['websocket'],  // Enforce WebSocket transport
          withCredentials: true,      // Allow credentials (cookies)
        });

        socket.emit('setup', currentUser);  // Emit setup event with user data

        socket.on('connected', () => {
          setSocketConnected(true);  // Update socket connection status
        });

        socket.on('disconnect', () => {
          setSocketConnected(false);  // Handle disconnection
        });

      }

      // Fetch chat list from server
      axios
        .get('/chats', {
          withCredentials: true,
        })
        .then((res) => dispatch(setChatsList(res?.data?.data)))
        .catch((error) => console.log(error));
    } else {
      navigate('/login');  // Redirect if not logged in
    }

    return () => {
      if (socket) {
        socket.disconnect();  // Clean up socket connection on unmount
      }
    };
  }, [isLoggedIn, dispatch, navigate]);

  // Fetch messages for the selected chat
  const fetchMessages = async () => {
    if (!selected_user) {
      setMessages([]);
    } else {
      try {
        const res = await axios.get(`/message/${selected_user._id}`, {
          withCredentials: true,
        });
        setMessages(res.data.data);
        socket.emit('join chat', selected_user?._id);  // Join the chat room
      } catch (error) {
        setMessages([]);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (selected_user) {
      fetchMessages();
      selectedChatCompare = selected_user
    }
  },[selected_user]);

  useEffect(() => {
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  
    return () => {
      socket.off('typing');  // Clean up listener
      socket.off('stop typing');
    };
  });
  

  useEffect(() => {
    socket.on('message received', (newMessage) => {
        if (!selected_user || selected_user?._id !== newMessage.chat?._id) {
            if (!notification || !notification.includes(newMessage)) {
                dispatch(setNotification([...notification, newMessage]));  // Spread notification array correctly
                console.log(newMessage);
            }
        } else {
            setMessages([...messages, newMessage]);
        }
    });
    
    return () => {
        socket.off('message received');  // Clean up the event listener when the component unmounts
    };
}, [selected_user, notification, messages]);
  

  // Handle sending messages
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage) {
      socket.emit('stop typing', selected_user?._id)
      try {
        const res = await axios.post('/message', {
          textMessage: newMessage,
          chatId: selected_user?._id,
        }, {
          withCredentials: true,
        });

        socket.emit('new message', res.data.data);  // Emit the new message
        setMessages((prevMessages) => [...prevMessages, res.data.data]);  // Update local state
        setNewMessage('');  // Clear input after sending message
      } catch (error) {
        console.log(error);
      }
    }
  };

  let typingTimeout;  // Declare this outside the function to persist across renders

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  
    // Emit 'typing' event when user starts typing
    if (!typing) {
      setTyping(true);
      socket.emit('typing', selected_user?._id);
    }
  
    // Clear previous timeout and start a new one
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setTyping(false);
      socket.emit('stop typing', selected_user?._id);
    }, 2000);  // Stop typing after 3 seconds of inactivity
  };

  
  

  return (
    <div className=" bg-gray-50 dark:bg-gray-900">
      <div style={{ height: '800px' }} className="flex bg-gray-50 dark:bg-gray-900 max-w-7xl mx-auto">
      <Popup>
        <NewChat />
      </Popup>
      <div className="hidden sm:flex sm:w-1/3 bg-gray-100 dark:bg-gray-900 p-4">
        <ChatUserList />
      </div>
      {selected_user ? (
        <div className="flex-1 h-5/6 flex flex-col">
          <ChatMessages  isTyping={isTyping} messages={messages} />
          
          <MessageInput message={newMessage} onSendMessage={handleSendMessage} onTyping={typingHandler} />
        </div>
      ) : (
        <div style={{ height: '700px' }} className="w-screen overflow-hidden overflow-y-scroll sm:hidden">
          <ChatUserList loggedUser={currentUser}/>
        </div>
      )}
    </div>
    </div>
  );
};

export default ChatApp;
