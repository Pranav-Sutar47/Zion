"use client";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-white text-2xl font-semibold">
          <a href="/">MyLogo</a>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-white hover:text-gray-200 transition duration-300">Home</a>
          <a href="/about" className="text-white hover:text-gray-200 transition duration-300">About</a>
          <a href="/services" className="text-white hover:text-gray-200 transition duration-300">Services</a>
          <a href="/contact" className="text-white hover:text-gray-200 transition duration-300">Contact</a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
