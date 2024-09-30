import React, { useState } from 'react';
import { Base_URL, token } from '../config';
import axios from 'axios';

const TodoForm = ({ todos, setTodos, projectId }) => {
  
  const [description, setDescription] = useState('');
  const [gistUrl, setGistUrl] = useState('');
  const addTodo = async () => {
    if (!description.trim()) {
      alert('Please enter a todo description.');
      return;
    }

    try {
      const response = await axios.post(`${Base_URL}/todo/${projectId}`, { description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setTodos({ ...todos, todos: [response.data, ...todos.todos] });
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('There was an error adding your todo. Please try again.');
    }
  };
  const handleCreateGist = async () => {
    try {
      const response = await axios.post(`${Base_URL}/gits/${projectId}`);
      setGistUrl(response.data.url);
      console.log(response.data.url)
    } catch (err) {
      console.error("Failed to create gist", err);
    }
  };


  return (
    <div className="mt-6">
      <div className="flex items-center space-x-2 mb-2">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded-md flex-grow"
          placeholder="New todo description"
          required
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 whitespace-nowrap"
        >
          Add Todo
        </button>
        <div>

        <button className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 whitespace-nowrap" onClick={handleCreateGist}>Export to GitHub Gist</button>

        

        </div>
      </div>
      {gistUrl && (
          <div className="p-4 bg-green-100 rounded-md ">
            <p className="text-green-800">
              Gist created successfully!{" "}
              <a
                href={gistUrl}
                className="text-blue-500 underline hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Gist
              </a>
            </p>
          </div>
        )}
    </div>
  );
};

export default TodoForm;
