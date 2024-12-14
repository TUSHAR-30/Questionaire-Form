import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import axios from 'axios';
import { SERVER_URL } from '../config';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import CreateFormPage from './pages/CreateFormPage/CreateFormPage';
import Navbar from './assets/Navbar/Navbar'
import "./App.css"

function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [user,setUser]=useState({})

  useEffect(() => {
    async function fetchUserProfile() {
        try {
            const response = await axios.get(`${SERVER_URL}/profile`, {
                withCredentials: true
            });
            const data=response.data
            console.log(data)
            setUser(data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error);
        }
    }
    fetchUserProfile(); 
}, [])

  return (
    <div className='app'>
      <Navbar isAuthenticated={isAuthenticated} user={user} setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/dragforms" element={<HomePage />} />
        <Route path="/dragforms/createform" element={<CreateFormPage />} />
        <Route path="/dragforms/login" element={<LoginPage setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/dragforms/signup" element={<SignupPage setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="*" element={<div>No page found</div>} />
      </Routes>
    </div>
  )
}

export default App

