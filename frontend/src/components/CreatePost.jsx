import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";

export default function CreatePost({ setPosts, token }) {
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "" });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content || !newPost.category) return;

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    formData.append("category", newPost.category);
    if (image) formData.append("image", image);

    try {
      const res = await api.post('/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setPosts((prev) => [...prev, res.data]);
      setNewPost({ title: "", content: "", category: "" });
      setImage(null);
      alert("Post created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const categories = ["Technology", "Health", "Education", "Travel", "Lifestyle"];
  if (!token) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Unauthorized</h2>
        <p className="text-gray-600">You must be logged in to create a post.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }
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

      <input
        type="file"
        name="image"
        onChange={handleImageChange}
        className="w-full p-2 border rounded cursor-pointer"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
    </form>
  );
}