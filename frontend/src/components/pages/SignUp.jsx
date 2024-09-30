import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Base_URL } from '../../config';

const Signup = () => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await axios.post(`${Base_URL}/user/signup`, { email, password });
      navigate('/login'); 
    } catch (err) {
      console.error('Error during signup:', err.response?.data || err.message); 
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="fixed top-1/6 left-0 right-0 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-80 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md w-full text-sm placeholder:text-sm"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-md w-full text-sm placeholder:text-sm"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 rounded-md w-full text-sm placeholder:text-sm"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md w-full hover:bg-blue-700 text-sm"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
