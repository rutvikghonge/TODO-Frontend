import React from 'react';
import Navbar from '../components/Navbar';
import TodoList from '../components/Todo/TodoList';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pointer-events-auto relative">
                <TodoList />
            </main>
        </div>
    );
};

export default Dashboard;
