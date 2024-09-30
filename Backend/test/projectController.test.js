import mongoose from 'mongoose';
import Project from '../models/Project.js'; // Adjust path as necessary
require('dotenv').config();

afterEach(async () => {
    // Clear the Project collection after each test
    await Project.deleteMany({});
});

describe('Project Model', () => {
    test('should create a new project successfully', async () => {
        const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
        const projectData = { user: userId, title: 'Test Project' };

        const newProject = new Project(projectData);
        const savedProject = await newProject.save();
        expect(savedProject._id).toBeDefined();
        expect(savedProject.title).toBe('Test Project');
        expect(savedProject.user.toString()).toBe(userId.toString());
    });

    test('should throw an error if the project title already exists', async () => {
        const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
        const projectData = { user: userId, title: 'Test Project' };
    
        // Save the first project
        const project = new Project(projectData);
        await project.save();
    
        // Attempt to save a duplicate project
        const duplicateProject = new Project(projectData);
        
        await expect(duplicateProject.save()).rejects.toThrow(Error);
        await duplicateProject.save().catch(err => {
            console.log('Error:', err); // Log the error for debugging
            expect(err.code).toBe(11000); // Check for the specific error code
        });
    });

    test('should find a project by title', async () => {
        const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
        const projectData = { user: userId, title: 'Find Project' };
        const project = new Project(projectData);
        await project.save();

        const foundProject = await Project.findOne({ title: 'Find Project' });
        expect(foundProject).toBeDefined();
        expect(foundProject.title).toBe('Find Project');
    });

    test('should update a project title successfully', async () => {
        const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
        const projectData = { user: userId, title: 'Old Title' };
        const project = new Project(projectData);
        const savedProject = await project.save();

        // Update the title
        savedProject.title = 'New Title';
        const updatedProject = await savedProject.save();

        expect(updatedProject.title).toBe('New Title');
    });

    test('should delete a project successfully', async () => {
        const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
        const projectData = { user: userId, title: 'Delete Project' };
        const project = new Project(projectData);
        await project.save();

        const deleteResponse = await Project.deleteOne({ _id: project._id });
        expect(deleteResponse.deletedCount).toBe(1);

        const foundProject = await Project.findById(project._id);
        expect(foundProject).toBeNull();
    });
});
