// src/pages/AboutPage.jsx
import React from 'react';
import { CheckCircle, Users, Award, TrendingUp, Zap } from 'lucide-react';  // Added Zap icon
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const AboutPage = () => {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">About SocialSync</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
          <p className="text-gray-700 dark:text-slate-600">
            SocialSync is a dynamic platform designed to foster collaboration, idea sharing, and resource exchange. We bridge the gap between individuals and communities, enabling them to connect, learn, and grow together.  We envision a world where knowledge and skills are freely shared, empowering everyone to achieve their full potential.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 dark:text-slate-600 mb-4">
                Our mission is to provide a user-friendly and accessible platform that breaks down barriers to collaboration. We strive to create a vibrant community where individuals can:
              </p>
              <ul className="list-none text-gray-700 dark:text-slate-600">
                <li className="mb-2 flex items-center"><CheckCircle className="text-green-500 dark:text-green-400 mr-2" />Connect with like-minded individuals.</li>
                <li className="mb-2 flex items-center"><CheckCircle className="text-green-500 dark:text-green-400 mr-2" />Share their expertise and learn from others.</li>
                <li className="mb-2 flex items-center"><CheckCircle className="text-green-500 dark:text-green-400 mr-2" />Collaborate on projects and achieve shared goals.</li>
              </ul>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Team Collaboration" className="rounded-lg shadow-md" />
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="text-gray-700 dark:text-slate-600">
            SocialSync provides a simple yet powerful set of tools to enhance collaboration.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="p-4 bg-gray-100  rounded-lg transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-md">
              <h3 className='flex items-center text-lg font-semibold mb-2'><Users className="mr-2 text-blue-500" />Build Your Network</h3>
              <p className='text-gray-700 dark:text-slate-600'>Connect with other users, follow their activity, and build your professional network.</p>
            </div>
            <div className="p-4 bg-gray-100  rounded-lg transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-md">
              <h3 className='flex items-center text-lg font-semibold mb-2'><Award className="mr-2 text-yellow-500" />Learn New Skills</h3>
              <p className='text-gray-700 dark:text-slate-600'>Access a wealth of resources, tutorials, and mentorship opportunities to enhance your skills.</p>
            </div>
            <div className="p-4 bg-gray-100  rounded-lg transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-md">
              <h3 className='flex items-center text-lg font-semibold mb-2'><TrendingUp className="mr-2 text-green-500" />Track Your Progress</h3>
              <p className='text-gray-700 dark:text-slate-600'>Monitor your contributions, project milestones, and overall progress within the platform.</p>
            </div>
            <div className="p-4 bg-gray-100  rounded-lg transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-md">
              <h3 className='flex items-center text-lg font-semibold mb-2'><span className="mr-2 text-purple-500" />Share & Collaborate</h3>
              <p className='text-gray-700 dark:text-slate-600'>Easily share your work, ideas and get valuable feedback to improve your skills</p>
            </div>
          </div>
        </section>
        {/*  Innovation Section */}
        <section className="mb-12 py-16 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
              <Zap className="mr-2" /> Fuel Innovation
            </h2>
            <p className="text-lg">
              SocialSync is more than just a platform; it's a catalyst for innovation. By connecting people and fostering a culture of open collaboration, we empower individuals and teams to bring their ideas to life.
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;