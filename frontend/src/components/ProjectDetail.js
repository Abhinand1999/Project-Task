import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Base_URL, token } from '../config';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ProjectDetail = () => {

  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [todos, setTodos] = useState({ todos: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
 

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${Base_URL}/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const todoresult = await axios.get(`${Base_URL}/todo/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(todoresult)
        setProject(response.data);
        setTodos(todoresult.data);
        setNewTitle(response.data.title);
      } catch (error) {
        console.error('Error fetching project or todos:', error);
      }
    };

    fetchProject();
  }, [projectId]);



  const handleDelete = (todoId) => {
    setTodos((prevTodos) => ({
      todos: prevTodos.todos.filter((todo) => todo._id !== todoId),
    }));
  };


  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };


  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };


  const handleTitleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${Base_URL}/project/${projectId}`, { title: newTitle }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProject((prev) => ({ ...prev, title: newTitle }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating project title:', error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  



  return (
    <div className="container mx-auto my-6 p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-semibold mb-4 flex items-center">
        {isEditing ? (
          <form onSubmit={handleTitleSubmit} className="flex items-center">
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              className="border border-gray-300 rounded-md p-1"
              required
            />
            <button type="submit" className="ml-2 bg-blue-500 text-white rounded-md px-2 text-lg" >Save</button>

          </form>
        ) : (
          <>
            {project.title}
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
              style={{ fontSize: '14px' }}
              onClick={handleEditToggle}
            />
          </>
        )}
      </h2>
      <p>Created on: {new Date(project.createdDate).toLocaleDateString()}</p>

      <h3 className="text-xl mt-6">Todos</h3>
      <div className="mb-4">
        <TodoForm projectId={projectId} todos={todos} setTodos={setTodos} onDelete={handleDelete} />
      </div>
      



      <div className="space-y-2">
        {todos.todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} projectId={projectId} onDelete={handleDelete} />
        ))}
      </div>


    </div>
  );
};

export default ProjectDetail;
