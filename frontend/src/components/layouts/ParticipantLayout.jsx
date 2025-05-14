import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import ThemeBg from "../ThemeBg";
import { useStyle } from "../../context/StyleContext";

export default function ParticipantLayout() {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
            const { updateSharedString, sharedString } = useStyle();
    

    const navItems = [
        { 
            label: "Dashboard", 
            path: "/participant/dashboard",
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        { 
            label: "Browse Events", 
            path: "/participant/events",
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        { 
            label: "My Events", 
            path: "/participant/my-events",
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            )
        },
        // {
        //     label: "My Events", 
        //     path: "/participant/my-events",
        //     icon: (
        //       <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        //       </svg>
        //     )
        //   },
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
        <div className={`min-h-screen ${sharedString ? `bg${sharedString}`: "bg0"}`}>
            <Navbar />
            
            {/* Mobile menu button */}
            <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed bottom-6 right-6 z-50 bg-green-700 bg-opacity-50 text-white p-3 rounded-full shadow-lg"
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

            <div className="flex flex-col  md:flex-row">
                {/* Sidebar - Hidden on mobile unless sidebarOpen is true */}
              <div className="">
              <aside 
                    className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 transform transition-transform duration-200 ease-in-out
                    fixed md:static inset-y-0 left-0 z-40 w-64 bg-green-700 bg-opacity-90 max-md:bg-opacity-100  md:rounded-xl
                    text-white md:m-8 p-6  shadow-lg min-h-[calc(100vh-10rem)]`}
                >
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold tracking-wide text-white flex items-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Participant Panel
                        </h2>
                        <p className="text-green-200 text-sm mt-2">Manage your event participation</p>
                        <div className="h-1 w-12 bg-white mt-2 rounded-full"></div>
                    </div>

                    <nav>
                        <ul className="space-y-1">
                            {navItems.map(({ label, path, icon }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center px-4 py-2 rounded-full font-semibold transition-all ${
                                            location.pathname === path
                                                ? "bg-white text-green-800 shadow-md"
                                                : "hover:bg-green-600 hover:bg-opacity-50"
                                        }`}
                                    >
                                        {icon}
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <ThemeBg path="../" />
                </aside>
              </div>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto mt-16 md:mt-0">
                    <div className="bg-white bg-opacity-80 rounded-xl shadow-sm p-4 md:p-6 min-h-[calc(100vh-10rem)]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}