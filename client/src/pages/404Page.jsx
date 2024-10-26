import React from "react";
import { Link } from "react-router-dom";

export function ErrorSection7() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-300">
    <h1 className="text-9xl font-bold mb-4">404</h1>
    <p className="text-2xl mb-8">Sorry, the page you are looking for doesn't exist.</p>
    
    <Link to="/" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition dark:bg-blue-700 dark:hover:bg-blue-800">
      Go back to Home
    </Link>

  </div>
  );
}

export default ErrorSection7;