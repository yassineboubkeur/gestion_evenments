import { useState } from "react";
import { useNavigate } from "react-router-dom";

async function registerUser(formData) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.passwordConfirmation,
                role: formData.role,
                birthday: formData.birthday,
                gender: formData.gender,
                phone: formData.phone,
                city: formData.city, // Added city field
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        console.log("✅ Registered:", data);
        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.error("❌ Error during registration:", error.message);
        throw error;
    }
}

export default function RegisterForm({ onRegisterSuccess }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        role: "participant",
        birthday: "",
        gender: "male",
        phone: "",
        city: "", // Added city field
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

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

    // Calculate maximum date (13 years ago from today)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 13);
    const maxDateString = maxDate.toISOString().split('T')[0];

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Create Account
                </h2>
                <p className="text-gray-500">Join us to get started</p>
            </div>

            {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg flex items-center">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
            >
                {/* Full Name */}
                <div className="col-span-1">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Full Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Email */}
                <div className="col-span-1">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Password */}
                <div className="col-span-1">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Confirm Password */}
                <div className="col-span-1">
                    <label
                        htmlFor="passwordConfirmation"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        placeholder="••••••••"
                        value={form.passwordConfirmation}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Birthday */}
                <div className="col-span-1">
                    <label
                        htmlFor="birthday"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Birthday
                    </label>
                    <input
                        id="birthday"
                        name="birthday"
                        type="date"
                        max={maxDateString}
                        value={form.birthday}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Gender */}
                <div className="col-span-1">
                    <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Phone */}
                <div className="col-span-1">
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1234567890"
                        value={form.phone}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* City */}
                <div className="col-span-1">
                    <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                    >
                        City
                    </label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Your city"
                        value={form.city}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Role */}
                <div className="col-span-1 md:col-span-2">
                    <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Account Type
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="participant">Participant</option>
                        <option value="organizer">Organizer</option>
                    </select>
                </div>

                {/* Submit button */}
                <div className="col-span-1 md:col-span-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-md transition-all ${
                            isLoading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                        }`}
                    >
                        {isLoading ? "Creating account..." : "Register"}
                    </button>
                </div>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500 hover:underline focus:outline-none"
                    onClick={() => navigate("/login")}
                >
                    Sign in
                </button>
            </div>
        </div>
    );
}