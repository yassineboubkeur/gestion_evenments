// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    console.log('✅ Logged in:', data);
    
    // Extract the first role (assuming users have only one role)
    const userRole = data.user.role_names[0];
    
    // Save token, user information, role and permissions in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('role', userRole);
    localStorage.setItem('permissions', JSON.stringify(data.user.permission_names));
    
    return data; // Return the complete response data
  } catch (error) {
    console.error('❌ Error during login:', error.message);
    throw error;
  }
}

export default function LoginForm({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await loginUser(credentials);
      const role = response.user.role_names[0];
      
      // Call the success callback if provided
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      // Redirect based on role
      // switch(role.toLowerCase()) {
      //   case 'admin':
      //     navigate('/admin/dashboard');
      //     break;
      //   case 'organizer':
      //     navigate('/organizer/dashboard');
      //     break;
      //   case 'participant':
      //     navigate('/participant/dashboard');
      //     break;
      //   default:
      //     navigate('/');
      // }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="max-w-md mx-auto  bg-white  rounded-md">
      <h2 className="text-xl font-bold mb-4 underline">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-900 hover:bg-blue-700'}`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button 
          type="button" 
          className="text-blue-600 hover:underline focus:outline-none"
          onClick={() => navigate('/register')}
        >
          Register here
        </button>
      </div>
    </div>
  );
}