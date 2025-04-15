import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";

export default function CreatePost({ setPosts, token }) {
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "", image: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content || !newPost.category) return;
    try {
      const res = await api.post('/posts', newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => [...prev, res.data]);
      setNewPost({ title: "", content: "", category: "", image: "" });
      alert("Post created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const categories = ["Technology", "Health", "Education", "Travel", "Lifestyle"];

  return (
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleChange}
          placeholder="Post Title"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="content"
          value={newPost.content}
          onChange={handleChange}
          placeholder="Post Content"
          className="w-full p-2 border rounded h-40"
          required
        />

        <select
          name="category"
          value={newPost.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="" disabled>
            Select a Category
          </option>
          {categories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Image URL Input */}
        <input
          type="file"
          name="image"
          value={newPost.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded cursor-pointer"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
      </form>
  );
}