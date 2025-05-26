// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  Plus,
  Search,
  ChevronDown,
  Briefcase,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";
import { CREATE_POST, ALLPOST } from "../config/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("new"); // 'new' or 'old'
  const [isCreatingPost, setIsCreatingPost] = useState(false); // Loader for creating post
  const [isFetchingPosts, setIsFetchingPosts] = useState(false); // Loader for fetching posts
  const navigate = useNavigate();
  const token = Cookies.get("auth_token");

  // Like animation state
  const [likedPosts, setLikedPosts] = useState({});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Cookies.remove("auth_token"); // Remove the authentication cookie
    navigate("/login"); // Redirect to the login page
  };

  const togglePostForm = () => {
    setIsPostFormOpen(!isPostFormOpen);
    if (isPostFormOpen) {
      setNewPost({ title: "", content: "" }); // Clear the form when closing
    }
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  // Handle post like
  const handleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Create a new post
  const handlePostSubmit = async () => {
    if (!newPost.title || !newPost.content) {
      toast.error("Title and content are required!");
      return;
    }

    setIsCreatingPost(true); // Show loader
    try {
      const response = await axios.post(
        CREATE_POST,
        {
          title: newPost.title,
          content: newPost.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token for verification
          },
        }
      );
      setPosts([response.data.post, ...posts]); // Add the new post to the top of the list
      setNewPost({ title: "", content: "" }); // Clear the form
      setIsPostFormOpen(false); // Close the form
      toast.success("Post created successfully!"); // Show success message
      // fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again."); // Show error message
    } finally {
      setIsCreatingPost(false); // Hide loader
    }
  };

  // Fetch all posts
  const fetchPosts = async () => {
    setIsFetchingPosts(true); // Show loader
    try {
      const response = await axios.get(ALLPOST, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token for verification
        },
      });
      setPosts(response.data); // Set the fetched posts
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts. Please try again."); // Show error message
    } finally {
      setIsFetchingPosts(false); // Hide loader
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
    if (!token) {
      navigate("/login");
    }
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "new" ? "old" : "new");
  };

  // Filter and sort posts
  const filteredPosts = posts
    .filter((post) => {
      const title = post.title || ""; // Handle undefined title
      const content = post.content || ""; // Handle undefined content
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOrder === "new") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt); // Oldest first
      }
    });

  // Close the profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".profile-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Navbar - Made sticky with theme color */}
      <nav className="bg-indigo-600 text-white shadow-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/dashboard"
            className="text-xl font-bold text-white flex items-center transform hover:scale-105 transition-transform duration-300"
          >
            SocialSync
          </Link>
          <div className="relative profile-menu">
            <button
              onClick={toggleMenu}
              className="flex items-center text-white hover:text-indigo-200 focus:outline-none transition-all duration-300 bg-indigo-700 hover:bg-indigo-800 rounded-full px-4 py-2"
            >
              <User className="mr-2" />
              <span className="hidden md:inline">My Account</span>
              <ChevronDown
                className={`ml-1 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 transform origin-top-right transition-all duration-300 scale-in">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 w-full text-left flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto flex-grow flex flex-col md:flex-row p-4 gap-4">
        {/* Main Content Area */}
        <div className="w-full md:w-4/5">
          {/* Create Post Section */}
          <div className="bg-white rounded-lg shadow-md p-5 mb-4 transition-all duration-300 hover:shadow-lg border-l-4 border-indigo-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white mr-4 shadow-md">
                <User className="h-6 w-6" />
              </div>
              <button
                onClick={togglePostForm}
                className="flex items-center text-gray-600 hover:text-indigo-600 transition-all duration-300 group"
              >
                <span className="bg-indigo-600 group-hover:bg-indigo-700 px-4 py-2 rounded-md flex items-center text-white font-medium shadow-md transition-all duration-300 transform group-hover:translate-x-1">
                  <Plus className="mr-2 h-4 w-4" />
                  {isPostFormOpen ? "Close Post" : "Create Post"}
                </span>
              </button>
            </div>
            {isPostFormOpen && (
              <div className="animate-fade-in bg-white rounded-lg p-4 shadow-inner border border-gray-100">
                <input
                  type="text"
                  name="title"
                  placeholder="Post Title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-md px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
                <textarea
                  name="content"
                  placeholder="What's on your mind?"
                  value={newPost.content}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-md px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  rows="3"
                ></textarea>
                <div className="flex space-x-3">
                  <button
                    onClick={handlePostSubmit}
                    disabled={isCreatingPost}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    {isCreatingPost ? (
                      <span className="flex items-center">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Posting...
                      </span>
                    ) : (
                      "Post"
                    )}
                  </button>
                  <button
                    onClick={togglePostForm}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search and Sorting */}
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-2/3 group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search posts by title or content..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full border border-gray-200 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm"
              />
            </div>

            <button
              onClick={toggleSortOrder}
              className="flex items-center bg-white px-4 py-2 rounded-md shadow-sm text-gray-600 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 transition-all duration-300 group"
            >
              <Clock className="mr-2 h-4 w-4 group-hover:text-indigo-500" />
              <span>Sort: {sortOrder === "new" ? "Newest" : "Oldest"}</span>
              <ChevronDown className="ml-1 group-hover:text-indigo-500" />
            </button>
          </div>

          {/* Post Display - Refined Layout */}
          {isFetchingPosts ? (
            <div className="flex justify-center items-center h-40">
              <div className="loading">
                <div className="dot-flashing"></div>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center text-center">
              <Search className="h-16 w-16 text-indigo-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Posts Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or create a new post.
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post._id} // Use post._id for the unique key
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-4 overflow-hidden transform hover:-translate-y-1"
              >
                {/* User Info Section */}
                <div className="flex items-center p-5 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white mr-3 shadow-md">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800">
                      {post.username || "Unknown User"}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Briefcase className="h-3 w-3 mr-1" />
                      <span>
                        {post.userProfession || "Profession Not Provided"}
                      </span>{" "}
                      {/* Dynamically render profession */}
                    </div>
                  </div>
                </div>

                {/* Date Section: Created At & Updated At */}
                <div className="px-5 py-2 text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span>Created: {formatDate(post.createdAt)}</span>{" "}
                      {/* Format the createdAt date and time */}
                    </div>
                    <div className="flex items-center">
                      <span>Updated: {formatDate(post.updatedAt)}</span>{" "}
                      {/* Format the updatedAt date and time */}
                    </div>
                  </div>
                </div>

                {/* Title Section */}
                <div className="px-5 pt-4 pb-2">
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                    {post.title || "Untitled Post"} {/* Render post title */}
                  </h3>
                </div>

                {/* Content Section */}
                <div className="px-5 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {post.content || "No content available."}{" "}
                    {/* Render post content */}
                  </p>
                </div>

                {/* Post Actions */}
                <div className="flex justify-between px-5 py-3 bg-gray-50 text-gray-500 border-t border-gray-100">
                  <div className="flex space-x-6">
                    <button
                      className="flex items-center hover:text-indigo-600 transition-colors duration-300 group"
                      onClick={() => handleLike(post._id)} // Use post._id for unique post identification
                    >
                      <Heart
                        className={`mr-1 h-5 w-5 ${
                          likedPosts[post._id]
                            ? "text-red-500 fill-current heart-beat"
                            : "text-gray-400 group-hover:text-red-500"
                        } transition-all duration-300`}
                      />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center hover:text-indigo-600 transition-colors duration-300 group">
                      <MessageCircle className="mr-1 h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center hover:text-indigo-600 transition-colors duration-300 group">
                      <Share2 className="mr-1 h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="hidden md:block w-1/5 h-fit sticky top-20">
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
              <h2 className="text-lg font-semibold flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Trending Posts
              </h2>
            </div>
            <div
              className="scrollbar-hide overflow-y-auto pr-0"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {/* Display all posts in descending order */}
              {posts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
                .map((post) => (
                  <div
                    key={post.id}
                    className="p-4 hover:bg-indigo-50 transition-colors duration-300 border-b border-gray-100 last:border-0"
                  >
                    <h3 className="text-md font-medium text-gray-700 mb-1 hover:text-indigo-600 transition-colors duration-200">
                      {post.title || "Untitled Post"}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.content || "No content available."}
                    </p>
                    <div className="flex items-center text-xs text-gray-400 mt-2">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-indigo-800 text-indigo-100 py-4 text-center mt-4">
        <div className="container mx-auto">
          <p>
            © {new Date().getFullYear()} My Social Site. All rights reserved.
          </p>
        </div>
      </div>

      {/* Custom CSS for animations and effects */}
      <style jsx>{`
        /* Hide scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Fade in animation */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        /* Scale in animation */
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .scale-in {
          animation: scale-in 0.2s ease-out;
        }

        /* Heart beat animation */
        @keyframes heart-beat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }
        .heart-beat {
          animation: heart-beat 0.6s ease-in-out;
        }

        /* Loading animation */
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dot-flashing {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #6366f1;
          color: #6366f1;
          animation: dot-flashing 1s infinite linear alternate;
          animation-delay: 0.5s;
        }

        .dot-flashing::before,
        .dot-flashing::after {
          content: "";
          display: inline-block;
          position: absolute;
          top: 0;
        }

        .dot-flashing::before {
          left: -15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #6366f1;
          color: #6366f1;
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 0s;
        }

        .dot-flashing::after {
          left: 15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #6366f1;
          color: #6366f1;
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 1s;
        }

        @keyframes dot-flashing {
          0% {
            background-color: #6366f1;
          }
          50%,
          100% {
            background-color: #e2e8f0;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
