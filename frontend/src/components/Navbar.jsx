import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className=" shadow-lg relative bg-slate-100 opacity-95  overflow-hidden h-[70px]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-green-400/10 mix-blend-overlay"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-green-300/10 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative  ">
              <img
                src="/logo12.png"
                alt="Logo"
                className="  h-16 w-auto transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2"
              />
              
            </div>
            
          </Link>

          {/* Navigation / Contact */}
          <div className="flex items-center space-x-4">
            <Link
              to="/contact"
              className="relative inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-full hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                Contact Us
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full"></span>
              <span className="absolute -inset-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
