import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsPopUpOpen } from "../store/usersSlice";

const Popup = ({ children }) => {
  const {isPopUpOpen} = useSelector(state => state.Users);
  const dispatch = useDispatch()
  return (
    <>
      {isPopUpOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <div className="dark:text-white">{children}</div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md"
                onClick={() => dispatch(setIsPopUpOpen(false))}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
