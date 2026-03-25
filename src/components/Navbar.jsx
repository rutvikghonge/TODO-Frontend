import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left Side: Brand & Username */}
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
                            Modern Todo
                        </h1>
                        {user && (
                            <span className="ml-6 text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                                Welcome, <span className="font-semibold text-gray-900 dark:text-white">{user.email.split('@')[0]}</span>
                            </span>
                        )}
                    </div>

                    {/* Right Side: ThemeToggle & Profile Avatar */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                        {user && (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 font-bold hover:ring-2 hover:ring-primary-500 hover:ring-offset-2 dark:hover:ring-offset-gray-800 transition-all focus:outline-none"
                                    aria-label="User menu"
                                >
                                    {user.email.charAt(0).toUpperCase()}
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-600">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate" title={user.email}>
                                                {user.email}
                                            </p>
                                        </div>

                                        <button
                                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <FiSettings className="mr-3 h-4 w-4 text-gray-400" />
                                            Settings
                                        </button>

                                        <button
                                            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                logout();
                                            }}
                                        >
                                            <FiLogOut className="mr-3 h-4 w-4 text-red-400" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
