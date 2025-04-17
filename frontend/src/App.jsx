import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";
import PostDetails from "./components/PostDetails";
import { useState, useEffect } from "react";
import  jwtDecode  from "jwt-decode";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserId(null);
      }
    } else {
      setUserId(null);
    }
  }, [token]);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar token={token} logout={logout} />
      <div className="p-4 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route
            path="/login"
            element={!token ? <AuthForm setToken={setToken} /> : <Navigate to="/" />}
          />
          <Route
            path="/create"
            element={token ? <CreatePost setPosts={setPosts} token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={
              token ? <Profile token={token} userId={userId} /> : <Navigate to="/login" />
            }
          />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;