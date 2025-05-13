import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeBg from "./ThemeBg";
import { useStyle } from "../context/StyleContext";

async function registerUser(formData) {
    try {
        const formDataToSend = new FormData();
        
        Object.keys(formData).forEach(key => {
            if (key !== 'profileImage') {
                formDataToSend.append(key, formData[key]);
            }
        });
        
        if (formData.profileImage) {
            formDataToSend.append('profile_image', formData.profileImage);
        }

        const response = await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: formDataToSend,
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        console.log("✅ Registered:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role_names[0]);
        localStorage.setItem("permissions", JSON.stringify(data.user.permission_names));
        return data;
    } catch (error) {
        console.error("❌ Error during registration:", error.message);
        throw error;
    }
}

export default function RegisterForm({ onRegisterSuccess, miniRegister }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "participant",
        birthday: "",
        gender: "male",
        phone: "",
        city: "",
        profileImage: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { updateSharedString, sharedString } = useStyle();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, profileImage: file });
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await registerUser(form);
            if (onRegisterSuccess) {
                onRegisterSuccess();
            }
            navigate("/");
        } catch (error) {
            setError(error.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 13);
    const maxDateString = maxDate.toISOString().split('T')[0];

    return (
        <div className={`min-h-screen flex items-center justify-center ${sharedString ? 'bg' + sharedString : 'bg0'}`}>
            <div className="w-full max-w-6xl mx-auto rounded-xl bg-white/60 shadow-xl overflow-hidden">
                <div className={`grid grid-cols-1 ${!miniRegister && "md:grid-cols-2"}`}>
                    {/* Left Column - Branding/Info */}
                    <div className={`backdrop-blur-md p-12 flex flex-col justify-center text-white ${miniRegister && "hidden"}`}>
                        <div className="mb-8">
                            <div className="text-4xl font-bold mb-2"><img className='w-40 mx-auto' src="logo12.png" alt="logo" /></div>
                            <div className="text-xl text-slate-800">Event Management System</div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-lg font-medium text-slate-800">Easy Event Management</p>
                                    <p className="mt-1 text-blue-100">Create, manage, and track all your events in one place</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-lg font-medium text-slate-800">Real-time Analytics</p>
                                    <p className="mt-1 text-blue-100">Get insights into your event performance</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-lg font-medium text-slate-800">Secure & Reliable</p>
                                    <p className="mt-1 text-blue-100">Your data is always protected</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ThemeBg/>
                        </div>
                    </div>

                    {/* Right Column - Register Form */}
                    <div className="p-12 flex flex-col justify-center">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-extrabold text-slate-800">Create your account</h2>
                            <p className="text-sm text-slate-600 mt-1">Join us to get started</p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Profile Image */}
                            <div>
                                <label className="block text-sm font-medium text-slate-800 mb-2">
                                    Profile Image
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                                        {previewImage ? (
                                            <img 
                                                src={previewImage} 
                                                alt="Profile preview" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                <svg 
                                                    className="w-6 h-6 text-gray-400" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    ></path>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            id="profileImage"
                                            name="profileImage"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-blue-50 file:text-blue-700
                                            hover:file:bg-blue-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Name and Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-800">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-800">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password and Confirm Password */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-800">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-slate-800">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        placeholder="••••••••"
                                        value={form.password_confirmation}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Birthday and Gender */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="birthday" className="block text-sm font-medium text-slate-800">
                                        Birthday
                                    </label>
                                    <input
                                        id="birthday"
                                        name="birthday"
                                        type="date"
                                        max={maxDateString}
                                        value={form.birthday}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-slate-800">
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                                        required
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Phone and City */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-800">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+1234567890"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-slate-800">
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        placeholder="Your city"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Role */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-slate-800">
                                    Account Type
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                                >
                                    <option value="participant">Participant</option>
                                    <option value="organizer">Organizer</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 rounded-lg font-medium text-white shadow-md transition ${
                                    isLoading
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {isLoading ? 'Creating account...' : 'Register'}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-600">
                            Already have an account?{' '}
                            <button
                                type="button"
                                className="text-blue-600 hover:underline font-medium"
                                onClick={() => navigate('/login')}
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}