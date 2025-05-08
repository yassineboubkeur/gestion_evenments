import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    setErrors(data.errors);
                } else {
                    throw new Error(data.message || 'Something went wrong');
                }
                return;
            }

            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            setTimeout(() => {
                navigate('/thank-you');
            }, 2000);

        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h2>
                <p className="text-gray-600">We'd love to hear from you</p>
            </div>
            
            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Thank you for your message! Redirecting...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} rounded-lg focus:ring-2 focus:outline-none transition`}
                        placeholder="Your Name"
                        required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>}
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                    </div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} rounded-lg focus:ring-2 focus:outline-none transition`}
                        placeholder="Your Email"
                        required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>}
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.subject ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} rounded-lg focus:ring-2 focus:outline-none transition`}
                        placeholder="Subject"
                        required
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject[0]}</p>}
                </div>

                <div className="relative">
                    <div className="absolute top-3 left-3">
                        <FiMessageSquare className="text-gray-400" />
                    </div>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.message ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} rounded-lg focus:ring-2 focus:outline-none transition`}
                        placeholder="Your Message"
                        required
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message[0]}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition duration-300 ${isSubmitting 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'}`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        <>
                            <FiSend className="w-5 h-5" />
                            <span>Send Message</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;