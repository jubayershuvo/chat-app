import React from "react";


const SenderPopup = ({setSenderPopup, user }) => {
  return (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <div className="dark:text-white">
              <div className="">
                <img src={user.avatar || '../user.svg'} alt="" className="w-60 h-60 m-auto rounded-full"/>
                <div className="block text-center my-3">
                  <p>{user.fullname}</p>
                  <p>@{user.username}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md"
                onClick={() => setSenderPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
  );
};

export default SenderPopup;
