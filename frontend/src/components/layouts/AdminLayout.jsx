import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar";

export default function AdminLayout() {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { 
            label: "Dashboard", 
            path: "/admin/dashboard",
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        { 
            label: "Manage Users", 
            path: "/admin/users",
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        { 
            label: "Manage Events", 
            path: "/admin/events",
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        { 
            label: "Logout", 
            path: "/logout",
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            )
        },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />
            
            {/* Mobile menu button */}
            <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed bottom-6 right-6 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg"
            >
                {sidebarOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            <div className="flex flex-col md:flex-row">
                {/* Sidebar - Hidden on mobile unless sidebarOpen is true */}
                <div>
                <aside 
                    className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 transform transition-transform duration-200 ease-in-out
                    fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-900 
                    text-white md:m-7 p-6 rounded-xl shadow-lg min-h-[calc(100vh-10rem)]`}
                >
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold tracking-wide text-white">
                            Admin Panel
                        </h2>
                        <div className="h-1 w-12 bg-blue-500 mt-2 rounded-full"></div>
                    </div>

                    <nav>
                        <ul className="space-y-2">
                            {navItems.map(({ label, path, icon }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                                            location.pathname === path
                                                ? "bg-blue-600 text-white shadow"
                                                : "hover:bg-gray-700 hover:text-white text-gray-300"
                                        }`}
                                    >
                                        {icon}
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                </div>

                {/* Main Content */}
                <main className="flex-1 rounded-xl  md:p-8 overflow-y-auto mt-16 md:mt-0">
                    <div className="bg-white rounded-xl shadow-sm  min-h-[calc(100vh-10rem)]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}