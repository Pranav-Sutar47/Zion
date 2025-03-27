import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router DOM

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Simple mock authentication 
    // In a real app, this would be replaced with actual authentication logic
    if (email === 'admin@example.com' && password === 'password123') {
      // Mock token (you would typically get this from a real API)
      const token = 'mock-token-12345'; 
      
      // Save the token to localStorage
      localStorage.setItem('authToken', token);
      
      // Trigger the onLogin callback with true (you can modify this to handle user state in a parent component)
      onLogin(true);
      
      // Redirect the user to the Dashboard
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-neutral-800">
          Admin Login
        </h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className="block text-neutral-700 mb-2"
            >
              Email Address
            </label>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 bg-white border border-neutral-300 rounded 
              text-black focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-all duration-300"
            />
          </div>
          
          <div>
            <label 
              htmlFor="password" 
              className="block text-neutral-700 mb-2"
            >
              Password
            </label>
            <input 
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 bg-white border border-neutral-300 rounded 
              text-black focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-all duration-300"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded 
            hover:bg-blue-600 transition-colors duration-300 
            flex items-center justify-center space-x-2"
          >
            <span>Login</span>
          </button>
        </form>
        
        <div className="text-center mt-6">
          <a 
            href="#" 
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
