import { useEffect, useState } from "react";
import "./style.css"
export default function LoadingAnimationLitle() {
   
    return (
    
         <div className="loading-text">
          Loading...
        </div>
    );
}


// import './Spinner.css';
// const DotsLoadingAnimation = ({ size = 40, color = '#3b82f6' }) => {
//   return (
//     <div 
//       className="spinner" 
//       style={{
//         width: size,
//         height: size,
//         borderColor: color,
//         borderRightColor: 'transparent' // Creates the gap in the spinner
//       }}
//     />
//   );
// };

// export default DotsLoadingAnimation;

// import "./style.css";

// export default function LoadingAnimationLitle() {
//   return (
//     <div className="flex space-x-2">
//       <div className="dot-animation" style={{ '--delay': '0s' }} />
//       <div className="dot-animation" style={{ '--delay': '0.1s' }} />
//       <div className="dot-animation" style={{ '--delay': '0.2s' }} />
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import "./style.css"
// export default function LoadingAnimationLitle() {
//     const [activeDot, setActiveDot] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setActiveDot((prev) => (prev + 1) % 3);
//         }, 200);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="flex  space-x-2">
//             {[0, 1, 2].map((dot) => (
//                 <div
//                     key={dot}
//                     className={`w-2 h-2 transition-colors duration-300 ${
//                         dot === activeDot ? "bg-red-300" : "bg-purple-600"
//                     }`}
//                 />
//             ))}
//         </div>
         
//     );
// }