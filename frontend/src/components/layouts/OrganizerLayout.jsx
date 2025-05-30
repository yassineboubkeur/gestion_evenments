import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import { useStyle } from "../../context/StyleContext";
import ThemeBg from "../ThemeBg";
// import StatsRegistration from "../StatsRegistration";

export default function OrganizerLayout() {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { updateSharedString, sharedString } = useStyle();
    const [showStats, setShowStats] = useState(false);
    const navItems = [
        { 
            label: "Dashboard", 
            path: "/organizer/dashboard",
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        { 
            label: "My Events", 
            path: "/organizer/events",
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        { 
            label: "Create Event", 
            path: "/organizer/events/create",
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
        <div className={`min-h-screen ${sharedString ? `bg${sharedString}`: "bg11"}`}>
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
                        fixed md:static inset-y-0 left-0 z-40 w-64 bg-blue-600 bg-opacity-90  max-md:bg-opacity-100  md:rounded-xl
                        text-white md:m-8 p-6 shadow-lg min-h-[calc(100vh-10rem)]`}
                    >
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold tracking-wide text-white flex items-center">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Organizer Panel
                            </h2>
                            <p className="text-gray-300 text-sm mt-2">Manage your events and participants</p>
                            <div className="h-1 w-12 bg-blue-500 mt-2 rounded-full"></div>
                        </div>

                        <nav>
                            <ul className="space-y-2">
                                {navItems.map(({ label, path, icon }) => (
                                    <li key={path}>
                                        <Link
                                            to={path}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
                                                location.pathname === path
                                                    ? "bg-blue-800 text-white shadow"
                                                    : "hover:bg-gray-700 hover:text-white text-gray-300"
                                            }`}
                                        >
                                            {icon}
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                             {/* <button
                                            onClick={() => setShowStats(true)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                />
                                            </svg>
                                            Show Registration Stats
                                        </button>

                                        {showStats && (
                <StatsRegistration onClose={() => setShowStats(false)} />
            )} */}
                        </nav>
                        <ThemeBg/>
                    </aside>
                </div>

                {/* Main Content */}
                <main className="flex-1 rounded-xl md:p-8 overflow-y-auto mt-16 md:mt-0">
                    <div className="bg-white bg-opacity-90 p-2 rounded-xl shadow-sm min-h-[calc(100vh-10rem)]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}