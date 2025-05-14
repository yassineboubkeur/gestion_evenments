import { useEffect, useState } from 'react';

export default function DotsLoadingAnimation() {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot(prev => (prev + 1) % 3);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1,2].map((dot) => (
        <div
          key={dot}
          className={`w-4 h-4 transition-colors duration-300 ${
            dot === activeDot ? 'bg-red-300' : 'bg-purple-600'
          }`}
        />
      ))}
    </div>
  );
}

// import { useState, useEffect, useCallback } from 'react';

// const colors = [
//   'bg-blue-500',
//   'bg-green-500',
//   'bg-yellow-500',
//   'bg-red-500',
//   'bg-purple-500',
//   'bg-pink-500',
//   'bg-indigo-500',
// ];

// export default function DotsLoadingAnimation({ message = 'Loading...' }) {
//   const [activeColorIndex, setActiveColorIndex] = useState(0);

//   // Memoize the color calculation to prevent unnecessary re-renders
//   const getDotColor = useCallback((dotIndex) => {
//     return colors[(activeColorIndex + dotIndex) % colors.length];
//   }, [activeColorIndex]);

//   useEffect(() => {
//     // Use requestAnimationFrame for smoother animation
//     let animationFrameId;
//     let lastUpdateTime = 0;
//     const interval = 300; // 300ms between changes

//     const updateAnimation = (timestamp) => {
//       if (!lastUpdateTime || timestamp - lastUpdateTime >= interval) {
//         setActiveColorIndex(prev => (prev + 1) % colors.length);
//         lastUpdateTime = timestamp;
//       }
//       animationFrameId = requestAnimationFrame(updateAnimation);
//     };

//     animationFrameId = requestAnimationFrame(updateAnimation);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center space-y-4">
//       <div className="flex space-x-2">
//         {[0, 1, 2, 3].map((dotIndex) => (
//           <div
//             key={dotIndex}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${getDotColor(dotIndex)} ${
//               // Only the first dot gets the scale effect to reduce calculations
//               dotIndex === 0 ? 'opacity-100 scale-110' : 'opacity-80 scale-100'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }