import { Link } from 'react-router-dom';

export default function Navbar({ token, logout }) {
  return (
    <nav className="bg-indigo-400 border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold text-blue-600">MyBlog</Link>
        <div className="space-x-4 hidden md:flex">
        
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/create" className="hover:text-blue-600">Create</Link>
          <Link to="/profile" className="hover:underline">
                Profile
              </Link>
          {!token ? (
            <Link to="/login" className="bg-blue-400 hover:bg-blue-600 rounded-lg font-bold px-2 transition duration-300 ease-in-out transform hover:scale-105">Login</Link>
          ) : (
            <button 
              onClick={logout} 
              className="hover:bg-red-600 border-none cursor-pointer bg-red-400 rounded-lg font-bold px-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}