import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-500 ">
      <div className="container mx-auto px-4  flex justify-between items-center">
        {/* Logo on the left */}
        <div className="flex items-center ">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo12.png" // Replace with your logo path
              alt="Company Logo" 
              className="h-16" // Adjust height as needed
            />
            {/* Optional: Add text next to logo */}
            {/* <span className="ml-2 text-xl font-semibold">Your Brand</span> */}
          </Link>
        </div>

        {/* Contact Us on the right */}
        <div className="flex items-center space-x-6">
          <Link 
            to="/contact" 
            className="text-gray-100 bg-cyan-600 text-sm px-4 py-2 rounded-full hover:text-white transition-colors font-medium"
          >
            Contact Us
          </Link>
          
          {/* Optional: Add more navigation items */}
          {/* <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;