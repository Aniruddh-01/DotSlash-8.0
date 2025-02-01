import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-orange-500 via-white to-green-500 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Digital India</h1>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-black font-semibold hover:underline">Home</a></li>
            <li><a href="#" className="text-black font-semibold hover:underline">Services</a></li>
            <li><a href="#" className="text-black font-semibold hover:underline">About</a></li>
            <li><a href="#" className="text-black font-semibold hover:underline">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-cover bg-center h-[400px]" style={{ backgroundImage: "url('/egovernance.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-white text-4xl font-bold text-center">Transforming India Through Digital Governance</h2>
        </div>
      </header>

      {/* Content Section */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center text-gray-800">E-Governance Initiatives</h3>
        <p className="text-center text-gray-600 mt-4">
          The Indian Government has taken several initiatives to improve governance through technology. Programs like Digital India, Aadhaar, and UMANG are driving change.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="/aadhar.jpg" alt="Aadhaar" className="rounded-lg w-full h-48 object-cover"/>
            <h4 className="text-xl font-bold mt-4">Aadhaar</h4>
            <p className="text-gray-600">A unique identity system enhancing security and transparency.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="/umang.jpg" alt="UMANG App" className="rounded-lg w-full h-48 object-cover"/>
            <h4 className="text-xl font-bold mt-4">UMANG</h4>
            <p className="text-gray-600">A unified app providing access to multiple government services.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="/digilocker.jpg" alt="DigiLocker" className="rounded-lg w-full h-48 object-cover"/>
            <h4 className="text-xl font-bold mt-4">DigiLocker</h4>
            <p className="text-gray-600">Secure cloud storage for digital documents and certificates.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2025 Government of India | Digital India Initiative</p>
      </footer>
    </div>
  );
};

export default HomePage;
