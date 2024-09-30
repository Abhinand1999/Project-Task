import React, { useState } from 'react';
import axios from 'axios';
import { Base_URL, token } from '../config';

const TodoItem = ({ todo, onDelete }) => {

    const [status, setStatus] = useState(todo.status);
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(todo.description);

    const toggleStatus = async () => {
        const newStatus = status === 'pending' ? 'complete' : 'pending';
        try {
            await axios.patch(`${Base_URL}/todo/${todo._id}`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStatus(newStatus); 
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };


    const deleteTodo = async () => {
        try {
            await axios.delete(`${Base_URL}/todo/${todo._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onDelete(todo._id); 
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };


    const updateDescription = async () => {
        try {
            await axios.patch(`${Base_URL}/todo/update/${todo._id}`, { description }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsEditing(false); 
        } catch (error) {
            console.error("Error updating description:", error);
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
    };

    
    return (
        <div className="flex items-center justify-between border-b py-2">
            <div>
                <input
                    type="checkbox"
                    checked={status === 'complete'}
                    onChange={toggleStatus}
                    className="mr-2"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2"
                    />
                ) : (
                    <span className={status === 'complete' ? 'line-through' : ''}>
                        {description}
                    </span>
                )}
            </div>

            <div>
                {formatDate(todo.createdAt)}
            </div>

            <div className="flex items-center justify-center w-24 text-gray-500">
                {status}
            </div>

            <div>
                {isEditing ? (
                    <button
                        className="bg-blue-700 text-white rounded-full px-4 py-2 hover:bg-blue-800 focus:outline-none mr-2"
                        onClick={updateDescription}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="bg-green-700 text-white rounded-full px-4 py-2 hover:bg-green-800 focus:outline-none mr-2"
                        onClick={() => setIsEditing(true)}
                    >
                        Update
                    </button>
                )}

                <button
                    className="bg-red-600 text-white rounded-full px-4 py-2 hover:bg-red-700 focus:outline-none"
                    onClick={deleteTodo}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
