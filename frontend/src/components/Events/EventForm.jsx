import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../utils/AuthenticatedUser';
// import ThemeBg from './ThemeBg';
// import { useStyle } from '../context/StyleContext';
import ThemeBg from '../ThemeBg';
import { useStyle } from '../../context/StyleContext';

export default function EventForm({ miniEventForm }) {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { updateSharedString, sharedString } = useStyle();
  
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
    <div className={`min-h-screen flex items-center justify-center `}>
      <div className="w-full max-w-6xl mx-auto rounded-xl bg-white/60 shadow-xl overflow-hidden">
        <div className={`grid grid-cols-1 `}>
          {/* Left Column - Branding/Info */}
        

          {/* Right Column - Event Form */}
          <div className="p-12 flex flex-col justify-center">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-extrabold text-slate-800">
                {isEditing ? 'Edit Event' : 'Create New Event'}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {isEditing ? 'Update your event details' : 'Fill in the form to create a new event'}
              </p>
            </div>

            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Event Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-800">
                    Event Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 w-full px-4 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800`}
                    placeholder="Enter event name"
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-800">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`mt-1 w-full px-4 py-2 border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800`}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Concert">Concert</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Sports">Sports</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-xs text-red-600">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-800">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`mt-1 w-full px-4 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800`}
                  placeholder="Enter event description"
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date and Time */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-slate-800">
                    Date and Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`mt-1 w-full px-4 py-2 border ${errors.date ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800`}
                    required
                  />
                  {errors.date && (
                    <p className="mt-1 text-xs text-red-600">{errors.date}</p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label htmlFor="duration_minutes" className="block text-sm font-medium text-slate-800">
                    Duration (minutes) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="duration_minutes"
                    value={formData.duration_minutes}
                    onChange={handleChange}
                    min="1"
                    className={`mt-1 w-full px-4 py-2 border ${errors.duration_minutes ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800`}
                    placeholder="e.g. 120"
                    required
                  />
                  {errors.duration_minutes && (
                    <p className="mt-1 text-xs text-red-600">{errors.duration_minutes}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-slate-800">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 w-full px-4 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800`}
                    placeholder="Enter event location"
                    required
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-600">{errors.address}</p>
                  )}
                </div>

                {/* Available Places */}
                <div>
                  <label htmlFor="available_places" className="block text-sm font-medium text-slate-800">
                    Available Places <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="available_places"
                    value={formData.available_places}
                    onChange={handleChange}
                    min="1"
                    className={`mt-1 w-full px-4 py-2 border ${errors.available_places ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800`}
                    placeholder="e.g. 100"
                    required
                  />
                  {errors.available_places && (
                    <p className="mt-1 text-xs text-red-600">{errors.available_places}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-slate-800">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`mt-1 w-full px-4 py-2 border ${errors.price ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800`}
                    placeholder="0.00"
                    required
                  />
                  {errors.price && (
                    <p className="mt-1 text-xs text-red-600">{errors.price}</p>
                  )}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Event Image
                  </label>
                  {formData.currentImage && (
                    <div className="mb-2">
                      <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
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
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          <span className="font-semibold">Click to upload</span>
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
                    <p className="mt-1 text-xs text-red-600">{errors.image}</p>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => navigate('/organizer/events')}
                  className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-slate-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-sm font-medium text-white shadow-md transition ${
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
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
    </div>
  );
}