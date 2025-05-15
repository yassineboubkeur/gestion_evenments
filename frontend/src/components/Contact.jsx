import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
        const response = await fetch("http://127.0.0.1:8000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        });

        let data = {};
        const contentType = response.headers.get("content-type");

        // Only parse JSON if response is not empty and is JSON
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        }

        if (!response.ok) {
            if (response.status === 422) {
                setErrors(data.errors || {});
            } else {
                throw new Error(data.message || "Something went wrong");
            }
            return;
        }

        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Optional: redirect after 2 seconds
        setTimeout(() => {
            navigate("/");
        }, 2000);
    } catch (error) {
        console.error("Error submitting form:", error);
    } finally {
        setIsSubmitting(false);
    }
};


    return (
        <div className="max-w-lg mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:shadow-2xl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Get in Touch
                </h2>
                <p className="text-gray-600">We'd love to hear from you</p>
            </div>

            {success && (
                <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-xl flex items-center justify-center animate-fadeIn">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    Your message has been sent successfully! Redirecting...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                    <FiUser className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition ${
                            errors.name
                                ? "border-red-300 focus:ring-red-200"
                                : "border-gray-300 focus:ring-blue-200"
                        } focus:ring-2`}
                        placeholder="Your Name"
                        required
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name[0]}
                        </p>
                    )}
                </div>

                {/* Email Input */}
                <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition ${
                            errors.email
                                ? "border-red-300 focus:ring-red-200"
                                : "border-gray-300 focus:ring-blue-200"
                        } focus:ring-2`}
                        placeholder="Your Email"
                        required
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email[0]}
                        </p>
                    )}
                </div>

                {/* Subject Input */}
                <div className="relative">
                    <svg
                        className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                    </svg>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition ${
                            errors.subject
                                ? "border-red-300 focus:ring-red-200"
                                : "border-gray-300 focus:ring-blue-200"
                        } focus:ring-2`}
                        placeholder="Subject"
                        required
                    />
                    {errors.subject && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.subject[0]}
                        </p>
                    )}
                </div>

                {/* Message Textarea */}
                <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none resize-none transition ${
                            errors.message
                                ? "border-red-300 focus:ring-red-200"
                                : "border-gray-300 focus:ring-blue-200"
                        } focus:ring-2`}
                        placeholder="Your Message"
                        required
                    ></textarea>
                    {errors.message && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.message[0]}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium text-white transition duration-300 ${
                        isSubmitting
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    }`}
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <span>Sending...</span>
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
