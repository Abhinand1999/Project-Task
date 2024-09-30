import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/SignUp';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './ProjectDetail';

const Router = () => {
  return (
    <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/Login' element={<Login/>} />
    <Route path="/home" element={<ProjectList />} />
    <Route path="/project/:projectId"  element={<ProjectDetail />} />
    <Route path='/signup' element={<Signup/>} />
    
  </Routes>
  )
}

export default Router