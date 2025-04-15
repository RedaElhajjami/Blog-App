import { Link } from 'react-router-dom';

export default function Navbar({ token, logout }) {
  return (
    <nav className="bg-indigo-400 border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold text-blue-600">MyBlog</Link>
        <div className="space-x-4 hidden md:flex">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/create" className="hover:text-blue-600">Create</Link>
          {!token ? (
            <Link to="/login" className="hover:text-blue-600">Login</Link>
          ) : (
            <button 
              onClick={logout} 
              className="hover:text-blue-600 bg-transparent border-none cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
        {/* Mobile Menu Placeholder */}
      </div>
    </nav>
  );
}