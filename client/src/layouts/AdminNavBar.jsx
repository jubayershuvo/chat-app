import { useState } from 'react';
import { ChartBarIcon, MenuIcon, XIcon, UserIcon } from '@heroicons/react/solid';
import { NavLink, Outlet } from 'react-router-dom';
import DarkMode from '../components/DarkMode';

const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      {/* Fixed sidebar for desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 h-screen fixed">
        <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Logo</span>
          <DarkMode/>
        </div>
        <nav className="flex-grow px-4 py-6">
          {/* <NavLink to={'/admin/'} className="flex items-center text-gray-900 mb-3">
            <HomeIcon className="h-6 w-6 mr-2" />
            Home
          </NavLink> */}
          <NavLink to="/admin/dashboard" className="flex mb-3 items-center text-blue-600 ">
            <ChartBarIcon className="h-6 w-6 mr-2" />
            Dashboard
          </NavLink>
          <NavLink to="/admin/members" className="flex mb-3 items-center text-blue-600">
            <UserIcon className="h-6 w-6 mr-2" />
            Members
          </NavLink>
        </nav>
      </div>

      {/* Mobile navbar */}
      <div className="md:hidden flex items-center w-full bg-white dark:bg-gray-900 px-4 py-3 border-b dark:border-gray-700 fixed z-10">
        <span className="text-xl font-bold text-gray-900 dark:text-white">Logo</span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-900 dark:text-white mx-2 focus:outline-none"
        >
          {sidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
       <DarkMode/>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 flex">
          <div className="w-64 bg-white dark:bg-gray-900 h-screen shadow-lg">
            <nav className="px-4 py-6">
              <NavLink to="/admin/dashboard" className="flex items-center text-blue-600 ">
                <ChartBarIcon className="h-6 w-6 mr-2" />
                Dashboard
              </NavLink>
              <NavLink to="/admin/members" className="flex items-center text-blue-600 ">
                <UserIcon className="h-6 w-6 mr-2" />
                Members
              </NavLink>
            </nav>
          </div>
          <div
            className="flex-grow bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-grow ml-0 md:ml-64">
        <div className='pt-16'><Outlet/></div>
      </div>
    </div>
  );
};

export default AdminNavbar;