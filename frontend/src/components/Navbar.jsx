import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

 
  const hideLogoutRoutes = ['/login', '/signup'];

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">To-Do Management</h1>
        {!hideLogoutRoutes.includes(location.pathname) && ( 
          <button
            className="bg-red-700 text-white rounded-full px-4 py-2 focus:outline-none mr-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
