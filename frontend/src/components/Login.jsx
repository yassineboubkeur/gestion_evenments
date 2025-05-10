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
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
console.log(data)
    const userRole = data.user.role_names[0];
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('role', userRole);
    localStorage.setItem('permissions', JSON.stringify(data.user.permission_names));

    return data;
  } catch (error) {
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

      if (onLoginSuccess) {
        onLoginSuccess();
      }

      navigate('/'); // 🔁 Redirect after successful login
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-xl border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">Sign in to your account</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome back! Please enter your details.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={credentials.email}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={credentials.password}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="text-right mt-2">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-medium text-white shadow-md transition ${
            isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don’t have an account?{' '}
        <button
          type="button"
          className="text-blue-600 hover:underline font-medium"
          onClick={() => navigate('/register')}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
