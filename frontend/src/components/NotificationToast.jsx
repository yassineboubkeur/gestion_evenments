import React from 'react';
import { useNotification } from '../context/NotificationContext';
// import { useNotification } from '../context/NotificationContext';
// import { useNotification } from './NotificationContext';

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotification();

  const getToastClass = (type) => {
    switch(type) {
      case 'success': return 'bg-green-700';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`${getToastClass(notification.type)} text-white px-6 py-4 rounded-md font-semibold text-lg shadow-lg flex items-center justify-between min-w-[250px]`}
        >
          <span>{notification.message}</span>
          <button 
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            &times;
          </button>
          {/* {console.log(notifications)} */}
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;