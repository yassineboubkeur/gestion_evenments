import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyle } from '../context/StyleContext';
import LoadingAnimationLitle from './LoadingAnimation/LoadingAnimationLitle';
import axios from 'axios';

export default function Logout() {
  const navigate = useNavigate();
  const { updateSharedString, sharedString } = useStyle();

  useEffect(() => {
    const logout = async () => {
      try {
        // Use axios instead of fetch for consistency with your other API calls
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        // Clear client-side storage regardless of API call success
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('permissions');
        navigate('/', { replace: true });
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${sharedString ? 'bg' + sharedString : 'bg0'}`}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md">
        <div className="flex text-2xl font-bold mb-4">
          Logging out <LoadingAnimationLitle/>
        </div>
        <p className='font-semibold'>You are being signed out and redirected to the home page.</p>
      </div>
    </div>
  );
}