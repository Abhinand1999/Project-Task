import { createGits } from '../Controllers/gistController.js';
import Project from '../models/Project';
import Todo from '../models/Todo';
import axios from 'axios';
require('dotenv').config();

jest.mock('../models/Project.js');
jest.mock('axios');

describe('createGits', () => {
  let req, res;

  beforeEach(() => {

    req = {
      params: { id: 'testproj' }
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return 404 if project not found', async () => {

    Project.findById = jest.fn().mockResolvedValue(null);

    await createGits(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Project not found' });
});

  it('should create a gist with correct markdown content', async () => {
    const mockTodos = [
      { description: 'Task 1', status: 'pending' },
      { description: 'Task 2', status: 'complete' }
    ];
    const mockProject = {
      title: 'Test Project',
      todos: mockTodos,
    };
    
    Project.findById.mockResolvedValue(mockProject);

    axios.post.mockResolvedValue({
      data: {
        html_url: 'https://gist.github.com/fakegisturl'
      }
    });

    await createGits(req, res);

    expect(axios.post).toHaveBeenCalledWith(
      'https://api.github.com/gists',
      expect.objectContaining({
        description: 'Project: Test Project',
        public: false,
        files: {
          'Test Project.md': expect.objectContaining({
            content: expect.stringContaining('# Test Project')
          })
        }
      }),
      expect.any(Object)
    );

    expect(res.json).toHaveBeenCalledWith({ url: 'https://gist.github.com/fakegisturl' });
  });
});
