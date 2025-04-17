import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axiosConfig";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading post details...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">Post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="relative">
        <img
          src={`http://localhost:3000/${post.image}`}
          alt={post.title}
          className="w-full h-80 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 rounded-b-lg"></div>
        <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
          {post.title}
        </h1>
      </div>

      <div className="mt-6">
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
          {post.content}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-blue-500 font-medium">
            Category: {post.category}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Posted on: {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;