import React, { useState, useEffect } from 'react';
import api from '../../axiosConfig';  
import { MdDelete } from 'react-icons/md';

const Profile = ({ token, userId }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFullname(response.data.fullname);
        setEmail(response.data.email);
        setLoading(false);
      } catch (error) {
        alert('Error fetching profile data', error);
        setLoading(false);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await api.get(`/posts/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };
  
    if (userId) {
      fetchUserPosts();
    }

    fetchProfile();
  }, [token, userId]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        '/profile',
        { fullname, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white shadow-lg rounded-lg w-full hover:shadow hover:scale-105 transition-transform duration-300 ease-in-out mb-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-gray-500 text-2xl font-bold">👤</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{fullname}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
        <hr className="my-6" />
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Update Profile
          </button>
        </form>
      </div>

      <div className="max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600">You haven't posted anything yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 hover:text-red-700 float-right"
                  title="Delete Post"
                >
                  <MdDelete size={24} />
                </button>
                <img
                  src={`http://localhost:3000/${post.image}`}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {post.content.slice(0, 100)}...
                </p>
                <p className="text-xs text-blue-500 font-medium">
                  Category: {post.category}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;