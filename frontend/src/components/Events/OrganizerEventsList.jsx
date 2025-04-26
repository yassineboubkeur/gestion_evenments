import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/AuthenticatedUser';
import DotsLoadingAnimation from '../LoadingAnimation/LoadingAnimation';

export default function OrganizerEventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/my-events', {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Refresh the events list after successful deletion
      await fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete event');
    }
  };

  if (loading) return <div className='mt-40' ><DotsLoadingAnimation/></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Events</h1>
        <Link 
          to="/organizer/events/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create New Event
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
            {event.image && (
              <img 
                src={`http://127.0.0.1:8000/storage/${event.image}`}     
                alt={event.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-2">
                {new Date(event.date).toLocaleDateString()} • {event.address}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {event.available_places} places available
                </span>
                <span className="text-sm font-bold">
                  ${event.price}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/organizer/events/${event.id}`}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  Manage
                </Link>
                <Link
                  to={`/organizer/events/${event.id}/edit`}
                  className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">You haven't created any events yet.</p>
          <Link
            to="/organizer/events/create"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Your First Event
          </Link>
        </div>
      )}
    </div>
  );
}


// // src/components/Events/OrganizerEventsList.jsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getToken } from '../../utils/AuthenticatedUser';

// export default function OrganizerEventsList() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/my-events', {
//           headers: {
//             'Authorization': `Bearer ${getToken()}`,
//             'Accept': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch events');
//         }

//         const data = await response.json();
//         setEvents(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading) return <div>Loading events...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">My Events</h1>
//         <Link 
//           to="/organizer/events/create"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Create New Event
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map(event => (
//           <div key={event.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
//             {event.image && (
//               <img 
//                 src={`/storage/${event.image}`} 
//                 alt={event.name}
//                 className="w-full h-48 object-cover"
//               />
//             )}
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
//               <p className="text-gray-600 mb-2">
//                 {new Date(event.date).toLocaleDateString()} • {event.address}
//               </p>
//               <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>
              
//               <div className="flex justify-between items-center">
//                 <span className="text-sm font-medium">
//                   {event.available_places} places available
//                 </span>
//                 <span className="text-sm font-bold">
//                   ${event.price}
//                 </span>
//               </div>

//               <div className="mt-4 flex gap-2">
//                 <Link
//                   to={`/organizer/events/${event.id}`}
//                   className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
//                 >
//                   Manage
//                 </Link>
//                 <Link
//                   to={`/organizer/events/${event.id}/edit`}
//                   className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
//                 >
//                   Edit
//                 </Link>
//                 <Link
                  
//                   className="px-3 py-1 bg-red-600 text-gray-200 text-sm rounded hover:bg-red-800"
//                 >
//                   Delete
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {events.length === 0 && (
//         <div className="text-center py-10">
//           <p className="text-gray-500 mb-4">You haven't created any events yet.</p>
//           <Link
//             to="/organizer/events/create"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Create Your First Event
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }