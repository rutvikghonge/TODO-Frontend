import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useTodos } from '../../hooks/useTodos';

const TodoList = () => {
    const { todos, loading, addTodo, updateTodo, deleteTodo, reorderTodos } = useTodos();
    const [filter, setFilter] = useState('All'); // All, Active, Completed

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;

        reorderTodos(result.source.index, result.destination.index);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'Active') return !todo.completed;
        if (filter === 'Completed') return todo.completed;
        return true;
    });

    if (loading && todos.length === 0) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto mt-8">
            <TodoForm onAdd={addTodo} />

            {/* Filters */}
            {todos.length > 0 && (
                <div className="flex gap-2 mb-6">
                    {['All', 'Active', 'Completed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === f
                                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            )}

            {/* Todo List Drag and Drop Context */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="todo-list">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`min-h-[200px] transition-colors ${snapshot.isDraggingOver ? 'bg-gray-50/50 dark:bg-gray-800/50 rounded-xl' : ''
                                }`}
                        >
                            {filteredTodos.length > 0 ? (
                                filteredTodos.map((todo, index) => (
                                    <TodoItem
                                        key={todo.id}
                                        todo={todo}
                                        index={index}
                                        onUpdate={updateTodo}
                                        onDelete={deleteTodo}
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400 text-center">
                                    <p className="text-lg mb-2">
                                        {filter === 'All'
                                            ? "You're all caught up! ✨"
                                            : `No ${filter.toLowerCase()} tasks found.`}
                                    </p>
                                    {filter === 'All' && (
                                        <p className="text-sm">Add a task above to get started.</p>
                                    )}
                                </div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {/* Footer Stats */}
            {todos.length > 0 && (
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 flex justify-between px-2">
                    <span>{todos.filter(t => !t.completed).length} items left</span>
                    <span>{todos.length} total</span>
                </div>
            )}
        </div>
    );
};

export default TodoList;
