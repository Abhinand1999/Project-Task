import mongoose from 'mongoose';
import Todo from '../models/Todo.js';
import Project from '../models/Project.js'; // Assuming you will be using Project for some tests

// Clear the Todo collection after each test
afterEach(async () => {
    await Todo.deleteMany({});
});

describe('Todo Model', () => {

    test('should create a new todo successfully', async () => {
        const todoData = { description: 'Test Todo' };
        const newTodo = new Todo(todoData);
        const savedTodo = await newTodo.save();

        expect(savedTodo._id).toBeDefined();
        expect(savedTodo.description).toBe('Test Todo');
        expect(savedTodo.status).toBe('pending'); // Default value
    });

    test('should throw an error if the todo description is missing', async () => {
        const todoData = { status: 'pending' };

        const todo = new Todo(todoData);
        await expect(todo.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });


    test('should update a todo status successfully', async () => {
        const todoData = { description: 'Update Status', status: 'pending' };
        const todo = new Todo(todoData);
        const savedTodo = await todo.save();

        // Update the status
        savedTodo.status = 'complete';
        const updatedTodo = await savedTodo.save();

        expect(updatedTodo.status).toBe('complete');
    });

    test('should update a todo description successfully', async () => {
        const todoData = { description: 'Old Description' };
        const todo = new Todo(todoData);
        const savedTodo = await todo.save();

        // Update the description
        savedTodo.description = 'New Description';
        const updatedTodo = await savedTodo.save();

        expect(updatedTodo.description).toBe('New Description');
    });

    test('should delete a todo successfully', async () => {
        const todoData = { description: 'Delete Todo' };
        const todo = new Todo(todoData);
        await todo.save();

        const deleteResponse = await Todo.deleteOne({ _id: todo._id });
        expect(deleteResponse.deletedCount).toBe(1);

        const foundTodo = await Todo.findById(todo._id);
        expect(foundTodo).toBeNull();
    });

    
});
