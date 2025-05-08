import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar";

export default function AdminLayout() {
    const location = useLocation();

    const navItems = [
        { label: "Dashboard", path: "/admin/dashboard" },
        { label: "Manage Users", path: "/admin/users" },
        { label: "Manage Events", path: "/admin/events" },
        { label: "Logout", path: "/logout" },
    ];

    return (
        <div>
            <Navbar />
            <div className="min-h-screen  flex flex-col  items-center">
                <div className="w-[95%]">
                    <div className="flex flex-1">
                        {/* Sidebar */}
                        <div>
                            <aside className="w-64 bg-gray-900 h-fit text-white m-7 p-2 rounded-xl shadow-lg">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold tracking-wide text-white">
                                        Admin Panel
                                    </h2>
                                    <div className="h-1 w-12 bg-blue-500 mt-2 rounded-full"></div>
                                </div>

                                <nav>
                                    <ul className="space-y-2">
                                        {navItems.map(({ label, path }) => (
                                            <li key={path}>
                                                <Link
                                                    to={path}
                                                    className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                                                        location.pathname ===
                                                        path
                                                            ? "bg-blue-600 text-white shadow"
                                                            : "hover:bg-gray-700 hover:text-white text-gray-300"
                                                    }`}
                                                >
                                                    {label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </aside>
                        </div>

                        {/* Main Content */}
                        <main className="flex-1 p-8  overflow-y-auto">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
