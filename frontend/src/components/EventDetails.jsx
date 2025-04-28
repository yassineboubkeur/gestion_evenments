




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingAnimation from './LoadingAnimation/LoadingAnimation';
import LoginForm from './Login';
import PaymentProcedure from './PaymentProcedure'; // Import the new component

export default function EventDetails({eventId, onBack}) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {};
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}`, {
          headers
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        
        const data = await response.json();
        setEvent(data.data || data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      setShowPayment(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    // Handle successful payment (e.g., show confirmation, redirect, etc.)
    navigate('/booking-confirmation');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500 text-lg">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-md"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 text-lg">Event not found</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-md"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="">
      <div className="container mx-auto py-4">
        {showPayment ? (
          <PaymentProcedure 
            event={event}
            onBack={() => setShowPayment(false)}
            onPaymentComplete={handlePaymentComplete}
          />
        ) : (
          <div className="bg-white border-2 py-6 rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex px-4">
              <div className="md:w-1/2 my-auto">
                <img 
                  src={`http://127.0.0.1:8000/storage/${event.image}`} 
                  alt={event.name}
                  className="w-full rounded-lg object-cover h-80"
                />
              </div>
              
              <div className="py-2 ml-4 md:w-1/2">
                <div className="flex justify-between items-start mb-3">
                  <h1 className="text-2xl font-bold">{event.name}</h1>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-md">
                    {event.category}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700 text-md mb-2">
                    <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-gray-700 text-md">
                    <span className="font-semibold">Location:</span> {event.location}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-700 text-md">{event.description}</p>
                </div>
                
                <div className="mb-4">
                  <h2 className="text-md font-semibold mb-2">Details</h2>
                  <p className="text-gray-700 text-md">
                    <span className="font-semibold">Organizer:</span> {event.organizer || 'Not specified'}
                  </p>
                  <p className="text-gray-700 text-md">
                    <span className="font-semibold">Price:</span> {event.price ? `$${event.price}` : 'Free'}
                  </p>
                  <p className="text-gray-700 text-md">
                    <span className="font-semibold">Seats:</span> {event.available_seats || 'Unlimited'}
                  </p>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <button 
                    onClick={handleBookNow}
                    className="px-4 py-2 bg-blue-600 text-md font-semibold text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Book Now
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-md font-semibold text-white rounded-lg hover:bg-green-700 transition">
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => {onBack(false)}} 
                    className="px-4 py-2 bg-gray-600 text-md font-semibold text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Continue
                  </button>
                </div>

                {/* Login Modal for Guest Users */}
                {showLogin && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                      <h3 className="text-xl font-bold mb-4">Login Required</h3>
                      <p className="mb-4">You need to login to book this event.</p>
                      <LoginForm onLoginSuccess={handleLoginSuccess} />
                      <button
                        onClick={() => setShowLogin(false)}
                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import LoadingAnimation from './LoadingAnimation/LoadingAnimation';
// import LoginForm from './Login'; // Make sure to import your LoginForm component

// export default function EventDetails({eventId, onBack}) {
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showLogin, setShowLogin] = useState(false);
//   const navigate = useNavigate();
//   const [showPayment, setShowPayment] = useState(false);
//   const isAuthenticated = !!localStorage.getItem('token');

//   useEffect(() => {
//     const fetchEventDetails = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const headers = {};
        
//         if (token) {
//           headers['Authorization'] = `Bearer ${token}`;
//         }
//         setLoading(true);
//         const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}`, {
//           headers
//         });
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch event details');
//         }
        
//         const data = await response.json();
//         setEvent(data.data || data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching event:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchEventDetails();
//   }, [eventId]);

//   const handleBookNow = () => {
//     if (!isAuthenticated) {
//       setShowLogin(true);
//     } else {
//       // Proceed with booking logic for authenticated users
//       // For example: navigate(`/book/${eventId}`);
//       // alert('Proceeding to booking...');
//       setShowPayment(true);
//     }
//   };

//   // const handleBookNow = () => {
//   //   if (!isAuthenticated) {
//   //     setShowLogin(true);
//   //   } else {
//   //     setShowPayment(true);
//   //   }
//   // };

