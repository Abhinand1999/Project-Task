import React, { useState } from 'react';
import axios from 'axios';
import { Base_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${Base_URL}/user/login`, { email, password });
      console.log(response)
      localStorage.setItem('token', response.data.token);

      navigate('/home');
    } catch (err) {
      setError('Invalid email or password');
      console.log(err)
    }
  };



  return (
    <div className="fixed top-1/6 left-0 right-0 flex items-center justify-center min-h-screen bg-gray-100"> {/* Adjusted top value to move box up */}
      <div className="w-80 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md w-full hover:bg-blue-700 text-sm"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};



export default Login;
