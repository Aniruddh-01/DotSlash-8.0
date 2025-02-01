import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Government Transparency Portal</h1>
          <p className="text-xl mb-8">Bridging the gap between citizens and governance</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Query System */}
          <Link to="/query" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Submit Query</h3>
              <p className="text-gray-600">Raise your concerns and track their progress</p>
            </div>
          </Link>

          {/* Public Queries */}
          <Link to="/public" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Public Queries</h3>
              <p className="text-gray-600">View and track all submitted queries</p>
            </div>
          </Link>

          {/* Policy Opinions */}
          <Link to="/policy" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Policy Feedback</h3>
              <p className="text-gray-600">Review and comment on proposed policies</p>
            </div>
          </Link>

          {/* Budget Tracker */}
          <Link to="/budget" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Budget Insights</h3>
              <p className="text-gray-600">Visualize and track government spending</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold text-indigo-600">1000+</h4>
              <p className="text-gray-600">Queries Resolved</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-indigo-600">50+</h4>
              <p className="text-gray-600">Active Policies</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-indigo-600">10K+</h4>
              <p className="text-gray-600">Citizen Participants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;