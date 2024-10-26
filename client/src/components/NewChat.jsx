import React, { useState } from 'react';
import NewGroupChat from './NewGroupChat';
import NewSingleChat from './NewSingleChat';

function NewChat() {
    const [groupChat, setGroupChat] = useState(false)
  return (
    <div>
        
        <div className="flex justify-between mx-1">
            <button onClick={()=> setGroupChat(false)} className="bg-orange-500 text-white dark:bg-orange-700 dark:text-gray-200 px-4 py-2 rounded-md">
                New Single Chat
            </button>
            <button onClick={()=> setGroupChat(true)} className="bg-yellow-500 text-white dark:bg-yellow-700 dark:text-gray-200 px-4 py-2 rounded-md">
                New Group Chat
            </button>
        </div>

        <div className="mx-1 mt-4">
            {groupChat ? <NewGroupChat/>:<NewSingleChat/>}
        </div>

    </div>
  )
}

export default NewChat