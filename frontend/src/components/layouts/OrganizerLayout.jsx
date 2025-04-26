// src/components/layouts/OrganizerLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../Navbar";

export default function OrganizerLayout() {
    return (
        <div>
            <Navbar />

            <div className="flex h-screen ">
                <aside className="w-64 bg-blue-800 text-white p-4">
                    {/* <img src="/logo4.png" alt="logo" /> */}
                    {/* <hr /> */}
                    <h2 className="text-xl font-bold mb-6">Organizer Panel</h2>
                    <nav>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/organizer/dashboard"
                                    className="block px-4 py-2 hover:bg-blue-700 rounded"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/organizer/events"
                                    className="block px-4 py-2 hover:bg-blue-700 rounded"
                                >
                                    My Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/organizer/events/create"
                                    className="block px-4 py-2 hover:bg-blue-700 rounded"
                                >
                                    Create Event
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/logout"
                                    className="block px-4 py-2 hover:bg-blue-700 rounded"
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
