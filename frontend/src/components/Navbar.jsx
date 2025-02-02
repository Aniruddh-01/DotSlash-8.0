import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-white hover:text-yellow-300 transition-colors duration-300">
            GovPortal
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link
              to="/query"
              className="text-white text-lg px-4 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transform transition-transform duration-300"
            >
              Submit Query
            </Link>
            <Link
              to="/public"
              className="text-white text-lg px-4 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transform transition-transform duration-300"
            >
              Public Queries
            </Link>
            <Link
              to="/policy"
              className="text-white text-lg px-4 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transform transition-transform duration-300"
            >
              Policies
            </Link>
            <Link
              to="/budget"
              className="text-white text-lg px-4 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transform transition-transform duration-300"
            >
              Budget
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
