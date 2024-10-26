import React from 'react';

const MessageInput = ({ onSendMessage, onTyping, message }) => {


  return (
    <form onSubmit={onSendMessage} className="w-full p-4 bg-gray-100 dark:bg-gray-900 flex items-center">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => onTyping(e)}
        className="flex-1 p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg outline-none"
      />
      <button
        type='submit'
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
