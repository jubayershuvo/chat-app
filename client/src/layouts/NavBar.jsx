import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DarkMode from '../components/DarkMode';
import LogoutBtn from '../components/LogoutBtn';
import '../App.css';
import { useSelector } from 'react-redux';

function NavBar() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state?.auth);
  const data = user;

  // State to control mobile menu and search bar visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle the search bar
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch =(e)=>{
    e.preventDefault();
    if(!search){
      toast.error('Enter username to search..!')
    }else{
      navigate(`/user/${search}`)
      setSearch('')
    }

  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {data && <Link to={'/profile'}>
            <img
            src={data?.avatar || './user.svg'}
            className="h-8 w-8 rounded-full"
            alt="Flowbite Logo"
          />
          </Link>}
          <Link to={'/'}><span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Team <span className='text-orange-400'>JS</span></span></Link>
        </div>

        <div className="flex md:order-2">
          <div className="mr-4">
            {data ? (
              <LogoutBtn />
            ) : (
              <Link to={'/login'}>
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Search button */}
          <label htmlFor='darkMode' id='darkMode' className='md:hidden'><DarkMode /></label>
          {user && <button
            onClick={toggleSearch}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>}

          {/* Mobile Menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
            <span className="sr-only">Open main menu</span>
          </button>
          {user && <form onSubmit={handleSearch} className="relative hidden md:block">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search icon</span>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} type="text" id="search-navbars" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
            </form>}
          <label htmlFor='darkMode' id='darkMode' className='hidden md:block'><DarkMode /></label>
        </div>
        

        {isSearchOpen && (
          <form onSubmit={handleSearch} className="w-full mt-3 md:hidden">
            <input value={search} onChange={e => setSearch(e.target.value)}
              type="text"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </form>
        )}

        {/* Mobile Menu */}
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0">
                Home
              </NavLink>
            </li>
            {data ? (
              <>
                <li>
                  <NavLink to="/profile" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 ">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/chats" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 ">
                    Message
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/register" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 ">
                  Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;