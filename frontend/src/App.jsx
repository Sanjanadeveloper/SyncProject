// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import SignUp from './pages/SingUp';
import ProfilePage from './Dashboard/Profile';
import SocialSyncFeed from './Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/profile' element={<ProfilePage/>} />
            <Route path='/dashboard' element={<SocialSyncFeed/>} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}


export default App;