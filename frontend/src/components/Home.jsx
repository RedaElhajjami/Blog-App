import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../axiosConfig';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term and selected category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Predefined categories
  const predefinedCategories = ['All', 'Technology', 'Health', 'Education', 'Travel', 'Lifestyle'];

  return (
    <div className="p-4">
      {/* Featured Section */}
      <div className="mb-8 bg-blue-100 p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-blue-800">Featured Post</h2>
        <p>Check out our latest featured blog post for an in-depth look at our favorite topics!</p>
        <Link to="/post/featured" className="mt-2 inline-block text-blue-600 hover:underline">
          Read More
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Welcome to My Blog
      </h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {predefinedCategories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="text-center">
          <p className="text-gray-500">Loading posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">No posts found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <div
            key={post._id}
            className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img
              src={post.image || 'https://via.placeholder.com/150'} // Display the image or a placeholder
              alt={post.title}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {post.title}
            </h2>
            {/* <p className="text-gray-600 dark:text-gray-300 mt-2">{post.content.slice(0, 100)}...</p> */}
            <Link to={`/post/${post._id}`} className="mt-4 inline-block text-blue-500 hover:underline">
              Read More
            </Link>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;