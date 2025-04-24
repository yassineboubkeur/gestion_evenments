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
    
    return userRole; // Return the role for redirection
  } catch (error) {
    console.error('❌ Error during login:', error.message);
    throw error;
  }
}

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const role = await loginUser(credentials);
      console.log(role);
      // Redirect based on role
      switch(role.toLowerCase()) { // Convert to lowercase for case-insensitive comparison
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'organizer':
          navigate('/organizer/dashboard');
          break;
        case 'participant':
          navigate('/participant/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 underline">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}


// ***********************
// // src/components/Login.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// async function loginUser(credentials) {
//   try {
//     const response = await fetch('http://127.0.0.1:8000/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({
//         email: credentials.email,
//         password: credentials.password,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Login failed');
//     }

//     console.log('✅ Logged in:', data);
    
//     // Save token, user information, role and permissions in localStorage
//     localStorage.setItem('token', data.token);
//     localStorage.setItem('user', JSON.stringify(data.user));
//     localStorage.setItem('role', data.user.role);
//     localStorage.setItem('permissions', JSON.stringify(data.user.permissions));
    
//     return data.user.role; // Return the role for redirection
//   } catch (error) {
//     console.error('❌ Error during login:', error.message);
//     throw error;
//   }
// }

// export default function LoginForm() {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const role = await loginUser(credentials);
      
//       // Redirect based on role
//       switch(role) {
//         case 'admin':
//           navigate('/admin/dashboard');
//           break;
//         case 'organizer':
//           navigate('/organizer/dashboard');
//           break;
//         case 'participant':
//           navigate('/participant/dashboard');
//           break;
//         default:
//           navigate('/');
//       }
//     } catch (error) {
//       setError(error.message || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold mb-4 underline">Login</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={credentials.email}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={credentials.password}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }














// **********************************
// // src/components/Login.jsx
// import { useState } from 'react';

// async function loginUser(credentials) {
//   try {
//     const response = await fetch('http://127.0.0.1:8000/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({
//         email: credentials.email,
//         password: credentials.password,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Login failed');
//     }

//     console.log('✅ Logged in:', data);
    
//     // Save token and user information in localStorage
//     localStorage.setItem('token', data.token);
//     localStorage.setItem('user', JSON.stringify(data.user)); // Assuming the response includes user data
    
//   } catch (error) {
//     console.error('❌ Error during login:', error.message);
//   }
// }

// export default function LoginForm() {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });

//   const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     loginUser(credentials);
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold mb-4 underline">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={credentials.email}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={credentials.password}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }