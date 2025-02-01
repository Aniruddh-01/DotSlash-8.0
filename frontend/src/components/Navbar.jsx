import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            GovPortal
          </Link>
          <div className="flex space-x-6">
            <Link to="/query" className="text-gray-600 hover:text-indigo-600">Submit Query</Link>
            <Link to="/public" className="text-gray-600 hover:text-indigo-600">Public Queries</Link>
            <Link to="/policy" className="text-gray-600 hover:text-indigo-600">Policies</Link>
            <Link to="/budget" className="text-gray-600 hover:text-indigo-600">Budget</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;