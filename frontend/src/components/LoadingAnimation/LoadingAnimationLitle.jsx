// src/components/DotsLoadingAnimation.jsx
import { useState, useEffect } from 'react';

const colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
];

export default function LoadingAnimationLitle({ message = 'Loading...' }) {
  const [activeDots, setActiveDots] = useState([0, 1, 2, 3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDots(prev => {
        // Rotate which dots are "active" (colored)
        return prev.map(dot => (dot + 1) % colors.length);
      });
    }, 300); // Change every 300ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col  space-y-2">
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((dotIndex) => (
          <div
            key={dotIndex}
            className={`w-2 h-2 rounded-full transition-all  duration-300 ${
              colors[activeDots[dotIndex]]
            } ${
              // Add pulsing animation to active dots
              activeDots.includes(dotIndex) ? 'opacity-100 scale-110' : 'opacity-40 scale-90'
            }`}
          />
        ))}
      </div>
      {/* <p className="text-gray-600 font-medium">{message}</p> */}
    </div>
  );
}