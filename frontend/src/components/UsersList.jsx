import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  // Glassmorphism style
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      // Remove user from UI
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="p-6 rounded-2xl" style={glassStyle}>
            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
            <p className="text-lg text-gray-600 mt-2">
              Manage all registered users
            </p>
          </div>

          {/* Search Bar */}
          <div className="p-6 rounded-2xl" style={glassStyle}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full p-3 pl-10 bg-white/80 border border-white/30 rounded-xl text-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Users List */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm animate-pulse h-48"></div>
              ))}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm text-center">
              <p className="text-gray-600">No users found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentUsers.map(user => (
                  <div key={user.id} className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold mr-3">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Role:</span>
                        <span className="text-sm font-medium text-indigo-600">
                          {user.roles?.[0]?.name || 'No role assigned'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Status:</span>
                        <span className="text-sm font-medium text-green-600">
                          Active
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Registered:</span>
                        <span className="text-sm text-gray-500">
                          {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-2">
                      <Link 
                        to={`/admin/users/${user.id}/edit`}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(user.id)} 
                        className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {filteredUsers.length > usersPerPage && (
                <div className="flex justify-center mt-8">
                  <nav className="inline-flex rounded-md shadow-sm">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-l-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 border-t border-b ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-r-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}