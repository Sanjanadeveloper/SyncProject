import React, { useState } from 'react';
import { FaSearch, FaHome, FaUserFriends, FaBriefcase, FaCommentDots, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DashboardNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntQzUTsvQQBmFavKQp97_plm8cfPJOxgQnw&s" alt="SocialSync" className="h-8 w-8" />
            <span className="ml-2 font-semibold text-lg">SocialSync</span>
          </Link>
          <div className="ml-4 relative hidden md:block w-full">
            <input type="text" placeholder="Search" className="w-64 pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white" />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </div>
        <nav className={`fixed top-0 left-0 h-full bg-white shadow-lg p-8 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'} w-3/4 sm:w-1/2 md:w-1/3 lg:hidden`}>
          <div className="flex flex-col justify-top h-full space-y-10 text-left">
            {[
              { Icon: FaHome, label: 'Home', path: '/' },
              { Icon: FaUserFriends, label: 'Network', path: '/network' },
              { Icon: FaBriefcase, label: 'Jobs', path: '/jobs' },
              { Icon: FaCommentDots, label: 'Messaging', path: '/messaging' },
              { Icon: FaBell, label: 'Notifications', path: '/notifications' }
            ].map((item, index) => (
              <Link to={item.path} key={index} className="text-gray-600 hover:text-blue-500 text-xl cursor-pointer">
                <item.Icon />
                <p className="mt-2 text-sm">{item.label}</p>
              </Link>
            ))}
          </div>
        </nav>
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { Icon: FaHome, path: '/' },
            { Icon: FaUserFriends, path: '/network' },
            { Icon: FaBriefcase, path: '/jobs' },
            { Icon: FaCommentDots, path: '/messaging' },
            { Icon: FaBell, path: '/notifications' }
          ].map((item, index) => (
            <Link to={item.path} key={index} className="text-gray-600 hover:text-blue-500 text-xl cursor-pointer">
              <item.Icon />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default DashboardNavbar;
