import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Edit2, Trash2 } from 'lucide-react';
import Cookies from 'js-cookie';  // Import js-cookie

// Configuration for API endpoint
const CURRENT_USER_ALLPOST = "https://socialsync-zbjp.onrender.com/posts/current-user-posts";

const PostBox = () => {
  const [posts, setPosts] = useState([]);
  //  Remove showPostBox, it's controlled by the parent
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');

  const token = Cookies.get('auth_token'); // Get the token

  // Fetch user posts
  const fetchUserPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(CURRENT_USER_ALLPOST, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a post
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://socialsync-zbjp.onrender.com/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post. Please try again.");
    }
  };

  // Start editing a post
  const handleStartEdit = (post) => {
    setEditingPost(post._id);
    setEditContent(post.content);
  };

  // Save edited post
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`https://socialsync-zbjp.onrender.com/posts/${editingPost}`, {
        content: editContent
      },
      {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });

      // Update the post in the state
      setPosts(posts.map(post =>
        post._id === editingPost ? { ...post, content: editContent } : post
      ));

      // Reset editing state
      setEditingPost(null);
      setEditContent('');
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post. Please try again.");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditContent('');
  };


    useEffect(() => {
        fetchUserPosts(); // Fetch data whenever the component mounts
    }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mt-8">
      {/* Post Box Modal  - Removed the button, it is controlled by the parent*/}

        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-fade-in">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-xl font-bold text-gray-800">Your Posts</h2>
          {/*remove toggle button*/}
          </div>

          {/* Modal Content */}
          <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(80vh - 120px)' }}>
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
                {error}
              </div>
            )}

            {!isLoading && posts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                You haven't created any posts yet.
              </div>
            )}

            <div className="space-y-4">
              {posts.map(post => (
                <div key={post._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                  {editingPost === post._id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <p className="text-gray-800 mb-3">{post.content}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {formatDate(post.createdAt)}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStartEdit(post)}
                            className="p-1 text-blue-500 hover:text-blue-700 focus:outline-none hover:bg-blue-50 rounded transition-colors duration-200"
                            title="Edit post"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="p-1 text-red-500 hover:text-red-700 focus:outline-none hover:bg-red-50 rounded transition-colors duration-200"
                            title="Delete post"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default PostBox;