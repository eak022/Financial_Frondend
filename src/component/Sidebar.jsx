import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { FaHome, FaPlusCircle } from 'react-icons/fa';

function SidebarMenu({ theme }) {
    const { isSignedIn } = useUser(); // Get login status

    return (
        <div className="drawer lg:drawer-open w-80">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul
                    className={`menu min-h-full w-80 p-4 ${
                        theme === "dark"
                            ? "bg-base-200 text-white shadow-xl border border-gray-700" // เพิ่มเงาและขอบในโหมดมืด
                            : "bg-gradient-to-b from-[#e4e8ff] to-[#d1d8ff] text-gray-800"
                    }`}
                >
                    {/* Sidebar content here */}
                    <li className="mb-4">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 text-lg p-2 transition-all ${
                                theme === "dark"
                                    ? "hover:bg-gray-700"
                                    : "hover:bg-purple-100"
                            }`}
                        >
                            <FaHome /> Home
                        </Link>
                    </li>

                    {/* Conditionally render Add Record if user is logged in */}
                    {isSignedIn && (
                        <li>
                            <Link
                                to="AddRecord"
                                className={`flex items-center gap-2 text-lg p-2 transition-all ${
                                    theme === "dark"
                                        ? "hover:bg-gray-700"
                                        : "hover:bg-blue-100"
                                }`}
                            >
                                <FaPlusCircle /> Add Record
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SidebarMenu;
