import React from "react";
import { Link } from "react-router-dom";
import { Heart, Share2, Users, ClipboardCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const testimonials = [
  {
    name: "John Doe",
    title: "Software Engineer, USA",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    quote:
      "SocialSync has transformed the way our team works together. Sharing ideas and resources has never been easier!",
  },
  {
    name: "Amy Smith",
    title: "Marketing Specialist, UK",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote:
      "I've found amazing mentors and collaborators on SocialSync. It's a fantastic community for learning and growing.",
  },
  {
    name: "David Lee",
    title: "Data Analyst, Australia",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote:
      "The task tracking features have helped us stay organized and on schedule. Highly recommend!",
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      {/* Hero Section */}
      <div
        className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center text-white relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold animate-pulse">
            Collaborate. Share Ideas. Grow Together
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Join a community where you can exchange ideas, resources, and
            skills.
          </p>
          <Link
            to="/login"
            className="mt-8 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-4 container mx-auto">
        <FeatureCard
          title="Share Ideas"
          icon={<Heart className="h-12 w-12 text-yellow-500" />}
          description="Post, discuss, and refine ideas collaboratively."
        />
        <FeatureCard
          title="Share Resources"
          icon={<Share2 className="h-12 w-12 text-blue-500" />}
          description="Upload and share documents and resources."
        />
        <FeatureCard
          title="Share Skills"
          icon={<Users className="h-12 w-12 text-green-500" />}
          description="Offer mentorship or seek help from others."
        />
        <FeatureCard
          title="Collaborate on Projects"
          icon={<ClipboardCheck className="h-12 w-12 text-purple-500" />}
          description="Form teams and track tasks together."
        />
      </div>

      {/* Testimonials Section - Simplified */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 h-full flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-500 mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 ">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500 ">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-base italic flex-grow">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-500  text-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Join the Community?
          </h2>
          <p className="text-lg mb-8">
            Start collaborating, sharing, and growing today!
          </p>
          <Link
            to="/login"
            className="px-8 py-3 bg-white text-blue-500 rounded-full font-semibold hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Join Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white  rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <div className="mb-4 transition duration-500 ease-in-out transform hover:-translate-y-2">
        {icon}
      </div>
      <h3 className="mt-2 font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-gray-600 ">{description}</p>
    </div>
  );
};

export default HomePage;
