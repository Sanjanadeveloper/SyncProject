import React, { useState, useRef } from 'react';
import { Facebook, Twitter, Linkedin, MapPin, Mail, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const form = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setResultMessage(''); // Clear result message when user starts typing again
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      return "All fields are required!";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setResultMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setResultMessage("Sending...");
    const formDataToSend = new FormData(event.target);
    formDataToSend.append("access_key", "d4aa6a94-059c-4029-b3cf-e019a7a017ef");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (data.success) {
        setResultMessage("Form submitted successfully!");
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
      } else {
        setResultMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setResultMessage("Failed to send the message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-slate-600">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white  p-8 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-102">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-slate-600">Send us a Message</h2>
            {resultMessage && (
              <div
                className={`${resultMessage.includes("success") ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"
                  } px-4 py-3 rounded-md mb-4`}
                role="alert"
              >
                {resultMessage}
              </div>
            )}

            <form ref={form} onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-600">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400  dark:text-gray-200"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-600">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400  dark:text-gray-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-600">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400  dark:text-gray-200"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="inline-block ml-2" />
              </button>
            </form>
          </div>

          <div className="bg-gray-100  p-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-102">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-slate-600">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <p className="flex items-center text-gray-700 dark:text-slate-600">
                  <MapPin className="mr-2 text-blue-500" /> 123 Collaboration Street, City, State
                </p>
              </div>
              <div>
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                  <Mail className="mr-2 text-blue-500" /> <a href="mailto:info@socialsync.com" className="hover:underline text-blue-600">info@socialsync.com</a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-slate-600">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-blue-500" aria-label="Facebook"><Facebook /></a>
                  <a href="#" className="hover:text-blue-500" aria-label="Twitter"><Twitter /></a>
                  <a href="#" className="hover:text-blue-500" aria-label="LinkedIn"><Linkedin /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