//   const handleLoginSuccess = () => {
//     setShowLogin(false);
//     // Optionally refresh user data or event details
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-20">
//         <LoadingAnimation />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-6">
//         <p className="text-red-500 text-lg">{error}</p>
//         <button 
//           onClick={() => navigate('/')}
//           className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-md"
//         >
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   if (!event) {
//     return (
//       <div className="text-center py-6">
//         <p className="text-gray-500 text-lg">Event not found</p>
//         <button 
//           onClick={() => navigate('/')}
//           className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-md"
//         >
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       <div className="container mx-auto py-4">
//         <div className="bg-white border-2 py-6 rounded-lg shadow-lg overflow-hidden">
//           <div className="md:flex px-4">
//             <div className="md:w-1/2 my-auto">
//               <img 
//                 src={`http://127.0.0.1:8000/storage/${event.image}`} 
//                 alt={event.name}
//                 className="w-full rounded-lg object-cover h-80"
//               />
//             </div>
            
//             <div className="py-2 ml-4 md:w-1/2">
//               <div className="flex justify-between items-start mb-3">
//                 <h1 className="text-2xl font-bold">{event.name}</h1>
//                 <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-md">
//                   {event.category}
//                 </span>
//               </div>
              
//               <div className="mb-4">
//                 <p className="text-gray-700 text-md mb-2">
//                   <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleString('en-US', {
//                     month: 'short',
//                     day: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </p>
//                 <p className="text-gray-700 text-md">
//                   <span className="font-semibold">Location:</span> {event.location}
//                 </p>
//               </div>
              
//               <div className="mb-4">
//                 <h2 className="text-lg font-semibold mb-2">Description</h2>
//                 <p className="text-gray-700 text-md">{event.description}</p>
//               </div>
              
//               <div className="mb-4">
//                 <h2 className="text-md font-semibold mb-2">Details</h2>
//                 <p className="text-gray-700 text-md">
//                   <span className="font-semibold">Organizer:</span> {event.organizer || 'Not specified'}
//                 </p>
//                 <p className="text-gray-700 text-md">
//                   <span className="font-semibold">Price:</span> {event.price ? `$${event.price}` : 'Free'}
//                 </p>
//                 <p className="text-gray-700 text-md">
//                   <span className="font-semibold">Seats:</span> {event.available_seats || 'Unlimited'}
//                 </p>
//               </div>
              
//               <div className="flex space-x-3 mt-4">
//                 <button 
//                   onClick={handleBookNow}
//                   className="px-4 py-2 bg-blue-600 text-md font-semibold text-white rounded-lg hover:bg-indigo-700 transition"
//                 >
//                   Book Now
//                 </button>
//                 <button className="px-4 py-2 bg-green-600 text-md font-semibold text-white rounded-lg hover:bg-green-700 transition">
//                   Add to Cart
//                 </button>
//                 <button 
//                   onClick={() => {onBack(false)}} 
//                   className="px-4 py-2 bg-gray-600 text-md font-semibold text-white rounded-lg hover:bg-gray-700 transition"
//                 >
//                   Continue
//                 </button>
//               </div>

//               {/* Login Modal for Guest Users */}
//               {showLogin && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                   <div className="bg-white p-6 rounded-lg max-w-md w-full">
//                     <h3 className="text-xl font-bold mb-4">Login Required</h3>
//                     <p className="mb-4">You need to login to book this event.</p>
//                     <LoginForm onLoginSuccess={handleLoginSuccess} />
//                     <button
//                       onClick={() => setShowLogin(false)}
//                       className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// *********************************
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import LoadingAnimation from './LoadingAnimation/LoadingAnimation';

// export default function EventDetails({eventId, onBack}) {
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEventDetails = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const headers = {};
        
//         if (token) {
//           headers['Authorization'] = `Bearer ${token}`;
//         }
//         setLoading(true);
//         const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}`, {
//           headers
//         });
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch event details');
//         }
        
//         const data = await response.json();
//         setEvent(data.data || data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching event:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchEventDetails();
//   }, [eventId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-20">
//         <LoadingAnimation />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-6">
//         <p className="text-red-500 text-lg">{error}</p>
//         <button 
//           onClick={() => navigate('/')}
//           className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-md"
//         >
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   if (!event) {
//     return (
//       <div className="text-center py-6">
//         <p className="text-gray-500 text-lg">Event not found</p>
//         <button 
//           onClick={() => navigate('/')}
//           className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-md"
//         >
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       <div className="container mx-auto py-4">
//         <div className="bg-white border-2 py-6 rounded-lg shadow-lg overflow-hidden">
//           <div className="md:flex px-4">
//             <div className="md:w-1/2 my-auto">
//               <img 
//                 src={`http://127.0.0.1:8000/storage/${event.image}`} 
//                 alt={event.name}
//                 className="w-full rounded-lg object-cover h-80"
//               />
//             </div>
            
//             <div className="py-2 ml-4 md:w-1/2">
//               <div className="flex justify-between items-start mb-3">
//                 <h1 className="text-2xl font-bold">{event.name}</h1>
//                 <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-md">
//                   {event.category}
//                 </span>
//               </div>
              
//               <div className="mb-4">
//                 <p className="text-gray-700 text-md mb-2">
//                   <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleString('en-US', {
//                     month: 'short',
//                     day: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </p>
//                 <p className="text-gray-700 text-md">
//                   <span className="font-semibold">Location:</span> {event.location}
//                 </p>
//               </div>
              
//               <div className="mb-4">
//                 <h2 className="text-lg font-semibold mb-2">Description</h2>
//                 <p className="text-gray-700 text-md">{event.description}</p>
//               </div>
              
//               <div className="mb-4">
//                 <h2 className="text-md font-semibold mb-2">Details</h2>
//                 <p className="text-gray-700 text-md">
//                   <span className="font-semibold">Organizer:</span> {event.organizer || 'Not specified'}
//                 </p>
//                 <p className="text-gray-700 text-md">
//                   <span className="font-semibold">Price:</span> {event.price ? `$${event.price}` : 'Free'}
//                 </p>
//                 <p className="text-gray-700 text-md">
//                   <span className="font-semibold">Seats:</span> {event.available_seats || 'Unlimited'}
//                 </p>
//               </div>
              
//               <div className="flex space-x-3 mt-4">
//                 <button className="px-4 py-2 bg-blue-600 text-md font-semibold text-white rounded-lg hover:bg-indigo-700 transition">
//                   Book Now
//                 </button>
//                 <button className="px-4 py-2 bg-green-600 text-md font-semibold text-white rounded-lg hover:bg-green-700 transition">
//                   Add to Cart
//                 </button>
//                 <button 
//                   onClick={() => {onBack(false)}} 
//                   className="px-4 py-2 bg-gray-600 text-md font-semibold text-white rounded-lg hover:bg-gray-700 transition"
//                 >
//                   Continue
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }