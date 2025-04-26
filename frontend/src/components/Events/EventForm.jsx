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
    let hasChanges = false;
  
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'currentImage') return;
  
      if (
        (typeof value === 'string' && value.trim() !== '') ||
        (typeof value === 'number') ||
        (value instanceof File)
      ) {
        data.append(key, value);
        hasChanges = true;
      }
    });
  
    if (!hasChanges) {
      setIsSubmitting(false);
      setErrors({ general: 'Please update at least one field.' });
      return;
    }
  
    try {
      const API_URL = 'http://127.0.0.1:8000';
      const url = isEditing 
        ? `${API_URL}/api/events/${id}`
        : `${API_URL}/api/events`;
      const method = isEditing ? 'POST' : 'POST';
  
      if (isEditing) {
        data.append('_method', 'PUT');
      }
  
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h1>
          <p className="text-blue-100">
            {isEditing ? 'Update your event details' : 'Fill in the form to create a new event'}
          </p>
        </div>

        <div className="p-6">
          {errors.general && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errors.general}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Concert">Concert</option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Sports">Sports</option>
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-32`}
                rows={4}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date and Time*</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.date ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)*</label>
                <input
                  type="number"
                  name="duration_minutes"
                  value={formData.duration_minutes}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-3 py-2 border ${errors.duration_minutes ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {errors.duration_minutes && <p className="mt-1 text-sm text-red-600">{errors.duration_minutes}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Places*</label>
                <input
                  type="number"
                  name="available_places"
                  value={formData.available_places}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-3 py-2 border ${errors.available_places ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {errors.available_places && <p className="mt-1 text-sm text-red-600">{errors.available_places}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`block w-full pl-7 pr-12 py-2 border ${errors.price ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    required
                  />
                </div>
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                {formData.currentImage && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                    <div className="relative w-24 h-24 overflow-hidden rounded-md border border-gray-200">
                      <img 
                        src={`http://127.0.0.1:8000/storage/${formData.currentImage}`}
                        alt="Current event"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full border-2 border-dashed hover:border-blue-500 hover:bg-blue-50 rounded-md cursor-pointer transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.image?.name || 'PNG, JPG, GIF up to 5MB'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      name="image"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/organizer/events')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  isEditing ? 'Update Event' : 'Create Event'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
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