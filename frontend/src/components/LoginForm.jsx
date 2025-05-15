// LoginForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStyle } from "../context/StyleContext";

async function loginUser(credentials) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        const userRole = data.user.role_names[0];
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", userRole);
        localStorage.setItem(
            "permissions",
            JSON.stringify(data.user.permission_names)
        );

        return data;
    } catch (error) {
        throw error;
    }
}

export default function LoginForm({ onLoginSuccess, miniLogin, fromEventDetail }) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { sharedString } = useStyle();

    const handleChange = (e) =>
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const response = await loginUser(credentials);

            if (onLoginSuccess) {
                onLoginSuccess();
            }

            navigate("/");
        } catch (error) {
            setError(error.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const glassStyle = {
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(10px)",
    };
    return (
        //         <div className="p-4 rounded-xl" >
        //   <div className="pb-3 border-b border-white/20">
        //     <div className="text-center mb-4">
        //       <h2 className="text-2xl font-bold text-gray-800">Sign in</h2>
        //       <p className="text-xs text-gray-600 mt-1">Enter your credentials</p>
        //     </div>
        //   </div>

        //   {error && (
        //     <div className="mb-3 p-2 bg-red-50/80 text-red-600 rounded text-xs border border-red-200/50 backdrop-blur-sm">
        //       {error}
        //     </div>
        //   )}

        //   <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        //     <div>
        //       <label htmlFor="email" className="block text-xs font-medium text-gray-600">
        //         Email
        //       </label>
        //       <input
        //         id="email"
        //         name="email"
        //         type="email"
        //         autoComplete="email"
        //         required
        //         value={credentials.email}
        //         onChange={handleChange}
        //         className="mt-1 w-full px-3 py-1.5 text-sm outline-0 bg-white/80 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-800 backdrop-blur-sm transition-all"
        //       />
        //     </div>

        //     <div>
        //       <label htmlFor="password" className="block text-xs font-medium text-gray-600">
        //         Password
        //       </label>
        //       <input
        //         id="password"
        //         name="password"
        //         type="password"
        //         autoComplete="current-password"
        //         required
        //         value={credentials.password}
        //         onChange={handleChange}
        //         className="mt-1 w-full px-3 py-1.5 text-sm outline-0 bg-white/80 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-800 backdrop-blur-sm transition-all"
        //       />
        //       <div className="text-right mt-1">
        //         <button
        //           type="button"
        //           className="text-xs text-indigo-600 hover:underline"
        //           onClick={() => navigate('/forgot-password')}
        //         >
        //           Forgot password?
        //         </button>
        //       </div>
        //     </div>

        //     <button
        //       type="submit"
        //       disabled={isLoading}
        //       className={`w-full py-2 text-sm rounded-lg font-medium text-white shadow transition-all ${
        //         isLoading
        //           ? 'bg-indigo-400 cursor-not-allowed'
        //           : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90'
        //       }`}
        //     >
        //       {isLoading ? (
        //         <span className="flex items-center justify-center">
        //           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        //             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        //             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        //           </svg>
        //           Signing in...
        //         </span>
        //       ) : (
        //         'Sign In'
        //       )}
        //     </button>
        //   </form>

        //   <div className="pt-4 mt-4 border-t border-white/20">
        //     <p className="text-center text-xs text-gray-600">
        //       Don't have an account?{' '}
        //       <button
        //         type="button"
        //         className="text-indigo-600 hover:underline font-medium"
        //         onClick={() => navigate('/register')}
        //       >
        //         Sign up
        //       </button>
        //     </p>
        //   </div>
        // </div>
        <div className=" md:p-8 flex flex-col justify-center">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800">Sign in</h2>
                <p className="text-xs text-slate-500 mt-1">
                    Enter your credentials
                </p>
            </div>

            {error && (
                <div className="mb-3 p-2 bg-red-50 text-red-600 rounded text-xs border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-xs font-medium text-slate-600"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={credentials.email}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-1.5 text-sm outline-0 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-xs font-medium text-slate-600"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={credentials.password}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-1.5 text-sm outline-0 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                    />
                    <div className="text-right mt-1">
                        <button
                            type="button"
                            className="text-xs text-blue-600 hover:underline"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 text-sm rounded-md font-medium text-white shadow transition ${
                        isLoading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-500">
                Don't have an account?{" "}
                <button
                    type="button"
                    className="text-blue-600 hover:underline font-medium"
                    onClick={() => navigate("/register")}
                >
                    Sign up
                </button>
                {!fromEventDetail && <Link className="ml-4 font-bold text-blue-800" to="/">
                    Cancel
                </Link>}
            </p>
        </div>
    );
}
