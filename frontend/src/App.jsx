import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import AuthForm from "./components/AuthForm";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useState();
  const [posts, setPosts] = useState([]);
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <BrowserRouter>
      <Navbar token={token} logout={logout}/>
      <div className="p-4 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} posts={posts}/>
          <Route path="/login" element={!token ? <AuthForm setToken={setToken}/> : <Navigate to="/posts" />} />
          <Route path="/create" element={<CreatePost setPosts={setPosts}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;