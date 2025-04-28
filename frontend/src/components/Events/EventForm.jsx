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
          name: data.data.name || '',
          description: data.data.description || '',
          date: data.data.date ? data.data.date.slice(0, 16) : '',
          address: data.data.address || '',
          available_places: data.data.available_places || '',
          duration_minutes: data.data.duration_minutes || '',
          price: data.data.price || '',
          category: data.data.category || '',
          image: null,
          currentImage: data.data.image || null
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {isEditing ? 'Edit Event' : 'Create New Event'}
              </h1>
              <p className="mt-1 text-blue-100">
                {isEditing ? 'Update your event details' : 'Fill in the form to create a new event'}
              </p>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 bg-opacity-20 text-white">
                {isEditing ? 'Editing Mode' : 'Creation Mode'}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-8">
          {errors.general && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">{errors.general}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2.5 border ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition duration-150`}
                    placeholder="Enter event name"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2.5 border ${errors.category ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg shadow-sm focus:outline-none transition duration-150`}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Concert">Concert</option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Sports">Sports</option>
                  <option value="Networking">Networking</option>
                  <option value="Seminar">Seminar</option>
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`block w-full px-4 py-2.5 border ${errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition duration-150`}
                placeholder="Enter event description"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date and Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date and Time <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2.5 border ${errors.date ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg shadow-sm focus:outline-none transition duration-150`}
                    required
                  />
                </div>
                {errors.date && (
                  <p className="mt-2 text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="duration_minutes"
                    value={formData.duration_minutes}
                    onChange={handleChange}
                    min="1"
                    className={`block w-full px-4 py-2.5 border ${errors.duration_minutes ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition duration-150`}
                    placeholder="e.g. 120"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">mins</span>
                  </div>
                </div>
                {errors.duration_minutes && (
                  <p className="mt-2 text-sm text-red-600">{errors.duration_minutes}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2.5 border ${errors.address ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition duration-150`}
                  placeholder="Enter event location"
                  required
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              {/* Available Places */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Places <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="available_places"
                  value={formData.available_places}
                  onChange={handleChange}
                  min="1"
                  className={`block w-full px-4 py-2.5 border ${errors.available_places ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition duration-150`}
                  placeholder="e.g. 100"
                  required
                />
                {errors.available_places && (
                  <p className="mt-2 text-sm text-red-600">{errors.available_places}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
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
                    className={`block w-full pl-7 pr-12 py-2.5 border ${errors.price ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition duration-150`}
                    placeholder="0.00"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Image
                </label>
                {formData.currentImage && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Current Image:</p>
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={`http://127.0.0.1:8000/storage/${formData.currentImage}`}
                        alt="Current event"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full border-2 border-dashed hover:border-blue-500 hover:bg-blue-50 rounded-lg cursor-pointer transition duration-150">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                      <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1 text-center">
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
                {errors.image && (
                  <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/organizer/events')}
                className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-150 inline-flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {isEditing ? 'Update Event' : 'Create Event'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}