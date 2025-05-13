import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  // const { user, logout } = useAuth();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' }
  ];

  // Fetch notifications when component mounts or notification dropdown is opened
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
    
        const response = await fetch('http://127.0.0.1:8000/api/notifications', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    if (isNotificationOpen && user) {
      fetchNotifications();
    }
  }, [isNotificationOpen, user]);

  // Mark notifications as read when dropdown is opened
  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen && unreadCount > 0 && user) {
      markNotificationsAsRead();
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch('http://127.0.0.1:8000/api/notifications/mark-as-read', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // empty body, but still needs to be stringified
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  // Format notification message based on type
  const formatNotification = (notification) => {
    try {
      const data = typeof notification.data === 'string' 
        ? JSON.parse(notification.data) 
        : notification.data;
      
      switch (notification.type) {
        case 'event_created':
          return `${data.organizer_name} created a new event: ${data.event_name}`;
        case 'registration':
          return `New registration for ${data.event_name}`;
        default:
          return data.message || 'New notification';
      }
    } catch (e) {
      console.error('Error parsing notification data:', e);
      return 'New notification';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="shadow-lg relative bg-slate-100 bg-opacity-70 h-[70px]">
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
            <div className="relative">
              
              <img
                src="/logo12.png"
                alt="Logo"
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* Notification Icon */}
            {user && (
              <div className="relative">
                <button 
                  onClick={handleNotificationClick}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300 relative"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notification Dropdown */}
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-50">
                    <div className="py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-700">Notifications ({notifications.length})</p>
                      </div>
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              const data = typeof notification.data === 'string' 
                                ? JSON.parse(notification.data) 
                                : notification.data;
                              if (data.event_id) {
                                navigate(`/events/${data.event_id}`);
                              }
                              setIsNotificationOpen(false);
                            }}
                          >
                            <p className="text-sm text-gray-800">{formatNotification(notification)}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(notification.created_at).toLocaleString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-center text-sm text-gray-500">
                          No new notifications
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* User Profile */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <img
                    src={"http://127.0.0.1:8000/storage/"+user?.profile_image
                      || 'https://randomuser.me/api/portraits/men/1.jpg'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-cyan-500"
                  />
                  {/* {console.log(user)} */}
                  <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                    {user.name}
                  </span>
                </button>
                
                {/* Profile Dropdown Menu */}
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="relative inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-full hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group"
              >
                <span className="relative z-10">Login</span>
              </Link>
            )}
            
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

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            {/* Mobile Notification Icon */}
            {user && (
              <button 
                onClick={handleNotificationClick}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300 relative"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              className="text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Backdrop (dark overlay) */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-[999] md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile Menu (now appears above backdrop) */}
            <div className="md:hidden fixed inset-0 top-[70px] bg-white shadow-lg z-[1000] overflow-y-auto">
              <div className="px-4 py-3 space-y-4">
                {/* User Info in Mobile Menu */}
                {user ? (
                  <div className="flex items-center px-3 py-2 space-x-3 border-b border-gray-100 pb-4">
                    <img
                      src={user.image || 'https://randomuser.me/api/portraits/men/1.jpg'}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{user.name}</p>
                      <p className="text-xs text-gray-500">View profile</p>
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2 border-b border-gray-100 pb-4">
                    <Link 
                      to="/login" 
                      className="text-sm font-medium text-cyan-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </div>
                )}
                
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-3 py-2 text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Notifications */}
                {user && notifications.length > 0 && (
                  <div className="px-3 py-2 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Notifications</h3>
                    {notifications.slice(0, 3).map(notification => (
                      <div 
                        key={notification.id} 
                        className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer"
                        onClick={() => {
                          const data = typeof notification.data === 'string' 
                            ? JSON.parse(notification.data) 
                            : notification.data;
                          if (data.event_id) {
                            navigate(`/events/${data.event_id}`);
                          }
                          setIsMenuOpen(false);
                        }}
                      >
                        {formatNotification(notification)}
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                
                <Link
                  to="/contact"
                  className="block w-full text-center px-3 py-2 mt-2 text-white bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-full hover:to-cyan-600 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
                
                {user && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;