import { UserRegister, UserLogin } from '../Controllers/UserCtroller.js';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

require('dotenv').config();

jest.mock('../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('UserRegister', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: 'a111@gmail.com',
        password: '123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('should return 400 if email or password is missing', async () => {
    req.body.email = '';
    await UserRegister(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email and password are required' });
  });

  it('should register user successfully', async () => {
    User.findOne.mockResolvedValue(null); // Simulate user not existing
    bcrypt.hash.mockImplementation((password, salt, callback) => {
      callback(null, 'hashedpassword'); // Mock hashed password
    });
  
    const mockUser = { _id: 'user123', email: 'test@test.com' };
    User.prototype.save = jest.fn().mockResolvedValue(mockUser); // Mock user save to return mockUser
  
    jwt.sign.mockReturnValue('fakejwttoken');
  
    await UserRegister(req, res); // Call your function
  
    expect(User.prototype.save).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 'user123' },
      process.env.JWT,
      { expiresIn: '7d' }
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('should return 409 if email already exists', async () => {
    User.findOne.mockResolvedValue(true); // Simulate existing user

    await UserRegister(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email is already in use' });
  });

 
});
