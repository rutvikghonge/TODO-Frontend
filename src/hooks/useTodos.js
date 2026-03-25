import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../lib/api';

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch todos from the Express backend
    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/todos');
            setTodos(response.data);
        } catch (error) {
            toast.error('Failed to load tasks');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    // Create a new todo
    const addTodo = async (title) => {
        try {
            const response = await api.post('/todos', { title });
            setTodos((prev) => [...prev, response.data]);
            toast.success('Task added');
        } catch (error) {
            toast.error('Failed to add task');
            throw error;
        }
    };

    // Update a todo (title or completed status)
    const updateTodo = async (id, updates) => {
        try {
            // Optimistic UI update
            setTodos((prev) =>
                prev.map(t => t.id === id ? { ...t, ...updates } : t)
            );

            const response = await api.put(`/todos/${id}`, updates);

            // Sync with server data (in case server modified it differently)
            setTodos((prev) =>
                prev.map(t => t.id === id ? response.data : t)
            );

        } catch (error) {
            toast.error('Failed to update task');
            fetchTodos(); // Revert optimistic update gracefully
            throw error;
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            setTodos((prev) => prev.filter(t => t.id !== id));
            await api.delete(`/todos/${id}`);
            toast.success('Task deleted');
        } catch (error) {
            toast.error('Failed to delete task');
            fetchTodos(); // Revert optimistic update gracefully
            throw error;
        }
    };

    // Reorder todos (used by react-beautiful-dnd / @hello-pangea/dnd)
    const reorderTodos = async (startIndex, endIndex) => {
        const result = Array.from(todos);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        // Update positions functionally
        const updatedItems = result.map((item, index) => ({
            ...item,
            position: index,
        }));

        // Optimistically set the sorted array immediately in UI
        setTodos(updatedItems);

        try {
            // Send the batch payload to the express backend
            const payload = updatedItems.map(item => ({ id: item.id, position: item.position }));
            await api.put('/todos/reorder', { items: payload });
        } catch (error) {
            toast.error('Failed to save task order');
            fetchTodos(); // Revert optimistic update
            throw error;
        }
    };

    return {
        todos,
        loading,
        addTodo,
        updateTodo,
        deleteTodo,
        reorderTodos,
    };
};
