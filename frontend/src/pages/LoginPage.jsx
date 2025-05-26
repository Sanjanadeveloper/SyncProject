import React, { useState, useEffect } from 'react';
import { LogIn, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import { LOGINAPI } from "../config/config";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(LOGINAPI, { email, password });

      if (response.data && response.data.token) {
        Cookies.set("auth_token", response.data.token, { expires: 7 });
        setError('');
        navigate('/dashboard');
      } else {
        setError('Login failed. Invalid credentials.');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError('Something went wrong. Please try again.');
    }

    setLoading(false); // Stop loading after API response
  };

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-slate-600">Login</h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-600">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:text-gray-200"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-600">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:text-gray-200"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition flex items-center justify-center"
              disabled={loading} // Disable button when loading
            >
              {loading ? <Loader className="animate-spin mr-2" /> : <LogIn className="ml-2" />}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className='text-gray-700 dark:text-slate-600'>
              Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
