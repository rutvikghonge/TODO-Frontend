import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        try {
            await onAdd(title.trim());
            setTitle(''); // Clear form on success
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 relative group">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    disabled={isSubmitting || !title.trim()}
                    className="px-6 py-4 text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                >
                    <FiPlus className="w-5 h-5" />
                    <span className="hidden sm:inline">Add Task</span>
                </button>
            </div>
        </form>
    );
};

export default TodoForm;
