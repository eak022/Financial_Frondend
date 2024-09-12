import React from 'react';
import { SignUpButton, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function Navbar({ theme, toggleTheme }) {
    return (
        <div
            className={`navbar p-4 shadow-lg ${
                theme === "light"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    : "bg-gray-800 text-gray-200"
            }`}
        >
            <div className="flex-1">
                <a className="text-xl font-semibold tracking-wide">
                    Financial Tracker
                </a>
            </div>
            <div className="flex-none gap-4">
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className={`input input-bordered rounded-lg px-4 py-2 ${
                            theme === "light"
                                ? "bg-white text-gray-700 shadow-sm"
                                : "bg-gray-700 text-white shadow-sm"
                        } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                    />
                </div>

                <button
                    className="btn btn-outline rounded-full border-white text-white hover:bg-white hover:text-purple-700 transition-all"
                    onClick={toggleTheme}
                >
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>

                <SignedOut>
                    <SignUpButton
                        mode="modal"
                        className={`btn btn-primary rounded-full border-none ${
                            theme === "light"
                                ? "bg-white text-purple-700 hover:bg-purple-700 hover:text-white"
                                : "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white"
                        } transition-all`}
                    />
                    <SignInButton
                        mode="modal"
                        className={`btn btn-secondary rounded-full border-none ${
                            theme === "light"
                                ? "bg-white text-blue-700 hover:bg-blue-700 hover:text-white"
                                : "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white"
                        } transition-all`}
                    />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
}

export default Navbar;
