import React from "react";
import "../index.css"; // Custom keyframes in CSS

const TypingIndicator = () => {
  return (
    <div className="w-11 h-full flex flex-col">
      <div className="flex my-4 w-11">
        <div className="w-11 flex items-center justify-center w-13 h-10 mx-2 dark:bg-gray-800 bg-white rounded-lg">
          <div className="w-1 h-1 dark:bg-slate-200 bg-gray-600 rounded-full mr-1 animate-bounce"></div>
          <div className="w-1 h-1 dark:bg-slate-200 bg-gray-600 rounded-full mr-1 animate-bounce delay-150"></div>
          <div className="w-1 h-1 dark:bg-slate-200 bg-gray-600 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
