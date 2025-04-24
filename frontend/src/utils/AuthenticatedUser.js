// src/utils/AuthenticatedUser.js
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const checkRole = (allowedRoles) => {
  const user = getCurrentUser();
  return user && allowedRoles.includes(user.role);
};

export const fetchUserData = async () => {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await fetch('http://127.0.0.1:8000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};