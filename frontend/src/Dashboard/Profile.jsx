// src/pages/ProfilePage.js
import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  MapPin,
  User,
  LogOut,
  Home,
  ChevronDown,
  ArrowLeft,
  Edit,
  Trash2,
  Briefcase,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Calendar,
  UserCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import DashboardFooter from "../components/DashboardFooter";
import { GETUSER, UPDATE_USER } from "../config/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_POST, DELETE_POST } from "../config/config";
// API URLs for posts
const CURRENT_USER_ALLPOST =
  "https://socialsync-zbjp.onrender.com/posts/current-user-posts";

const ProfilePage = () => {
  const [showConnectAlert, setShowConnectAlert] = useState(false);
  const [showMessageAlert, setShowMessageAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("auth_token");
  const editSectionRef = useRef(null);

  const [posts, setPosts] = useState([]); // State to store fetched posts
  const [showPosts, setShowPosts] = useState(false); // State to control post display
  const [editingPost, setEditingPost] = useState(null); // State to track editing post
  const [editPostData, setEditPostData] = useState({ title: "", content: "" }); // State for edit form

  const [postError, setPostError] = useState(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Cookies.remove("auth_token");
    navigate("/login");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(GETUSER, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
      setEditData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    if (editSectionRef.current) {
      editSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setEditData((prevData) => ({ ...prevData, skills }));
  };

  const handleUpdateProfile = async () => {
    if (!editData.name || !editData.email) {
      toast.error("Name and Email are required fields.");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await axios.patch(UPDATE_USER, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      fetchUserData();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // --- Post-related functions ---

  // Handle post like  (Added this function)
  const handleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const fetchPosts = async () => {
    setIsPostLoading(true);
    setPostError(null);
    try {
      const response = await axios.get(CURRENT_USER_ALLPOST, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data);
      setShowPosts(true); // Show posts after fetching
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPostError("Failed to fetch posts. Please try again.");
    } finally {
      setIsPostLoading(false);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post._id);
    setEditPostData({ title: post.title, content: post.content });
  };

  const handleUpdatePost = async (id) => {
    if (!editPostData.title || !editPostData.content) {
      toast.error("Title and Content are required fields.");
      return;
    }
    setIsPostLoading(true);
    try {
      let res = await axios.patch(`${UPDATE_POST}${id}`, editPostData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      // Update the posts array with the updated post
      fetchPosts();
      setEditingPost(null);
      setEditPostData({ title: "", content: "" });
      toast.success("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post. Please try again.");
    } finally {
      setIsPostLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    setIsPostLoading(true);
    try {
      let res = await axios.delete(`${DELETE_POST}${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      toast.success("Post deleted successfully!");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post. Please try again.");
    } finally {
      setIsPostLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditPostData({ title: "", content: "" });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".profile-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    if (!token) {
      navigate("/login");
    } else {
      fetchUserData();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, token, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
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
            <ArrowLeft className="mr-4" /> SocialSync
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

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-6">
            {/* Banner and Profile Picture */}
            <div className="relative">
              <div className="h-18 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800"></div>
              <div className="absolute -bottom-16 left-8">
                <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg flex justify-center items-center">
                  <UserCircle className="text-9xl text-gray-700" />
                </div>
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">
              {/* Personal Info and Tabs (unchanged) */}
              <div className="md:flex md:justify-between md:items-start">
                <div className="mb-6 md:mb-0">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {userData?.name || "Name Not Available"}
                  </h1>
                  <h2 className="text-xl text-gray-600 mt-1">
                    {userData?.title || "Title Not Available"}
                  </h2>
                  <div className="flex items-center mt-2 text-gray-500">
                    <MapPin size={18} className="mr-1" />
                    <span>
                      {userData?.location || "Location Not Available"}
                    </span>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <button
                  onClick={handleEditProfile}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  <Edit className="mr-2" size={16} />
                  Edit Profile
                </button>
              </div>

              {/* Content Tabs */}
              <div className="mt-8 border-b border-gray-200">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab("about")}
                    className={`pb-4 font-medium text-sm ${
                      activeTab === "about"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab("skills")}
                    className={`pb-4 font-medium text-sm ${
                      activeTab === "skills"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className={`pb-4 font-medium text-sm ${
                      activeTab === "contact"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Contact
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {/* About Tab */}
                {activeTab === "about" && (
                  <div className="animate-fade-in">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      About
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p>
                        {userData?.about || "No about information available."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Skills Tab */}
                {activeTab === "skills" && (
                  <div className="animate-fade-in">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Skills
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {userData?.skills?.map((skill) => (
                          <span
                            key={skill}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Tab */}
                {activeTab === "contact" && (
                  <div className="animate-fade-in">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a
                        href={`mailto:${userData?.email}`}
                        className="flex items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-gray-600 hover:text-blue-600"
                      >
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Mail size={20} className="text-blue-600" />
                        </div>
                        <span>{userData?.email || "Email Not Available"}</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {isEditing && (
                <div ref={editSectionRef} className="mt-8 animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Edit Profile
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleEditInputChange}
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={editData.title}
                          onChange={handleEditInputChange}
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={editData.location}
                          onChange={handleEditInputChange}
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          About
                        </label>
                        <textarea
                          name="about"
                          value={editData.about}
                          onChange={handleEditInputChange}
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="4"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Skills (comma-separated)
                        </label>
                        <input
                          type="text"
                          name="skills"
                          value={editData.skills?.join(", ")}
                          onChange={handleSkillsChange}
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., JavaScript, React, Node.js"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={handleUpdateProfile}
                          disabled={isUpdating}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isUpdating ? "Updating..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* View All Posts Button */}
          <div className="text-center mt-4">
            <button
              onClick={fetchPosts}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 mb-4 ease-in-out transform hover:scale-105"
            >
              View My All Posts
            </button>
          </div>

          {/* Display Posts */}
          {showPosts && (
            <div className="mt-8">
              {isPostLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}

              {postError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
                  {postError}
                </div>
              )}

              {/* START: Modified Post Display Section */}
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-4 overflow-hidden transform hover:-translate-y-1"
                >
                  {editingPost === post._id ? (
                    // Edit Form
                    <>
                      <input
                        type="text"
                        value={editPostData.title}
                        onChange={(e) =>
                          setEditPostData({
                            ...editPostData,
                            title: e.target.value,
                          })
                        }
                        className="w-full border rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Post Title"
                      />
                      <textarea
                        value={editPostData.content}
                        onChange={(e) =>
                          setEditPostData({
                            ...editPostData,
                            content: e.target.value,
                          })
                        }
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Post Content"
                      />
                      <div className="flex justify-end mt-2 space-x-2">
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdatePost(post._id)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white"
                        >
                          Save
                        </button>
                      </div>
                    </>
                  ) : (
                    // Display Post -  STRUCTURED LIKE DASHBOARD POST
                    <>
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
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Date Section: Created At & Updated At */}
                      <div className="px-5 py-2 text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="mr-1" size={16} />
                            <span>Created: {formatDate(post.createdAt)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1" size={16} />
                            <span>Updated: {formatDate(post.updatedAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Title Section */}
                      <div className="px-5 pt-4 pb-2">
                        <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                          {post.title || "Untitled Post"}
                        </h3>
                      </div>

                      {/* Content Section */}
                      <div className="px-5 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {post.content || "No content available."}
                        </p>
                      </div>

                      {/* Post Actions */}
                      <div className="flex justify-between px-5 py-3 bg-gray-50 text-gray-500 border-t border-gray-100">
                        <div className="flex space-x-6">
                          {/* Like button with animation */}
                          <button
                            className="flex items-center hover:text-indigo-600 transition-colors duration-300 group"
                            onClick={() => handleLike(post._id)}
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

                          <button
                            onClick={() => handleEditPost(post)}
                            className="p-1 text-blue-500 hover:text-blue-700 focus:outline-none hover:bg-blue-50 rounded transition-colors duration-200"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="p-1 text-red-500 hover:text-red-700 focus:outline-none hover:bg-red-50 rounded transition-colors duration-200"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {/* END: Modified Post Display Section */}
            </div>
          )}
        </div>
        <DashboardFooter />
      </div>
      <style jsx>{`
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
      `}</style>
    </>
  );
};

export default ProfilePage;
