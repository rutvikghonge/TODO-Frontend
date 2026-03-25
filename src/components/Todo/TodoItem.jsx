import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { FiTrash2, FiEdit2, FiCheck, FiX, FiMenu } from 'react-icons/fi';

const TodoItem = ({ todo, index, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const handleUpdate = () => {
        if (editTitle.trim() && editTitle.trim() !== todo.title) {
            onUpdate(todo.id, { title: editTitle.trim() });
        } else {
            setEditTitle(todo.title); // Reset if empty
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleUpdate();
        if (e.key === 'Escape') {
            setEditTitle(todo.title);
            setIsEditing(false);
        }
    };

    return (
        <Draggable draggableId={todo.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`group flex items-center gap-3 p-4 mb-3 bg-white dark:bg-gray-800 rounded-xl border transition-all ${snapshot.isDragging
                            ? 'shadow-xl ring-2 ring-primary-500 border-transparent z-50'
                            : 'shadow-sm border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                >
                    {/* Drag Handle */}
                    <div
                        {...provided.dragHandleProps}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-grab active:cursor-grabbing p-1"
                    >
                        <FiMenu className="w-5 h-5" />
                    </div>

                    {/* Custom Checkbox */}
                    <div className="relative flex items-center justify-center">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={(e) => onUpdate(todo.id, { completed: e.target.checked })}
                            className="peer appearance-none w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full checked:bg-green-500 checked:border-green-500 cursor-pointer transition-colors"
                        />
                        <FiCheck className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>

                    {/* Title / Edit Form */}
                    <div className="flex-1 overflow-hidden">
                        {isEditing ? (
                            <input
                                autoFocus
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onBlur={handleUpdate}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-primary-500 rounded px-2 py-1 outline-none text-gray-900 dark:text-gray-100"
                            />
                        ) : (
                            <span
                                className={`block truncate transition-colors ${todo.completed
                                        ? 'text-gray-400 dark:text-gray-500 line-through'
                                        : 'text-gray-800 dark:text-gray-200'
                                    }`}
                                onDoubleClick={() => setIsEditing(true)}
                            >
                                {todo.title}
                            </span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleUpdate}
                                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    aria-label="Save specific task Edit"
                                >
                                    <FiCheck className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        setEditTitle(todo.title);
                                        setIsEditing(false);
                                    }}
                                    className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    aria-label="Cancel Edit"
                                >
                                    <FiX className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    aria-label="Edit Task"
                                >
                                    <FiEdit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => onDelete(todo.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    aria-label="Delete Task"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TodoItem;
