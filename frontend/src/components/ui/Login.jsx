import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router DOM
import { useToast } from "@/hooks/use-toast";
import { Loader } from 'lucide-react';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [load,setLoad] = useState(false);
  
  const navigate = useNavigate(); // Initialize the navigate hook
  const { toast } = useToast();

  const handleSubmit = async(e) => {

    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoad(true);
      const url = String(import.meta.env.VITE_BASEURL)+'/login';
      const response = await axios.post(url, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store token
        toast({
          description: "User Logged In Successfully!",
          className: "bg-green-500 text-white",
        });
        navigate('/dashboard');
        setLoad(false);
      }else{
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.error('Error at login',error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }finally{
      setLoad(false);
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
            {
              load ? <Loader/> : <span>Login</span>
            }
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
