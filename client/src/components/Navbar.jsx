import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setMenuOpen(false);
  };

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('dark') === 'true'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('dark', darkMode);
  }, [darkMode]);

  return (
    <nav className="dark:bg-gray-700 bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">
          🏋️ Workout Tracker
        </h1>

        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setDarkMode(!darkMode)} className="hover:text-yellow-400 transition">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          {isLoggedIn ? (
            <>
              <Link to="/add" className="hover:text-blue-500 border-4 px-4 text-blue-300 rounded-2xl transition">
                Add
              </Link>
              <Link to="/view" className="hover:text-blue-500 border-4 px-4 text-blue-300 rounded-2xl transition">
                View
              </Link>
              <Link to="/dashboard" className="hover:text-blue-500 border-4 px-4 text-blue-300 rounded-2xl transition">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-green-400 transition">Login</Link>
              <Link to="/signup" className="hover:text-green-400 transition">Signup</Link>
            </>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hover:text-yellow-400 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 text-lg flex flex-col items-start">
          {isLoggedIn ? (
            <>
              <Link to="/add" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 text-blue-300 border-2 px-3 py-1 rounded-lg w-full">
                Add
              </Link>
              <Link to="/view" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 text-blue-300 border-2 px-3 py-1 rounded-lg w-full">
                View
              </Link>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 text-blue-300 border-2 px-3 py-1 rounded-lg w-full">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-green-400 w-full">
                Login
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="hover:text-green-400 w-full">
                Signup
              </Link>
            </>
          )}
          {/* Dark Mode Toggle in Mobile Menu */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 mt-2 hover:text-yellow-400 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
