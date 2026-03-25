import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import ThemeToggle from '../components/ThemeToggle';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-200">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500">
                    Modern Todo App
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage your tasks efficiently and elegantly.
                </p>
            </div>

            {isLogin ? (
                <Login onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
                <Signup onSwitchToLogin={() => setIsLogin(true)} />
            )}
        </div>
    );
};

export default AuthPage;
