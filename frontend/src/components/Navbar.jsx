import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50 w-[100%]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-500 transition">
          SocialSync
        </Link>
        
        {/* Navigation links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-500 transition">Home</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-500 transition">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition">Contact</Link>

          {/* Login button */}
          <Link 
            to="/login" 
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
