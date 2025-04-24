// src/components/Events/EventForm.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../utils/AuthenticatedUser';

export default function EventForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    address: '',
    available_places: '',
    duration_minutes: '',
    price: '',
    category: '',
    image: null,
    currentImage: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch event data when editing
  useEffect(() => {
    if (!isEditing) return;

    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/events/${id}`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }

        const data = await response.json();
        setFormData({
          name: data.name,
          description: data.description,
          date: data.date.slice(0, 16), // Format for datetime-local input
          address: data.address,
          available_places: data.available_places,
          duration_minutes: data.duration_minutes,
          price: data.price,
          category: data.category,
          image: null,
          currentImage: data.image
        });
      } catch (err) {
        console.error('Error fetching event:', err);
        navigate('/organizer/events');
      }
    };

    fetchEvent();
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== 'currentImage') {
        data.append(key, value);
      }
    });

    try {
      const API_URL = 'http://127.0.0.1:8000';
      const url = isEditing 
        ? `${API_URL}/api/events/${id}`
        : `${API_URL}/api/events`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
        body: data,
      });

      if (!response.ok) {
        const text = await response.text();
        let errorData = { message: 'Something went wrong' };
        
        try {
          errorData = text ? JSON.parse(text) : errorData;
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }

        if (errorData.errors) {
          setErrors(errorData.errors);
        } else {
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return;
      }

      navigate('/organizer/events');
    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? 'Edit Event' : 'Create New Event'}
      </h1>

      {errors.general && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Event Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Concert">Concert</option>
              <option value="Exhibition">Exhibition</option>
              <option value="Sports">Sports</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Date and Time*</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Duration (minutes)*</label>
            <input
              type="number"
              name="duration_minutes"
              value={formData.duration_minutes}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border rounded"
              required
            />
            {errors.duration_minutes && <p className="text-red-500 text-sm mt-1">{errors.duration_minutes}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Available Places*</label>
            <input
              type="number"
              name="available_places"
              value={formData.available_places}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border rounded"
              required
            />
            {errors.available_places && <p className="text-red-500 text-sm mt-1">{errors.available_places}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Price*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full p-2 border rounded"
              required
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Event Image</label>
            {formData.currentImage && (
              <div className="mb-2">
                <p className="text-sm text-gray-600">Current Image:</p>
                <img 
                  src={`/storage/${formData.currentImage}`}
                  alt="Current event"
                  className="h-24 object-cover rounded"
                />
              </div>
            )}
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-2 border rounded"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/organizer/events')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Event'}
          </button>
        </div>
      </form>
    </div>
  );
}




// // src/components/Events/EventForm.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getToken } from '../../utils/AuthenticatedUser';

// export default function EventForm({ eventData = null }) {
//   const navigate = useNavigate();
//   const isEditing = !!eventData;
  
//   const [formData, setFormData] = useState({
//     name: eventData?.name || '',
//     description: eventData?.description || '',
//     date: eventData?.date ? new Date(eventData.date).toISOString().slice(0, 16) : '',
//     address: eventData?.address || '',
//     available_places: eventData?.available_places || '',
//     duration_minutes: eventData?.duration_minutes || '',
//     price: eventData?.price || '',
//     category: eventData?.category || '',
//     image: null
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prev => ({ ...prev, image: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrors({});

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== null && value !== undefined) {
//         data.append(key, value);
//       }
//     });

//     try {
//         const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
//         const url = isEditing 
//           ? `${API_URL}/api/events/${eventData.id}`
//           : `${API_URL}/api/events`;
//       const method = isEditing ? 'PUT' : 'POST';
//       console.log(data)
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Authorization': `Bearer ${getToken()}`,
//         },
//         body: data,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         if (errorData.errors) {
//           setErrors(errorData.errors);
//         } else {
//           throw new Error(errorData.message || 'Something went wrong');
//         }
//         return;
//       }

//       navigate('/organizer/events');
//     } catch (error) {
//       console.error('Error:', error);
//       setErrors({ general: error.message });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-6">
//         {isEditing ? 'Edit Event' : 'Create New Event'}
//       </h1>

//       {errors.general && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {errors.general}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-700 mb-2">Event Name*</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Category*</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             >
//               <option value="">Select a category</option>
//               <option value="Conference">Conference</option>
//               <option value="Workshop">Workshop</option>
//               <option value="Concert">Concert</option>
//               <option value="Exhibition">Exhibition</option>
//               <option value="Sports">Sports</option>
//             </select>
//             {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
//           </div>
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border rounded h-32"
//           />
//           {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-700 mb-2">Date and Time*</label>
//             <input
//               type="datetime-local"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//             {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Duration (minutes)*</label>
//             <input
//               type="number"
//               name="duration_minutes"
//               value={formData.duration_minutes}
//               onChange={handleChange}
//               min="1"
//               className="w-full p-2 border rounded"
//               required
//             />
//             {errors.duration_minutes && <p className="text-red-500 text-sm mt-1">{errors.duration_minutes}</p>}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-700 mb-2">Address*</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//             {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Available Places*</label>
//             <input
//               type="number"
//               name="available_places"
//               value={formData.available_places}
//               onChange={handleChange}
//               min="1"
//               className="w-full p-2 border rounded"
//               required
//             />
//             {errors.available_places && <p className="text-red-500 text-sm mt-1">{errors.available_places}</p>}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-700 mb-2">Price*</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               min="0"
//               step="0.01"
//               className="w-full p-2 border rounded"
//               required
//             />
//             {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Event Image</label>
//             <input
//               type="file"
//               name="image"
//               onChange={handleFileChange}
//               accept="image/*"
//               className="w-full p-2 border rounded"
//             />
//             {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
//           </div>
//         </div>

//         <div className="flex justify-end gap-4">
//           <button
//             type="button"
//             onClick={() => navigate('/organizer/events')}
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//             disabled={isSubmitting}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Saving...' : 'Save Event'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }