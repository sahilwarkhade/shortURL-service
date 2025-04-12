import { LinkIcon, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {token}=useSelector(state=>state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleOnclick(){
    if(!token) navigate("/login");
    else{
      dispatch(logout())
    }
  }

  return (
    <div className="bg-gray-900 text-white">
      <nav className="shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="h-6 w-6 text-blue-400"><LinkIcon /></span>
              <span
                className="ml-2 text-xl font-bold text-white cursor-pointer"
                onClick={() => navigate("/")}
              >
                LinkSnip
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white">
                Home
              </Link>
              <Link to="/dashboard" className="text-gray-300 hover:text-white">
                Dashboard
              </Link>
              <Link to="/analytics" className="text-gray-300 hover:text-white">
                Analytics
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white">
                About
              </Link>
              <button
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleOnclick}
              >
                {token ? "Logout" : "Login"}
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-white">
                Home
              </Link>
              <Link to="/dashboard" className="block px-3 py-2 text-gray-300 hover:text-white">
                Dashboard
              </Link>
              <Link to="/analytics" className="block px-3 py-2 text-gray-300 hover:text-white">
                Analytics
              </Link>
              <Link to="/about" className="block px-3 py-2 text-gray-300 hover:text-white">
                About
              </Link>
              <button
                className="w-full cursor-pointer mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => navigate("/login")}
              >
                {token ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

