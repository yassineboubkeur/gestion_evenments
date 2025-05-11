import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeBg from './ThemeBg';
import { useStyle } from '../context/StyleContext';

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

export default function LoginForm({ onLoginSuccess ,miniLogin}) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateSharedString, sharedString } = useStyle();

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

      navigate('/');
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg${sharedString}`}>
      <div className="w-full max-w-6xl mx-auto rounded-xl bg-white/60 shadow-xl overflow-hidden">
        <div className={`grid grid-cols-1 ${!miniLogin && "md:grid-cols-2" }`}>
          {/* Left Column - Branding/Info */}
          <div className={`backdrop-blur-md  p-12 flex flex-col justify-center text-white ${miniLogin && "hidden"}`}>
            <div className="mb-8">
              <div className="text-4xl font-bold mb-2"><img className='w-40 mx-auto' src="logo12.png" alt="logo" /></div>
              <div className="text-xl text-slate-800">Event Management System</div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-lg font-medium text-slate-800">Easy Event Management</p>
                  <p className="mt-1 text-blue-100">Create, manage, and track all your events in one place</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-lg font-medium text-slate-800">Real-time Analytics</p>
                  <p className="mt-1 text-blue-100">Get insights into your event performance</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-lg font-medium text-slate-800">Secure & Reliable</p>
                  <p className="mt-1 text-blue-100">Your data is always protected</p>
                </div>
              </div>
            </div>
            <div>
              <ThemeBg/>
            </div>
          </div>
          {console.log(miniLogin)}
          {/* Right Column - Login Form */}
          <div className="p-12 flex flex-col justify-center">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-extrabold text-slate-800">Sign in to your account</h2>
              <p className="text-sm text-slate-600 mt-1">Welcome back! Please enter your details.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-800">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-800">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
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

            <p className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-blue-600 hover:underline font-medium"
                onClick={() => navigate('/register')}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}