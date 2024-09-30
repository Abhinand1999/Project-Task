import React, { useState, useEffect } from 'react';
import { Base_URL,token } from '../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';

  const ProjectList = () => {
    
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get(`${Base_URL}/project`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
    };

    fetchProjects();
  }, []);

  const addProject = async () => {
    if (!newProject.trim()) {
      alert("Project title cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(`${Base_URL}/project/`, { title: newProject },{
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects([...projects, response.data]);
      setNewProject('');
    } catch (error) {
      alert("Error adding project. Please try again.");
    }
  };

  return (
    <div className="container mx-auto my-6 p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Link 
            to={`/project/${project._id}`} 
            key={project._id} 
            className="border p-4 rounded-md hover:shadow-md"
          >
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p>Created on: {new Date(project.createdDate).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          className="border p-2 rounded-md w-full mb-2"
          placeholder="New project title"
        />
        <button
          onClick={addProject}
          className="bg-blue-600 text-white p-2 rounded-md w-full hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectList;
